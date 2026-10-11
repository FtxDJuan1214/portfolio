#!/usr/bin/env python3
"""
Genera src/config/travel.ts y las miniaturas de public/viajes a partir de
los metadatos EXIF (GPS + fecha) de las fotos en public/fotos-viajes.

Uso: npm run travel  (o python3 scripts/generate-travel.py)

- Extrae coordenadas y fecha de cada JPG con un parser EXIF puro (sin
  dependencias de Python).
- Agrupa las fotos por proximidad (~0.25 grados) en "lugares".
- Genera las miniaturas con sips (macOS), sólo las que faltan o están
  desactualizadas respecto al original.
- Reescribe travel.ts conservando los nombres editados a mano: cada lugar
  se empareja con el lugar existente más cercano (<0.35 grados) y hereda
  su id, nombre, region y país.

Los lugares nuevos que no emparejan quedan como "Sin nombre": edita su
nombre/país en travel.ts y vuelve a ejecutar; tus ediciones se conservan.
"""

import os
import re
import struct
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DIR = os.path.join(ROOT, "public", "fotos-viajes")
THUMB_DIR = os.path.join(ROOT, "public", "viajes", "thumb")
FULL_DIR = os.path.join(ROOT, "public", "viajes", "full")
OUT_PATH = os.path.join(ROOT, "src", "config", "travel.ts")

THUMB_SIZE = 400
THUMB_QUALITY = 65
FULL_SIZE = 1600
FULL_QUALITY = 72

# Umbral de agrupación de fotos en un mismo lugar, en grados.
CLUSTER_DEG = 0.25
# Umbral para reconocer que un cluster nuevo es un lugar ya conocido.
MATCH_DEG = 0.35

# ---------------------------------------------------------------------------
# Parser EXIF (JPEG APP1 / IFD0 / GPS / SubEXIF) en Python puro.
# ---------------------------------------------------------------------------

GPS_IFD = 0x8825
EXIF_IFD = 0x8769
DATETIME_ORIGINAL = 0x9003
DATETIME = 0x0132

TYPE_SIZE = {1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 6: 1, 7: 1, 8: 2, 9: 4, 10: 8, 11: 4, 12: 8}

SOF_MARKERS = (0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF)


def find_exif(data):
    """Devuelve el payload del segmento APP1/Exif, o None."""
    if data[0:2] != b"\xff\xd8":
        return None
    i = 2
    n = len(data)
    while i < n - 3:
        if data[i] != 0xFF:
            i += 1
            continue
        marker = data[i + 1]
        if marker in (0xD8, 0x01) or 0xD0 <= marker <= 0xD7:
            i += 2
            continue
        if marker == 0xDA:
            return None
        seglen = struct.unpack(">H", data[i + 2 : i + 4])[0]
        if marker == 0xE1 and data[i + 4 : i + 10] == b"Exif\x00\x00":
            return data[i + 10 : i + 2 + seglen]
        i += 2 + seglen
    return None


def read_ifd(buf, offset, endian):
    entries = {}
    if offset + 2 > len(buf):
        return entries
    count = struct.unpack(endian + "H", buf[offset : offset + 2])[0]
    for k in range(count):
        e = offset + 2 + k * 12
        if e + 12 > len(buf):
            break
        tag, typ, cnt = struct.unpack(endian + "HHI", buf[e : e + 8])
        size = TYPE_SIZE.get(typ, 0) * cnt
        if size == 0:
            continue
        if size <= 4:
            raw = buf[e + 8 : e + 8 + size]
        else:
            ptr = struct.unpack(endian + "I", buf[e + 8 : e + 12])[0]
            if ptr + size > len(buf):
                continue
            raw = buf[ptr : ptr + size]
        entries[tag] = (typ, cnt, raw)
    return entries


def to_value(entry, endian):
    typ, cnt, raw = entry
    if typ == 2:
        return raw.split(b"\x00")[0].decode("utf-8", "replace")
    if typ == 5:
        out = []
        for k in range(cnt):
            num, den = struct.unpack(endian + "II", raw[k * 8 : k * 8 + 8])
            out.append(num / den if den else 0.0)
        return out
    if typ == 3:
        return list(struct.unpack(endian + "%dH" % cnt, raw[: 2 * cnt]))
    if typ == 4:
        return list(struct.unpack(endian + "%dI" % cnt, raw[: 4 * cnt]))
    return raw


def dms_to_decimal(vals, ref):
    if not vals or len(vals) < 3:
        return None
    deg = vals[0] + vals[1] / 60 + vals[2] / 3600
    return -deg if ref in ("S", "W") else deg


