/**
 * Contenido del portafolio en ES/EN.
 * Fuente: hoja de vida de Juan Camilo Hernández Ortiz.
 */

export type Locale = "es" | "en";

type Localized = Record<Locale, string>;

export type ExperienceItem = {
  id: string;
  company: string;
  role: Localized;
  place: string;
  period: Localized;
  current: boolean;
  bullets: Record<Locale, string[]>;
  tech: string[];
};

export type ProjectItem = {
  id: string;
  name: string;
  period: string;
  featured: boolean;
  summary: Localized;
  highlights: Record<Locale, string[]>;
  tech: string[];
};

export type EducationItem = {
  id: string;
  institution: string;
  title: Localized;
  period: Localized;
  current: boolean;
};

export type StackGroup = {
  id: string;
  label: Localized;
  items: string[];
};

export const ui: Record<Locale, Record<string, string>> = {
  es: {
    heroGreeting: "Hola, soy",
    heroCtaProjects: "Ver proyectos",
    heroCtaContact: "Hablemos",
    heroScroll: "Desliza para explorar",
    aboutTag: "Perfil",
    aboutTitle: "Sobre mí",
    aboutMeTag: "Personal",
    aboutMeTitle: "Sobre mí",
    aboutMeLink: "Sobre mí",
    aboutMeInterests: "Me gusta",
    travelTag: "Viajes",
    travelTitle: "Foticos de lugares visitados",
    travelLead:
      "Cada punto del mapa es un lugar al que fui con la cámara encima. Toca uno para ver las fotos.",
    experienceTag: "Trayectoria",
    experienceTitle: "Experiencia",
    projectsTag: "Trabajo",
    projectsTitle: "Proyectos",
    stackTag: "Herramientas",
    stackTitle: "Stack técnico",
    educationTag: "Academia",
    educationTitle: "Formación",
    contactTag: "Contacto",
    contactTitle: "Construyamos algo",
    contactLead:
      "Estoy abierto a proyectos, colaboraciones y conversaciones sobre arquitectura, producto o visión por computador.",
    downloadCv: "Descargar CV",
    copyEmail: "Copiar correo",
    copied: "¡Copiado!",
    current: "Actual",
    yearsLabel: "años de experiencia",
    projectsLabel: "proyectos entregados",
    langLabel: "años con TypeScript",
    rolesLabel: "niveles de carrera",
    themeAuto: "Tema automático (día/noche)",
    themeLight: "Tema claro",
    themeDark: "Tema oscuro",
    paletteToggle: "Cambiar paleta",
    langToggle: "Cambiar idioma",
    backToTop: "Volver arriba",
    rightsReserved: "Todos los derechos reservados.",
    builtWith: "Hecho con Next.js, Tailwind y Motion",
    menu: "Menú",
    close: "Cerrar",
  },
  en: {
    heroGreeting: "Hi, I'm",
    heroCtaProjects: "See projects",
    heroCtaContact: "Let's talk",
    heroScroll: "Scroll to explore",
    aboutTag: "Profile",
    aboutTitle: "About me",
    aboutMeTag: "Personal",
    aboutMeTitle: "About me",
    aboutMeLink: "About me",
    aboutMeInterests: "Things I like",
    travelTag: "Travel",
    travelTitle: "Snapshots from places I've visited",
    travelLead:
      "Every dot on the map is a place I went to with a camera in hand. Tap one to see the photos.",
    experienceTag: "Career",
    experienceTitle: "Experience",
    projectsTag: "Work",
    projectsTitle: "Projects",
    stackTag: "Tooling",
    stackTitle: "Tech stack",
    educationTag: "Academics",
    educationTitle: "Education",
    contactTag: "Contact",
    contactTitle: "Let's build something",
    contactLead:
      "I'm open to projects, collaborations and conversations about architecture, product or computer vision.",
    downloadCv: "Download CV",
    copyEmail: "Copy email",
    copied: "Copied!",
    current: "Current",
    yearsLabel: "years of experience",
    projectsLabel: "projects delivered",
    langLabel: "years with TypeScript",
    rolesLabel: "career levels",
    themeAuto: "Automatic theme (day/night)",
    themeLight: "Light theme",
    themeDark: "Dark theme",
    paletteToggle: "Change palette",
    langToggle: "Switch language",
    backToTop: "Back to top",
    rightsReserved: "All rights reserved.",
    builtWith: "Built with Next.js, Tailwind and Motion",
    menu: "Menu",
    close: "Close",
  },
};

export const heroTitles: Record<Locale, string[]> = {
  es: [
    "Senior Full Stack Developer",
    "Technical Lead de Frontend",
    "Arquitecto de plataformas SaaS",
    "Estudiante de visión por computador",
  ],
  en: [
    "Senior Full Stack Developer",
    "Frontend Technical Lead",
    "SaaS platform architect",
    "Computer vision researcher",
  ],
};

