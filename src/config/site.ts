/**
 * Configuración general del sitio: identidad, enlaces y ajustes
 * globales de animación. Edita aquí, no en los componentes.
 */

export const siteConfig = {
  name: "Juan Camilo Hernández Ortiz",
  shortName: "Juan Hernández",
  initials: "JH",
  role: "Senior Full Stack Developer",
  location: "Bucaramanga, Colombia",
  email: "juancamilohernandezortiz@gmail.com",
  phone: "+57 301 517 3716",
  phoneHref: "+573015173716",
  github: "https://github.com/FtxDJuan1214",
  githubUser: "FtxDJuan1214",
  linkedin: "https://www.linkedin.com/in/juan-hernández-023604163",
  linkedinUser: "juan-hernández-023604163",
  cvPath: "/Juan-Hernandez-CV.pdf",
  url: "https://juanhernandez.dev",
  /** Año de inicio profesional, usado para calcular años de experiencia */
  careerStartYear: 2019,
} as const;

/** Ajustes globales de movimiento. */
export const motionConfig = {
  /** Duración base de los reveals, en segundos */
  duration: 0.7,
  /** Retardo entre hijos de una lista escalonada */
  stagger: 0.06,
  /** Desplazamiento vertical inicial de los reveals, en px */
  distance: 28,
  /** Curva de salida por defecto */
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  /** Porcentaje del elemento visible para disparar el reveal */
  viewportAmount: 0.25,
  /** Margen del viewport para adelantar/atrasar el trigger */
  viewportMargin: "-8% 0px -8% 0px",
  /** Habilita el smooth scroll (Lenis) */
  smoothScroll: true,
} as const;

export const navSections = [
  { id: "hero", labelEs: "Inicio", labelEn: "Home" },
  { id: "about", labelEs: "Perfil", labelEn: "About" },
  { id: "experience", labelEs: "Experiencia", labelEn: "Experience" },
  { id: "projects", labelEs: "Proyectos", labelEn: "Projects" },
  { id: "stack", labelEs: "Stack", labelEn: "Stack" },
  { id: "education", labelEs: "Formación", labelEn: "Education" },
  { id: "contact", labelEs: "Contacto", labelEn: "Contact" },
] as const;

export type SectionId = (typeof navSections)[number]["id"];