def read_jpeg(path):
    """Lee GPS, fecha y dimensiones reales (marcador SOF) de un JPEG."""
    with open(path, "rb") as f:
        data = f.read()

    result = {"file": os.path.basename(path)}

    exif = find_exif(data)
    if exif:
        endian = "<" if exif[0:2] == b"II" else ">"
        ifd0_off = struct.unpack(endian + "I", exif[4:8])[0]
        ifd0 = read_ifd(exif, ifd0_off, endian)

        if GPS_IFD in ifd0:
            gps_off = to_value(ifd0[GPS_IFD], endian)[0]
            gps = read_ifd(exif, gps_off, endian)
            lat_ref = to_value(gps[1], endian) if 1 in gps else None
            lat = to_value(gps[2], endian) if 2 in gps else None
            lon_ref = to_value(gps[3], endian) if 3 in gps else None
            lon = to_value(gps[4], endian) if 4 in gps else None
            la = dms_to_decimal(lat, lat_ref)
            lo = dms_to_decimal(lon, lon_ref)
            if la is not None and lo is not None:
                result["lat"] = round(la, 6)
                result["lon"] = round(lo, 6)

        dt = None
        if EXIF_IFD in ifd0:
            sub = read_ifd(exif, to_value(ifd0[EXIF_IFD], endian)[0], endian)
            if DATETIME_ORIGINAL in sub:
                dt = to_value(sub[DATETIME_ORIGINAL], endian)
        if not dt and DATETIME in ifd0:
            dt = to_value(ifd0[DATETIME], endian)
        if dt:
            result["date"] = dt

    # Dimensiones reales desde el primer marcador SOF.
    i = 2
    while i < len(data) - 9:
        if data[i] != 0xFF:
            i += 1
            continue
        m = data[i + 1]
        if m in (0xD8, 0x01) or 0xD0 <= m <= 0xD7:
            i += 2
            continue
        if m == 0xDA:
            break
        seglen = struct.unpack(">H", data[i + 2 : i + 4])[0]
        if m in SOF_MARKERS:
            h, w = struct.unpack(">HH", data[i + 5 : i + 9])
            result["width"] = w
            result["height"] = h
            break
        i += 2 + seglen

    return result


# ---------------------------------------------------------------------------
# Clustering por proximidad, con recentrado incremental.
# ---------------------------------------------------------------------------


def cluster_photos(photos):
    points = [p for p in photos if "lat" in p]
    clusters = []
    for p in sorted(points, key=lambda x: x.get("date", "")):
        for c in clusters:
            if abs(c["lat"] - p["lat"]) < CLUSTER_DEG and abs(c["lon"] - p["lon"]) < CLUSTER_DEG:
                c["items"].append(p)
                c["lat"] = sum(i["lat"] for i in c["items"]) / len(c["items"])
                c["lon"] = sum(i["lon"] for i in c["items"]) / len(c["items"])
                break
        else:
            clusters.append({"lat": p["lat"], "lon": p["lon"], "items": [p]})
    for c in clusters:
        c["items"].sort(key=lambda x: x.get("date", ""))
    return clusters


# ---------------------------------------------------------------------------
# Conservación de nombres: se leen del travel.ts existente.
# ---------------------------------------------------------------------------

PLACE_RE = re.compile(
    r'id:\s*"(?P<id>[^"]+)",\s*'
    r'name:\s*\{\s*es:\s*"(?P<name_es>[^"]*)",\s*en:\s*"(?P<name_en>[^"]*)"\s*\},\s*'
    r'region:\s*"(?P<region>[^"]*)",\s*'
    r'country:\s*\{\s*es:\s*"(?P<country_es>[^"]*)",\s*en:\s*"(?P<country_en>[^"]*)"\s*\},\s*'
    r'lat:\s*(?P<lat>-?[\d.]+),\s*'
    r'lon:\s*(?P<lon>-?[\d.]+),',
)


def load_existing_places(path):
    """Extrae id/nombre/región/país/coordenadas del travel.ts actual."""
    if not os.path.exists(path):
        return []
    with open(path, encoding="utf-8") as f:
        text = f.read()
    places = []
    for m in PLACE_RE.finditer(text):
        places.append(
            {
                "id": m.group("id"),
                "name_es": m.group("name_es"),
                "name_en": m.group("name_en"),
                "region": m.group("region"),
                "country_es": m.group("country_es"),
                "country_en": m.group("country_en"),
                "lat": float(m.group("lat")),
                "lon": float(m.group("lon")),
            }
        )
    return places


def match_existing(cluster, existing):
    """Lugar existente más cercano dentro de MATCH_DEG, o None."""
    best, best_d = None, None
    for place in existing:
        d = abs(place["lat"] - cluster["lat"]) + abs(place["lon"] - cluster["lon"])
        if d < MATCH_DEG and (best_d is None or d < best_d):
            best, best_d = place, d
    return best


# ---------------------------------------------------------------------------
# Miniaturas con sips (nativo de macOS).
# ---------------------------------------------------------------------------


def slug_file(name):
    stem, ext = os.path.splitext(name)
    return stem.replace(".", "-") + ".jpg"


def make_thumb(src, dst, size, quality, generated):
    if os.path.exists(dst) and os.path.getmtime(dst) >= os.path.getmtime(src):
        return
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    subprocess.run(
        ["sips", "-s", "format", "jpeg", "-s", "formatOptions", str(quality),
         "-Z", str(size), src, "--out", dst],
        check=True,
        capture_output=True,
    )
    generated.append(os.path.basename(dst))