export const about: Record<Locale, string[]> = {
  es: [
    "Senior Full Stack Developer con 6 años de experiencia liderando el desarrollo de plataformas SaaS B2B. Soy Technical Lead del frontend de Coordinate, una plataforma de gestión de proyectos y servicios construida con React, Next.js y TypeScript, desplegada en AWS.",
    "Tengo amplia experiencia en arquitecturas full stack con Node.js, PostgreSQL y servicios cloud. Complementariamente, llevo 3 años desarrollando plugins en C# para AutoCAD, optimizando flujos de diseño e instalación de fibra óptica en equipos de ingeniería.",
    "Actualmente curso una Maestría en Ingeniería de Sistemas y Computación en la Universidad Nacional de Colombia, donde investigo detección de evasión en sistemas BRT mediante redes neuronales convolucionales.",
  ],
  en: [
    "Senior Full Stack Developer with 6 years of experience leading the development of B2B SaaS platforms. I'm the frontend Technical Lead of Coordinate, a project and service management platform built with React, Next.js and TypeScript, deployed on AWS.",
    "I have broad experience in full stack architectures with Node.js, PostgreSQL and cloud services. On top of that, I've spent 3 years building C# plugins for AutoCAD, streamlining fiber-optic design and installation workflows for engineering teams.",
    "I'm currently pursuing a Master's in Systems and Computing Engineering at Universidad Nacional de Colombia, researching fare-evasion detection in BRT systems using convolutional neural networks.",
  ],
};

export const experience: ExperienceItem[] = [
  {
    id: "fortex-senior",
    company: "Fortex Design S.A.S",
    role: {
      es: "Desarrollador de Software Senior",
      en: "Senior Software Developer",
    },
    place: "Bogotá, CO",
    period: { es: "Nov 2024 – Presente", en: "Nov 2024 – Present" },
    current: true,
    bullets: {
      es: [
        "Construcción y toma de decisiones técnicas de la plataforma Coordinate como líder técnico de frontend, con ReactJS, TypeScript, Next.js, TypeORM y ExpressJS.",
        "Liderazgo en revisión de código y guía técnica al equipo de desarrollo, velando por la calidad del código y las buenas prácticas.",
        "Desarrollo back-end con Node.js, TypeORM y PostgreSQL.",
        "Despliegue de servicios de aplicación web y API usando AWS.",
        "Creación de plug-ins con la API .NET para AutoCAD en C#.",
        "Soporte a usuarios de la plataforma.",
      ],
      en: [
        "Built and drove technical decisions for the Coordinate platform as frontend tech lead, using ReactJS, TypeScript, Next.js, TypeORM and ExpressJS.",
        "Led code reviews and technical guidance for the dev team, ensuring code quality and best practices.",
        "Back-end development with Node.js, TypeORM and PostgreSQL.",
        "Deployed web application and API services on AWS.",
        "Built plug-ins with the .NET API for AutoCAD in C#.",
        "Provided support to platform users.",
      ],
    },
    tech: ["React", "TypeScript", "Next.js", "Node.js", "TypeORM", "PostgreSQL", "AWS", "C#"],
  },
  {
    id: "fortex-semi",
    company: "Fortex Design S.A.S",
    role: {
      es: "Desarrollador de Software Semi Senior",
      en: "Mid-level Software Developer",
    },
    place: "Bogotá, CO",
    period: { es: "Nov 2021 – 2024", en: "Nov 2021 – 2024" },
    current: false,
    bullets: {
      es: [
        "Construcción de la plataforma Coordinate con React y Node.js (full stack).",
        "Administración de bases de datos en PostgreSQL.",
        "Despliegue de servicios de aplicación web y API usando AWS.",
        "Creación de plug-ins con la API .NET para AutoCAD en C#.",
        "Soporte a usuarios de la plataforma y versionamiento en Git.",
      ],
      en: [
        "Built the Coordinate platform with React and Node.js (full stack).",
        "Managed PostgreSQL databases.",
        "Deployed web application and API services on AWS.",
        "Built plug-ins with the .NET API for AutoCAD in C#.",
        "Supported platform users and handled version control with Git.",
      ],
    },
    tech: ["React", "Node.js", "PostgreSQL", "AWS", "C#", "Git"],
  },
  {
    id: "fortex-junior",
    company: "Fortex Design S.A.S",
    role: {
      es: "Desarrollador de Software Junior",
      en: "Junior Software Developer",
    },
    place: "Bogotá, CO",
    period: { es: "Nov 2019 – Nov 2021", en: "Nov 2019 – Nov 2021" },
    current: false,
    bullets: {
      es: [
        "Creación de plug-ins con la API .NET para AutoCAD en C#.",
        "Elaboración de algoritmos en Google Apps Script para Google Sheets.",
        "Administración de bases de datos en PostgreSQL.",
        "Construcción y despliegue de una aplicación web empresarial (full stack).",
        "Soporte a usuarios de la plataforma.",
      ],
      en: [
        "Built plug-ins with the .NET API for AutoCAD in C#.",
        "Wrote algorithms in Google Apps Script for Google Sheets.",
        "Managed PostgreSQL databases.",
        "Built and deployed an enterprise web application (full stack).",
        "Provided support to platform users.",
      ],
    },
    tech: ["C#", "AutoCAD API", "Google Apps Script", "PostgreSQL", "PHP"],
  },
];

