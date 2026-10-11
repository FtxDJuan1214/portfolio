import type { Locale } from "./content";

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
  {
    id: "rionegro",
    name: { es: "Rionegro", en: "Rionegro" },
    region: "Antioquia",
    country: { es: "Colombia", en: "Colombia" },
    lat: 6.22285,
    lon: -75.17924,
    date: { es: "junio de 2023", en: "June 2023" },
    photos: [
      { thumb: "/viajes/thumb/PXL_20230618_194153833.jpg", full: "/viajes/full/PXL_20230618_194153833.jpg", width: 3072, height: 4080 },
    ],
  },
  {
    id: "san-miguel-de-allende",
    name: { es: "San Miguel de Allende", en: "San Miguel de Allende" },
    region: "Guanajuato",
    country: { es: "México", en: "Mexico" },
    lat: 20.91464,
    lon: -100.74409,
    date: { es: "diciembre de 2023", en: "December 2023" },
    photos: [
      { thumb: "/viajes/thumb/PXL_20231230_173312067.jpg", full: "/viajes/full/PXL_20231230_173312067.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20231230_183411795.jpg", full: "/viajes/full/PXL_20231230_183411795.jpg", width: 3072, height: 4080 },
      { thumb: "/viajes/thumb/PXL_20231230_190137984.jpg", full: "/viajes/full/PXL_20231230_190137984.jpg", width: 3072, height: 4080 },
      { thumb: "/viajes/thumb/PXL_20231230_211039171.jpg", full: "/viajes/full/PXL_20231230_211039171.jpg", width: 4080, height: 3072 },
    ],
  },
  {
    id: "leon",
    name: { es: "León", en: "León" },
    region: "Guanajuato",
    country: { es: "México", en: "Mexico" },
    lat: 21.01469,
    lon: -101.25454,
    date: { es: "diciembre de 2023", en: "December 2023" },
    photos: [
      { thumb: "/viajes/thumb/PXL_20231231_234503783.jpg", full: "/viajes/full/PXL_20231231_234503783.jpg", width: 4080, height: 3072 },
    ],
  },
  {
    id: "guadalajara",
    name: { es: "Guadalajara", en: "Guadalajara" },
    region: "Jalisco",
    country: { es: "México", en: "Mexico" },
    lat: 20.67627,
    lon: -103.34664,
    date: { es: "enero de 2024", en: "January 2024" },
    photos: [
      { thumb: "/viajes/thumb/PXL_20240101_180337069.jpg", full: "/viajes/full/PXL_20240101_180337069.jpg", width: 4080, height: 3072 },
    ],
  },
  {
    id: "taxco",
    name: { es: "Taxco", en: "Taxco" },
    region: "Guerrero",
    country: { es: "México", en: "Mexico" },
    lat: 18.5556,
    lon: -99.60307,
    date: { es: "enero de 2024", en: "January 2024" },
    photos: [
      { thumb: "/viajes/thumb/PXL_20240103_214533777.jpg", full: "/viajes/full/PXL_20240103_214533777.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20240103_232338908.jpg", full: "/viajes/full/PXL_20240103_232338908.jpg", width: 4080, height: 3072 },
    ],
  },
  {
    id: "mexico-city",
    name: { es: "Ciudad de México", en: "Mexico City" },
    region: "CDMX",
    country: { es: "México", en: "Mexico" },
    lat: 19.38984,
    lon: -99.16759,
    date: { es: "enero de 2024", en: "January 2024" },
    photos: [
      { thumb: "/viajes/thumb/PXL_20240105_170353005.jpg", full: "/viajes/full/PXL_20240105_170353005.jpg", width: 3072, height: 4080 },
      { thumb: "/viajes/thumb/PXL_20240105_231059129.jpg", full: "/viajes/full/PXL_20240105_231059129.jpg", width: 3072, height: 4080 },
    ],
  },
  {
    id: "valparaiso",
    name: { es: "Valparaíso", en: "Valparaíso" },
    region: "Valparaíso",
    country: { es: "Chile", en: "Chile" },
    lat: -33.03809,
    lon: -71.60422,
    date: { es: "julio de 2024", en: "July 2024" },
    photos: [
      { thumb: "/viajes/thumb/PXL_20240718_222253712-NIGHT.jpg", full: "/viajes/full/PXL_20240718_222253712-NIGHT.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20240719_171504694-LONG_EXPOSURE-02-ORIGINAL.jpg", full: "/viajes/full/PXL_20240719_171504694-LONG_EXPOSURE-02-ORIGINAL.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20240719_214004236-MP.jpg", full: "/viajes/full/PXL_20240719_214004236-MP.jpg", width: 3072, height: 4080 },
    ],
  },
  {
    id: "cajon-del-maipo",
    name: { es: "Cajón del Maipo", en: "Cajón del Maipo" },
    region: "Región Metropolitana",
    country: { es: "Chile", en: "Chile" },
    lat: -33.35423,
    lon: -70.30368,
    date: { es: "julio de 2024", en: "July 2024" },
    photos: [
      { thumb: "/viajes/thumb/PXL_20240721_150249778.jpg", full: "/viajes/full/PXL_20240721_150249778.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20240721_194845694.jpg", full: "/viajes/full/PXL_20240721_194845694.jpg", width: 4080, height: 3072 },
    ],
  },
  {
    id: "santiago",
    name: { es: "Santiago", en: "Santiago" },
    region: "Región Metropolitana",
    country: { es: "Chile", en: "Chile" },
    lat: -33.48389,
    lon: -70.62149,
    date: { es: "julio de 2024", en: "July 2024" },
    photos: [
      { thumb: "/viajes/thumb/PXL_20240722_193530254.jpg", full: "/viajes/full/PXL_20240722_193530254.jpg", width: 4080, height: 3072 },
    ],
  },
  {
    id: "andes-mountains",
    name: { es: "Cordillera de los Andes", en: "Andes Mountains" },
    region: "Mendoza",
    country: { es: "Argentina", en: "Argentina" },
    lat: -32.82666,
    lon: -69.88766,
    date: { es: "julio de 2024", en: "July 2024" },
    photos: [
      { thumb: "/viajes/thumb/PXL_20240727_165951867.jpg", full: "/viajes/full/PXL_20240727_165951867.jpg", width: 4080, height: 3072 },
    ],
  },
  {
    id: "mendoza",
    name: { es: "Mendoza", en: "Mendoza" },
    region: "Mendoza",
    country: { es: "Argentina", en: "Argentina" },
    lat: -32.88919,
    lon: -68.84497,
    date: { es: "julio de 2024", en: "July 2024" },
    photos: [
      { thumb: "/viajes/thumb/PXL_20240728_175645760.jpg", full: "/viajes/full/PXL_20240728_175645760.jpg", width: 4080, height: 3072 },
    ],
  },
  {
    id: "buenos-aires",
    name: { es: "Buenos Aires", en: "Buenos Aires" },
    region: "CABA",
    country: { es: "Argentina", en: "Argentina" },
    lat: -34.5766,
    lon: -58.41355,
    date: { es: "agosto de 2024", en: "August 2024" },
    photos: [
      { thumb: "/viajes/thumb/PXL_20240817_200742018.jpg", full: "/viajes/full/PXL_20240817_200742018.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20240817_201843000.jpg", full: "/viajes/full/PXL_20240817_201843000.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20240817_212909937.jpg", full: "/viajes/full/PXL_20240817_212909937.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20240818_134941463.jpg", full: "/viajes/full/PXL_20240818_134941463.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20240818_172741065-MP.jpg", full: "/viajes/full/PXL_20240818_172741065-MP.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20240818_175019112.jpg", full: "/viajes/full/PXL_20240818_175019112.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20240818_191210685.jpg", full: "/viajes/full/PXL_20240818_191210685.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20240818_192638682.jpg", full: "/viajes/full/PXL_20240818_192638682.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20240818_192926631.jpg", full: "/viajes/full/PXL_20240818_192926631.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20240818_205429749.jpg", full: "/viajes/full/PXL_20240818_205429749.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20240819_185549802.jpg", full: "/viajes/full/PXL_20240819_185549802.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20240819_193356936.jpg", full: "/viajes/full/PXL_20240819_193356936.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20240819_194038981.jpg", full: "/viajes/full/PXL_20240819_194038981.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20240820_143712183.jpg", full: "/viajes/full/PXL_20240820_143712183.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20240820_151503791.jpg", full: "/viajes/full/PXL_20240820_151503791.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20240820_161944549.jpg", full: "/viajes/full/PXL_20240820_161944549.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20240820_162622257.jpg", full: "/viajes/full/PXL_20240820_162622257.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20240825_160102279.jpg", full: "/viajes/full/PXL_20240825_160102279.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20240825_194012811.jpg", full: "/viajes/full/PXL_20240825_194012811.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20240825_205622640-MP.jpg", full: "/viajes/full/PXL_20240825_205622640-MP.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20240826_001518172-MP.jpg", full: "/viajes/full/PXL_20240826_001518172-MP.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20240826_175132525.jpg", full: "/viajes/full/PXL_20240826_175132525.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20240826_184112687.jpg", full: "/viajes/full/PXL_20240826_184112687.jpg", width: 4080, height: 3072 },
    ],
  },
  {
    id: "la-plata",
    name: { es: "La Plata", en: "La Plata" },
    region: "Buenos Aires",
    country: { es: "Argentina", en: "Argentina" },
    lat: -34.92247,
    lon: -57.95555,
    date: { es: "agosto de 2024", en: "August 2024" },
    photos: [
      { thumb: "/viajes/thumb/PXL_20240824_160031852.jpg", full: "/viajes/full/PXL_20240824_160031852.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20240824_165948634.jpg", full: "/viajes/full/PXL_20240824_165948634.jpg", width: 4080, height: 3072 },
    ],
  },
  {
    id: "salento",
    name: { es: "Salento", en: "Salento" },
    region: "Quindío",
    country: { es: "Colombia", en: "Colombia" },
    lat: 4.67606,
    lon: -75.65873,
    date: { es: "octubre de 2024", en: "October 2024" },
    photos: [
      { thumb: "/viajes/thumb/PXL_20241005_155741364.jpg", full: "/viajes/full/PXL_20241005_155741364.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20241005_160852039.jpg", full: "/viajes/full/PXL_20241005_160852039.jpg", width: 4080, height: 3072 },
    ],
  },
  {
    id: "manizales",
    name: { es: "Manizales", en: "Manizales" },
    region: "Caldas",
    country: { es: "Colombia", en: "Colombia" },
    lat: 4.99054,
    lon: -75.38795,
    date: { es: "octubre de 2024", en: "October 2024" },
    photos: [
      { thumb: "/viajes/thumb/PXL_20241005_224149303.jpg", full: "/viajes/full/PXL_20241005_224149303.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20241006_152945287.jpg", full: "/viajes/full/PXL_20241006_152945287.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20241006_190558125.jpg", full: "/viajes/full/PXL_20241006_190558125.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20241006_204238189.jpg", full: "/viajes/full/PXL_20241006_204238189.jpg", width: 4080, height: 3072 },
    ],
  },
  {
    id: "barichara",
    name: { es: "Barichara", en: "Barichara" },
    region: "Santander",
    country: { es: "Colombia", en: "Colombia" },
    lat: 6.63459,
    lon: -73.21914,
    date: { es: "junio de 2025", en: "June 2025" },
    photos: [
      { thumb: "/viajes/thumb/PXL_20250623_150854988.jpg", full: "/viajes/full/PXL_20250623_150854988.jpg", width: 3072, height: 4080 },
      { thumb: "/viajes/thumb/PXL_20250623_203132798.jpg", full: "/viajes/full/PXL_20250623_203132798.jpg", width: 3072, height: 4080 },
      { thumb: "/viajes/thumb/PXL_20250623_221838953.jpg", full: "/viajes/full/PXL_20250623_221838953.jpg", width: 3072, height: 4080 },
      { thumb: "/viajes/thumb/PXL_20250624_165020452.jpg", full: "/viajes/full/PXL_20250624_165020452.jpg", width: 3072, height: 4080 },
      { thumb: "/viajes/thumb/PXL_20250624_165844526~2.jpg", full: "/viajes/full/PXL_20250624_165844526~2.jpg", width: 3072, height: 4080 },
    ],
  },
  {
    id: "campos-do-jordao",
    name: { es: "Campos do Jordão", en: "Campos do Jordão" },
    region: "São Paulo",
    country: { es: "Brasil", en: "Brazil" },
    lat: -22.72266,
    lon: -45.56468,
    date: { es: "enero de 2026", en: "January 2026" },
    photos: [
      { thumb: "/viajes/thumb/PXL_20260110_141615679.jpg", full: "/viajes/full/PXL_20260110_141615679.jpg", width: 3072, height: 4080 },
      { thumb: "/viajes/thumb/PXL_20260110_141725198.jpg", full: "/viajes/full/PXL_20260110_141725198.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20260110_143655145.jpg", full: "/viajes/full/PXL_20260110_143655145.jpg", width: 3072, height: 4080 },
      { thumb: "/viajes/thumb/PXL_20260110_172945714.jpg", full: "/viajes/full/PXL_20260110_172945714.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20260110_173342175.jpg", full: "/viajes/full/PXL_20260110_173342175.jpg", width: 3072, height: 4080 },
      { thumb: "/viajes/thumb/PXL_20260110_174838225.jpg", full: "/viajes/full/PXL_20260110_174838225.jpg", width: 3072, height: 4080 },
      { thumb: "/viajes/thumb/PXL_20260110_180755485.jpg", full: "/viajes/full/PXL_20260110_180755485.jpg", width: 3072, height: 4080 },
      { thumb: "/viajes/thumb/PXL_20260110_182140962.jpg", full: "/viajes/full/PXL_20260110_182140962.jpg", width: 3072, height: 4080 },
      { thumb: "/viajes/thumb/PXL_20260110_182231698.jpg", full: "/viajes/full/PXL_20260110_182231698.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20260110_183119612.jpg", full: "/viajes/full/PXL_20260110_183119612.jpg", width: 3072, height: 4080 },
      { thumb: "/viajes/thumb/PXL_20260110_183850848.jpg", full: "/viajes/full/PXL_20260110_183850848.jpg", width: 3072, height: 4080 },
      { thumb: "/viajes/thumb/PXL_20260110_184355058.jpg", full: "/viajes/full/PXL_20260110_184355058.jpg", width: 3072, height: 4080 },
      { thumb: "/viajes/thumb/PXL_20260110_190716649.jpg", full: "/viajes/full/PXL_20260110_190716649.jpg", width: 4080, height: 3072 },
    ],
  },
  {
    id: "sao-paulo",
    name: { es: "São Paulo", en: "São Paulo" },
    region: "São Paulo",
    country: { es: "Brasil", en: "Brazil" },
    lat: -23.55407,
    lon: -46.64732,
    date: { es: "enero de 2026", en: "January 2026" },
    photos: [
      { thumb: "/viajes/thumb/PXL_20260111_160137280.jpg", full: "/viajes/full/PXL_20260111_160137280.jpg", width: 3072, height: 4080 },
      { thumb: "/viajes/thumb/PXL_20260111_162826862.jpg", full: "/viajes/full/PXL_20260111_162826862.jpg", width: 3072, height: 4080 },
      { thumb: "/viajes/thumb/PXL_20260111_163930518.jpg", full: "/viajes/full/PXL_20260111_163930518.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20260111_174145920.jpg", full: "/viajes/full/PXL_20260111_174145920.jpg", width: 4080, height: 3072 },
      { thumb: "/viajes/thumb/PXL_20260111_180313747.jpg", full: "/viajes/full/PXL_20260111_180313747.jpg", width: 3072, height: 4080 },
    ],
  },
  {
    id: "sincelejo",
    name: { es: "Sincelejo", en: "Sincelejo" },
    region: "Sucre",
    country: { es: "Colombia", en: "Colombia" },
    lat: 9.43173,
    lon: -75.6291,
    date: { es: "julio de 2026", en: "July 2026" },
    photos: [
      { thumb: "/viajes/thumb/PXL_20260706_201656910.jpg", full: "/viajes/full/PXL_20260706_201656910.jpg", width: 3072, height: 4080 },
      { thumb: "/viajes/thumb/PXL_20260706_204402183.jpg", full: "/viajes/full/PXL_20260706_204402183.jpg", width: 3072, height: 4080 },
    ],
  },
  {
    id: "tolú",
    name: { es: "Tolú", en: "Tolú" },
    region: "Sucre",
    country: { es: "Colombia", en: "Colombia" },
    lat: 9.73449,
    lon: -75.74914,
    date: { es: "julio de 2026", en: "July 2026" },
    photos: [
      { thumb: "/viajes/thumb/PXL_20260710_103304064.jpg", full: "/viajes/full/PXL_20260710_103304064.jpg", width: 3072, height: 4080 },
      { thumb: "/viajes/thumb/PXL_20260710_103913657.jpg", full: "/viajes/full/PXL_20260710_103913657.jpg", width: 3072, height: 4080 },
    ],
  },
  {
    id: "guatavita",
    name: { es: "Guatavita", en: "Guatavita" },
    region: "Cundinamarca",
    country: { es: "Colombia", en: "Colombia" },
    lat: 4.93518,
    lon: -73.83055,
    date: { es: "septiembre de 2026", en: "September 2026" },
    photos: [
      { thumb: "/viajes/thumb/PXL_20260903_225803556.jpg", full: "/viajes/full/PXL_20260903_225803556.jpg", width: 3072, height: 4080 },
    ],
  },
  {
    id: "silvania",
    name: { es: "Silvania", en: "Silvania" },
    region: "Cundinamarca",
    country: { es: "Colombia", en: "Colombia" },
    lat: 4.32451,
    lon: -74.3318,
    date: { es: "septiembre de 2026", en: "September 2026" },
    photos: [
      { thumb: "/viajes/thumb/PXL_20260908_225022922.jpg", full: "/viajes/full/PXL_20260908_225022922.jpg", width: 3072, height: 4080 },
    ],
  },
];
