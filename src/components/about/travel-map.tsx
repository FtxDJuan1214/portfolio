"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, MapPin, Minus, Plus, RotateCcw, X } from "lucide-react";
import { useLocale } from "@/components/providers/locale-provider";
import { COUNTRY_PATHS, MAP_BOUNDS, MAP_VIEWBOX } from "@/config/latam-geo";
import { travelPlaces, type TravelPlace } from "@/config/travel";
import { cn } from "@/lib/utils";

const MIN_ZOOM = 1;
const MAX_ZOOM = 6;

/** Mercator: misma proyección usada al generar los paths de los países. */
function project(lon: number, lat: number) {
  const radius = MAP_VIEWBOX.width / ((MAP_BOUNDS.lonMax - MAP_BOUNDS.lonMin) * (Math.PI / 180));
  const mercator = (value: number) =>
    Math.log(Math.tan(Math.PI / 4 + (value * Math.PI) / 360));
  const x = radius * ((lon - MAP_BOUNDS.lonMin) * (Math.PI / 180));
  const y = radius * (mercator(MAP_BOUNDS.latMax) - mercator(lat));
  return { x, y };
}

type Pin = TravelPlace & { x: number; y: number };

export function TravelMap() {
  const { locale } = useLocale();
  const es = locale === "es";
  const containerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{
    x: number;
    y: number;
    ox: number;
    oy: number;
    moved: boolean;
  } | null>(null);
  const swallowClick = useRef(false);

  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ place: string; index: number } | null>(null);

  const pins = useMemo<Pin[]>(
    () => travelPlaces.map((place) => ({ ...place, ...project(place.lon, place.lat) })),
    [],
  );

  const activePlace = pins.find((pin) => pin.id === active) ?? null;
  const lightboxPlace = pins.find((pin) => pin.id === lightbox?.place) ?? null;
  const lightboxPhoto = lightboxPlace?.photos[lightbox?.index ?? 0];

  const totalPhotos = useMemo(
    () => travelPlaces.reduce((sum, place) => sum + place.photos.length, 0),
    [],
  );
  const countries = useMemo(
    () => new Set(travelPlaces.map((place) => place.country.es)).size,
    [],
  );

  const clampOffset = useCallback((next: { x: number; y: number }, level: number) => {
    const limitX = ((level - 1) / level) * 50;
    const limitY = ((level - 1) / level) * 50;
    return {
      x: Math.max(-limitX, Math.min(limitX, next.x)),
      y: Math.max(-limitY, Math.min(limitY, next.y)),
    };
  }, []);

  const changeZoom = useCallback(
    (delta: number) => {
      setZoom((current) => {
        const next = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, current + delta));
        setOffset((previous) => clampOffset(previous, next));
        return next;
      });
    },
    [clampOffset],
  );

  const reset = useCallback(() => {
    setZoom(MIN_ZOOM);
    setOffset({ x: 0, y: 0 });
    setActive(null);
  }, []);

  const onPointerDown = (event: React.PointerEvent) => {
    if (zoom === MIN_ZOOM) return;
    // Se captura el puntero sólo cuando el gesto pasa a ser arrastre:
    // si se capturara al presionar, el click nunca llegaría a los pines.
    dragState.current = {
      x: event.clientX,
      y: event.clientY,
      ox: offset.x,
      oy: offset.y,
      moved: false,
    };
  };

  const onPointerMove = (event: React.PointerEvent) => {
    const state = dragState.current;
    if (!state || !containerRef.current) return;
    const dx = event.clientX - state.x;
    const dy = event.clientY - state.y;
    if (!state.moved) {
      // Umbral de arrastre: por debajo el gesto cuenta como click.
      if (Math.hypot(dx, dy) < 4) return;
      state.moved = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      setDragging(true);
    }
    const rect = containerRef.current.getBoundingClientRect();
    setOffset(
      clampOffset(
        {
          x: state.ox + (dx / rect.width) * 100,
          y: state.oy + (dy / rect.height) * 100,
        },
        zoom,
      ),
    );
  };

  const onPointerUp = () => {
    // Si fue arrastre, el click que sigue al pointerup no debe seleccionar un pin.
    if (dragState.current?.moved) swallowClick.current = true;
    dragState.current = null;
    setDragging(false);
  };

  const onClickCapture = (event: React.MouseEvent) => {
    if (swallowClick.current) {
      swallowClick.current = false;
      event.stopPropagation();
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (!lightbox || !lightboxPlace) return;
    const count = lightboxPlace.photos.length;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowRight" && count > 1)
        setLightbox({ place: lightbox.place, index: (lightbox.index + 1) % count });
      if (event.key === "ArrowLeft" && count > 1)
        setLightbox({ place: lightbox.place, index: (lightbox.index - 1 + count) % count });
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lightbox, lightboxPlace]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs text-subtle">
          <span className="rounded-full bg-primary/12 px-2.5 py-1 font-mono text-primary">
            {travelPlaces.length} {es ? "lugares" : "places"}
          </span>
          <span className="rounded-full bg-primary/12 px-2.5 py-1 font-mono text-primary">
            {totalPhotos} {es ? "fotos" : "photos"}
          </span>
          <span className="rounded-full bg-primary/12 px-2.5 py-1 font-mono text-primary">
            {countries} {es ? "países" : "countries"}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => changeZoom(-0.75)}
            disabled={zoom <= MIN_ZOOM}
            aria-label={es ? "Alejar" : "Zoom out"}
            className="grid size-8 cursor-pointer place-items-center rounded-lg border border-line/60 bg-surface/60 text-muted transition-colors hover:border-primary/60 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Minus className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => changeZoom(0.75)}
            disabled={zoom >= MAX_ZOOM}
            aria-label={es ? "Acercar" : "Zoom in"}
            className="grid size-8 cursor-pointer place-items-center rounded-lg border border-line/60 bg-surface/60 text-muted transition-colors hover:border-primary/60 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={reset}
            aria-label={es ? "Restablecer vista" : "Reset view"}
            className="grid size-8 cursor-pointer place-items-center rounded-lg border border-line/60 bg-surface/60 text-muted transition-colors hover:border-primary/60 hover:text-primary"
          >
            <RotateCcw className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.45fr_1fr]">
        <div
          ref={containerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onClickCapture={onClickCapture}
          className={cn(
            "panel relative aspect-[4/5] overflow-hidden rounded-card sm:aspect-[5/4] lg:aspect-auto lg:min-h-[560px]",
            zoom > MIN_ZOOM && (dragging ? "cursor-grabbing" : "cursor-grab"),
          )}
        >
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />

          <motion.div
            className="absolute inset-0"
            animate={{ scale: zoom, x: `${offset.x}%`, y: `${offset.y}%` }}
            transition={{ type: "spring", stiffness: 210, damping: 32 }}
          >
            <svg
              viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
              className="size-full"
              role="img"
              aria-label={
                es
                  ? "Mapa de Latinoamérica con los lugares visitados"
                  : "Map of Latin America with visited places"
              }
            >
              <defs>
                <linearGradient id="landFill" x1="0" y1="0" x2="0.4" y2="1">
                  <stop offset="0%" stopColor="oklch(var(--c-surface-strong))" />
                  <stop offset="100%" stopColor="oklch(var(--c-surface))" />
                </linearGradient>
                <filter id="pinGlow" x="-120%" y="-120%" width="340%" height="340%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <g>
                {COUNTRY_PATHS.map((country) => {
                  const isVisited = travelPlaces.some(
                    (place) => place.country.en === country.id,
                  );
                  return (
                    <path
                      key={country.id}
                      d={country.d}
                      fill={isVisited ? "oklch(var(--c-primary) / 0.16)" : "url(#landFill)"}
                      stroke={
                        isVisited
                          ? "oklch(var(--c-primary) / 0.5)"
                          : "oklch(var(--c-border) / 0.85)"
                      }
                      strokeWidth={isVisited ? 1.4 : 1}
                      strokeLinejoin="round"
                      className="transition-all duration-500"
                    />
                  );
                })}
              </g>

              <g>
                {pins.map((pin, index) => {
                  const isActive = active === pin.id;
                  const isHovered = hovered === pin.id;
                  const scale = 1 / zoom;
                  return (
                    <motion.g
                      key={pin.id}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.025,
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      style={{ transformOrigin: `${pin.x}px ${pin.y}px` }}
                      className="cursor-pointer"
                      onClick={() => setActive(isActive ? null : pin.id)}
                      onPointerEnter={() => !dragging && setHovered(pin.id)}
                      onPointerLeave={() => setHovered(null)}
                    >
                      {(isActive || isHovered) && (
                        <motion.circle
                          cx={pin.x}
                          cy={pin.y}
                          r={12 * scale}
                          fill="oklch(var(--c-primary) / 0.18)"
                          initial={{ scale: 0.4, opacity: 0 }}
                          animate={{ scale: [0.7, 1.35, 0.7], opacity: [0.7, 0, 0.7] }}
                          transition={{ duration: 2.4, repeat: Infinity }}
                          style={{ transformOrigin: `${pin.x}px ${pin.y}px` }}
                        />
                      )}
                      <circle
                        cx={pin.x}
                        cy={pin.y}
                        r={(isActive ? 6.5 : 5) * scale}
                        fill="oklch(var(--c-primary))"
                        stroke="oklch(var(--c-background))"
                        strokeWidth={1.8 * scale}
                        filter="url(#pinGlow)"
                        className="transition-all"
                      />
                      <circle
                        cx={pin.x}
                        cy={pin.y}
                        r={16 * scale}
                        fill="transparent"
                      />
                    </motion.g>
                  );
                })}
              </g>
            </svg>
          </motion.div>

          <AnimatePresence>
            {hovered && !active && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.18 }}
                className="panel panel-blur pointer-events-none absolute bottom-3 left-3 rounded-xl px-3 py-2"
              >
                <p className="text-xs font-semibold">
                  {pins.find((pin) => pin.id === hovered)?.name[locale]}
                </p>
                <p className="mt-0.5 text-[0.65rem] text-subtle">
                  {pins.find((pin) => pin.id === hovered)?.photos.length}{" "}
                  {es ? "fotos" : "photos"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="pointer-events-none absolute bottom-3 right-3 text-[0.6rem] uppercase tracking-[0.2em] text-subtle">
            {es ? "Toca un punto" : "Tap a point"}
          </p>
        </div>

        <div className="panel flex flex-col rounded-card">
          <AnimatePresence mode="wait">
            {activePlace ? (
              <motion.div
                key={activePlace.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full flex-col"
              >
                <div className="flex items-start justify-between gap-3 border-b border-line/60 p-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-semibold">
                      {activePlace.name[locale]}
                    </h3>
                    <p className="mt-0.5 truncate text-xs text-primary">
                      {activePlace.region} · {activePlace.country[locale]}
                    </p>
                    <p className="mt-1 text-[0.7rem] text-subtle">
                      {activePlace.date[locale]} · {activePlace.photos.length}{" "}
                      {es ? "fotos" : "photos"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    aria-label={es ? "Cerrar" : "Close"}
                    className="grid size-7 shrink-0 cursor-pointer place-items-center rounded-lg border border-line/60 text-muted transition-colors hover:border-primary/60 hover:text-primary"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>

                <div className="grid max-h-[420px] grid-cols-2 gap-2 overflow-y-auto p-3 lg:max-h-none lg:flex-1">
                  {activePlace.photos.map((photo, index) => (
                    <motion.button
                      key={photo.thumb}
                      type="button"
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.04, duration: 0.3 }}
                      onClick={() => setLightbox({ place: activePlace.id, index })}
                      className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl border border-line/60"
                    >
                      <Image
                        src={photo.thumb}
                        alt={`${activePlace.name[locale]} ${index + 1}`}
                        fill
                        sizes="(max-width: 1024px) 45vw, 200px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full flex-col p-4"
              >
                <div className="flex items-center gap-2.5">
                  <span className="grid size-9 place-items-center rounded-xl bg-primary/12 text-primary">
                    <MapPin className="size-4" />
                  </span>
                  <p className="text-sm text-muted">
                    {es
                      ? "Selecciona un punto del mapa para ver las fotos."
                      : "Select a point on the map to see the photos."}
                  </p>
                </div>

                <ul className="mt-4 flex max-h-[420px] flex-col gap-1 overflow-y-auto lg:max-h-none lg:flex-1">
                  {pins.map((pin) => (
                    <li key={pin.id}>
                      <button
                        type="button"
                        onClick={() => setActive(pin.id)}
                        onPointerEnter={() => setHovered(pin.id)}
                        onPointerLeave={() => setHovered(null)}
                        className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors hover:bg-surface-strong/60"
                      >
                        <span className="relative size-10 shrink-0 overflow-hidden rounded-lg border border-line/60">
                          <Image
                            src={pin.photos[0].thumb}
                            alt=""
                            fill
                            sizes="40px"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm text-foreground">
                            {pin.name[locale]}
                          </span>
                          <span className="block truncate text-[0.7rem] text-subtle">
                            {pin.country[locale]} · {pin.date[locale]}
                          </span>
                        </span>
                        <span className="shrink-0 font-mono text-[0.7rem] text-subtle">
                          {pin.photos.length}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && lightboxPlace && lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-xl"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="flex items-center justify-between gap-4 border-b border-line/50 px-4 py-3 sm:px-6"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {lightboxPlace.name[locale]}
                </p>
                <p className="mt-0.5 truncate text-xs text-subtle">
                  {lightboxPlace.region} · {lightboxPlace.date[locale]}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {lightboxPlace.photos.length > 1 && (
                  <span className="rounded-full border border-line/60 px-3 py-1 font-mono text-xs text-muted">
                    {lightbox.index + 1} / {lightboxPlace.photos.length}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  aria-label={es ? "Cerrar" : "Close"}
                  className="grid size-9 cursor-pointer place-items-center rounded-full border border-line/60 text-muted transition-colors hover:border-primary/60 hover:text-primary"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center p-4 sm:p-8">
              <motion.div
                key={lightboxPhoto.full}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={(event) => event.stopPropagation()}
                className="max-h-full max-w-full"
              >
                <Image
                  src={lightboxPhoto.full}
                  alt={lightboxPlace.name[locale]}
                  width={lightboxPhoto.width}
                  height={lightboxPhoto.height}
                  sizes="100vw"
                  className="max-h-[78vh] w-auto max-w-full rounded-lg object-contain"
                />
              </motion.div>

              {lightboxPlace.photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setLightbox({
                        place: lightbox.place,
                        index:
                          (lightbox.index - 1 + lightboxPlace.photos.length) %
                          lightboxPlace.photos.length,
                      });
                    }}
                    aria-label={es ? "Anterior" : "Previous"}
                    className="absolute left-4 top-1/2 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-line/60 bg-background/80 text-muted backdrop-blur transition-colors hover:border-primary/60 hover:text-primary"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setLightbox({
                        place: lightbox.place,
                        index: (lightbox.index + 1) % lightboxPlace.photos.length,
                      });
                    }}
                    aria-label={es ? "Siguiente" : "Next"}
                    className="absolute right-4 top-1/2 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-line/60 bg-background/80 text-muted backdrop-blur transition-colors hover:border-primary/60 hover:text-primary"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