export const projects: ProjectItem[] = [
  {
    id: "coordinate",
    name: "Coordinate App",
    period: "2023 — Presente",
    featured: true,
    summary: {
      es: "Plataforma para la gestión de proyectos personales y corporativos, diseñada para facilitar la comunicación y la colaboración en las actividades realizadas.",
      en: "Platform for managing personal and corporate projects, designed to streamline communication and collaboration across activities.",
    },
    highlights: {
      es: [
        "Frontend con React, MUI, Next.js v15, Blocknote, Datagrid y Jotai.",
        "Backend con TypeScript, Node.js, ExpressJS y TypeORM.",
        "Base de datos PostgreSQL.",
        "Infraestructura AWS: S3, EC2, RDS y Lambda.",
        "Despliegue con Ubuntu Server, Nginx y PM2.",
      ],
      en: [
        "Frontend with React, MUI, Next.js v15, Blocknote, Datagrid and Jotai.",
        "Backend with TypeScript, Node.js, ExpressJS and TypeORM.",
        "PostgreSQL database.",
        "AWS infrastructure: S3, EC2, RDS and Lambda.",
        "Deployment with Ubuntu Server, Nginx and PM2.",
      ],
    },
    tech: ["React", "Next.js", "MUI", "Jotai", "TypeScript", "ExpressJS", "TypeORM", "PostgreSQL", "AWS"],
  },
  {
    id: "transmilenio",
    name: "Detección de Evasión en TransMilenio",
    period: "2025 — 2026",
    featured: true,
    summary: {
      es: "Proyecto de grado de maestría: detectar evasión mediante análisis de video en sistemas BRT (aplicado a TransMilenio) usando redes neuronales convolucionales y algoritmos de IA.",
      en: "Master's thesis: detecting fare evasion through video analysis in BRT systems (applied to TransMilenio) using convolutional neural networks and AI algorithms.",
    },
    highlights: {
      es: [
        "Python, YOLO11m, OpenCV, BoT-SORT y ByteTrack.",
        "Método híbrido: detección + tracking multi-objeto + reglas espaciales sobre trayectorias.",
        "Dataset propio de 1.800 clips reales y grid search de 40 configuraciones.",
        "Validación sobre 1.500 videos: F1-Score 84.88% y precisión 92.7%.",
        "Construcción de dataset y etiquetado con FFmpeg y Roboflow.",
      ],
      en: [
        "Python, YOLO11m, OpenCV, BoT-SORT and ByteTrack.",
        "Hybrid method: detection + multi-object tracking + spatial rules over trajectories.",
        "Proprietary dataset of 1,800 real clips and a 40-configuration grid search.",
        "Validation on 1,500 videos: 84.88% F1-Score and 92.7% precision.",
        "Dataset construction and labeling with FFmpeg and Roboflow.",
      ],
    },
    tech: ["Python", "YOLO11m", "OpenCV", "BoT-SORT", "ByteTrack", "NumPy", "Roboflow", "FFmpeg"],
  },
  {
    id: "fortexdesign",
    name: "FortexDesign App",
    period: "2020 — 2022",
    featured: false,
    summary: {
      es: "Software para la gestión de procesos internos: procesamiento de información de proyectos, ejecución de acciones automatizadas y presentación de datos para la toma de decisiones estratégicas.",
      en: "Software for internal process management: project data processing, automated actions and data presentation to support strategic decision-making.",
    },
    highlights: {
      es: [
        "PHP con Laravel y JavaScript.",
        "CSS, HTML y Bootstrap.",
        "Integración con Gmail API y Google Drive API.",
        "Mapas con GeoJSON y Leaflet.",
        "Despliegue de servicios en Windows Server.",
      ],
      en: [
        "PHP with Laravel and JavaScript.",
        "CSS, HTML and Bootstrap.",
        "Integration with Gmail API and Google Drive API.",
        "Mapping with GeoJSON and Leaflet.",
        "Service deployment on Windows Server.",
      ],
    },
    tech: ["PHP", "Laravel", "JavaScript", "Bootstrap", "Leaflet", "GeoJSON"],
  },
  {
    id: "agrosyst",
    name: "Agrosyst Co",
    period: "2019 — 2020",
    featured: false,
    summary: {
      es: "Sistema de información inteligente para el registro y seguimiento de costos y producción en el cultivo de tomate de árbol.",
      en: "Intelligent information system for tracking costs and production in tree-tomato farming.",
    },
    highlights: {
      es: [
        "PostgreSQL como motor de base de datos.",
        "PHP, JavaScript y jQuery.",
        "Bootstrap, CSS y HTML.",
        "Metodología XP.",
      ],
      en: [
        "PostgreSQL as the database engine.",
        "PHP, JavaScript and jQuery.",
        "Bootstrap, CSS and HTML.",
        "XP methodology.",
      ],
    },
    tech: ["PostgreSQL", "PHP", "JavaScript", "jQuery", "Bootstrap"],
  },
  {
    id: "seygifi",
    name: "SEYGIFI",
    period: "2018",
    featured: false,
    summary: {
      es: "Sistema de información para la administración y control de grupos de investigación, semilleros, líneas de investigación y proyectos de la facultad de ingeniería de la Universidad de Cundinamarca.",
      en: "Information system to manage research groups, seedbeds, research lines and projects for the engineering faculty at Universidad de Cundinamarca.",
    },
    highlights: {
      es: [
        "PHP, JavaScript, jQuery y MySQL.",
        "CSS, HTML y Materialize.",
        "Metodología SCRUM.",
      ],
      en: [
        "PHP, JavaScript, jQuery and MySQL.",
        "CSS, HTML and Materialize.",
        "SCRUM methodology.",
      ],
    },
    tech: ["PHP", "JavaScript", "jQuery", "MySQL", "Materialize"],
  },
];