# ---------------------------------------------------------------------------
# Emisión de travel.ts.
# ---------------------------------------------------------------------------

MONTHS_ES = ["", "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
             "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
MONTHS_EN = ["", "January", "February", "March", "April", "May", "June", "July",
             "August", "September", "October", "November", "December"]

HEADER = """import type { Locale } from "./content";

type Localized<T> = Record<Locale, T>;

export type TravelPhoto = {
  /** Miniatura 400px para el mapa y la galería. */
  thumb: string;
  /** Versión 1600px para la vista ampliada. */
  full: string;
  width: number;
  height: number;
};

export type TravelPlace = {
  id: string;
  name: Localized<string>;
  region: string;
  country: Localized<string>;
  lat: number;
  lon: number;
  date: Localized<string>;
  photos: TravelPhoto[];
};

/**
 * Lugares derivados de las coordenadas GPS (EXIF) de las fotos en
 * public/fotos-viajes. Generado con `npm run travel`: los nombres editados
 * a mano se conservan entre ejecuciones; los lugares nuevos aparecen como
 * "Sin nombre" hasta que los renombres aquí.
 */
export const travelPlaces: TravelPlace[] = [
"""


def emit(clusters, labels):
    lines = [HEADER.rstrip("\n")]
    for c, label in zip(clusters, labels):
        from_date = c["items"][0].get("date", "")[:10]
        y, m = from_date[:4], int(from_date[5:7])
        lines.append("  {")
        lines.append('    id: "%s",' % label["id"])
        lines.append('    name: { es: "%s", en: "%s" },' % (label["name_es"], label["name_en"]))
        lines.append('    region: "%s",' % label["region"])
        lines.append('    country: { es: "%s", en: "%s" },' % (label["country_es"], label["country_en"]))
        lines.append("    lat: %s," % round(c["lat"], 5))
        lines.append("    lon: %s," % round(c["lon"], 5))
        lines.append('    date: { es: "%s de %s", en: "%s %s" },' % (MONTHS_ES[m], y, MONTHS_EN[m], y))
        lines.append("    photos: [")
        for p in c["items"]:
            f = slug_file(p["file"])
            w = p.get("width") or 4080
            h = p.get("height") or 3072
            lines.append(
                '      { thumb: "/viajes/thumb/%s", full: "/viajes/full/%s", width: %d, height: %d },'
                % (f, f, w, h)
            )
        lines.append("    ],")
        lines.append("  },")
    lines.append("];")
    lines.append("")
    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Main.
# ---------------------------------------------------------------------------


def main():
    if not os.path.isdir(SRC_DIR):
        sys.exit("No existe %s" % SRC_DIR)

    photos = []
    no_gps = []
    for name in sorted(os.listdir(SRC_DIR)):
        if not name.lower().endswith((".jpg", ".jpeg")):
            continue
        photo = read_jpeg(os.path.join(SRC_DIR, name))
        (photos if "lat" in photo else no_gps).append(photo)

    if not any("lat" in p for p in photos):
        sys.exit("Ninguna foto con coordenadas GPS: no se reescribe travel.ts")

    clusters = cluster_photos(photos)

    # Miniaturas para todas las fotos (las que no llevan GPS también, por si
    # algún día se referencian).
    generated = []
    for photo in photos + no_gps:
        slug = slug_file(photo["file"])
        src = os.path.join(SRC_DIR, photo["file"])
        make_thumb(src, os.path.join(THUMB_DIR, slug), THUMB_SIZE, THUMB_QUALITY, generated)
        make_thumb(src, os.path.join(FULL_DIR, slug), FULL_SIZE, FULL_QUALITY, generated)

    # Emparejar con los lugares ya conocidos para heredar nombres editados.
    existing = load_existing_places(OUT_PATH)
    used = set()
    labels = []
    unnamed = []
    next_id = 1
    for c in clusters:
        place = match_existing(c, existing)
        if place and place["id"] not in used:
            used.add(place["id"])
            labels.append(place)
        else:
            while "lugar-%d" % next_id in used:
                next_id += 1
            ident = "lugar-%d" % next_id
            used.add(ident)
            labels.append(
                {
                    "id": ident,
                    "name_es": "Sin nombre",
                    "name_en": "Unnamed",
                    "region": "—",
                    "country_es": "?",
                    "country_en": "?",
                }
            )
            unnamed.append((ident, round(c["lat"], 3), round(c["lon"], 3), len(c["items"])))

    with open(OUT_PATH, "w", encoding="utf-8") as f:
        f.write(emit(clusters, labels))

    total = sum(len(c["items"]) for c in clusters)
    print("OK  %d lugares · %d fotos con GPS" % (len(clusters), total))
    print("miniaturas: %d generadas" % len(generated))
    if no_gps:
        print("sin GPS (se omiten del mapa): %s" % ", ".join(p["file"] for p in no_gps))
    for ident, lat, lon, n in unnamed:
        print('SIN NOMBRE  id "%s" en (%s, %s) · %d fotos → edita travel.ts' % (ident, lat, lon, n))


if __name__ == "__main__":
    main()