export const education: EducationItem[] = [
  {
    id: "unal",
    institution: "Universidad Nacional de Colombia",
    title: {
      es: "Maestría en Ingeniería de Sistemas y Computación",
      en: "MSc in Systems and Computing Engineering",
    },
    period: { es: "Ene 2023 – Presente", en: "Jan 2023 – Present" },
    current: true,
  },
  {
    id: "wse",
    institution: "Wall Street English",
    title: {
      es: "Curso de inglés: B1 certificado",
      en: "English course: certified B1",
    },
    period: { es: "Feb 2021 – Abr 2022", en: "Feb 2021 – Apr 2022" },
    current: false,
  },
  {
    id: "udec",
    institution: "Universidad de Cundinamarca",
    title: {
      es: "Ingeniero de Sistemas",
      en: "BSc in Systems Engineering",
    },
    period: { es: "Ene 2016 – Sep 2020", en: "Jan 2016 – Sep 2020" },
    current: false,
  },
];

export const stack: StackGroup[] = [
  {
    id: "frameworks",
    label: { es: "Tecnologías", en: "Technologies" },
    items: [
      "React",
      "MUI",
      "Next.js",
      "NestJS",
      "ExpressJS",
      "TypeORM",
      "Laravel",
      "jQuery",
      "Materialize",
      "Bootstrap",
      "Leaflet",
      "Blocknote",
      "Jotai",
    ],
  },
  {
    id: "languages",
    label: { es: "Lenguajes", en: "Languages" },
    items: ["JavaScript", "TypeScript", "C#", "C++", "SQL", "PHP", "Python"],
  },
  {
    id: "databases",
    label: { es: "Bases de datos", en: "Databases" },
    items: ["PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    id: "ai",
    label: { es: "IA / Visión por computador", en: "AI / Computer vision" },
    items: ["YOLO", "OpenCV", "ByteTrack", "NumPy"],
  },
  {
    id: "apis",
    label: { es: "APIs", en: "APIs" },
    items: ["Gmail API", "Google Drive API", "GeoJSON"],
  },
  {
    id: "cloud",
    label: { es: "Servicios cloud", en: "Cloud services" },
    items: ["AWS S3", "AWS EC2", "AWS SES", "AWS RDS", "AWS Lambda"],
  },
  {
    id: "devops",
    label: { es: "Despliegue", en: "Deployment" },
    items: ["Ubuntu Server", "Nginx", "PM2", "Windows Server"],
  },
  {
    id: "others",
    label: { es: "Otros", en: "Others" },
    items: [
      "FFmpeg",
      "Roboflow",
      "Google Apps Script",
      "AutoCAD API (.NET)",
      "Git",
      "GitHub",
    ],
  },
];

export const stats: { value: string; label: keyof (typeof ui)["es"] }[] = [
  { value: "6+", label: "yearsLabel" },
  { value: "5", label: "projectsLabel" },
  { value: "4+", label: "langLabel" },
  { value: "3", label: "rolesLabel" },
];
