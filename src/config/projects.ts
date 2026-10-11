/**
 * Contenido extendido de las páginas de proyecto (ES/EN).
 * Fuente: manuales y documentación de SEYGIFI V1.0 y Agrosyst Co V1.0.
 */

import type { Locale } from "./content";

type Localized<T> = Record<Locale, T>;

export type ProjectModule = {
  id: string;
  name: Localized<string>;
  description: Localized<string>;
  features: Localized<string[]>;
  /** Nivel de aporte propio sobre el módulo (usado para el distintivo visual). */
  ownership?: "full" | "base";
};

export type ProjectRole = {
  id: string;
  name: Localized<string>;
  scope: Localized<string>;
};

export type ProjectHighlight = {
  value: string;
  label: Localized<string>;
};

export type ProjectDocument = {
  id: string;
  label: Localized<string>;
  path: string;
  pages: number;
};

export type ProjectVideoGroup = {
  id: string;
  title: Localized<string>;
  description?: Localized<string>;
  /** URLs de videos (GitHub user-attachments, MP4, etc.). */
  videos: { url: string; label?: Localized<string> }[];
};

export type ProjectImageGroup = {
  id: string;
  title: Localized<string>;
  description?: Localized<string>;
  /** Métricas destacadas de la etapa, mostradas como chips sobre las imágenes. */
  metrics?: { label: Localized<string>; value: string }[];
  /** Imágenes estáticas servidas desde /public. */
  images: {
    src: string;
    alt: Localized<string>;
    width: number;
    height: number;
    caption?: Localized<string>;
  }[];
};

export type ProjectStats = ProjectHighlight[];

export type ProjectDetail = {
  slug: string;
  version: string;
  year: string;
  client: string;
  subtitle?: Localized<string>;
  /** URL del repositorio público, cuando el código es consultable. */
  repository?: string;
  context: Localized<string[]>;
  stats: ProjectStats;
  contribution?: {
    paragraphs: Localized<string[]>;
    highlights?: Localized<string[]>;
    video?: {
      src?: string;
      caption?: Localized<string>;
    };
  };
  stackGroups: { label: Localized<string>; items: string[] }[];
  publicSite?: { name: Localized<string>; description: Localized<string> }[];
  modulesHeading?: Localized<string>;
  modulesIntro?: Localized<string>;
  modules: ProjectModule[];
  generalFeatures: Localized<string[]>;
  /** Galerías de videos de muestra, agrupadas por tema. */
  videoGroups?: ProjectVideoGroup[];
  /** Galerías de imágenes (gráficas, matrices, diagramas), agrupadas por etapa. */
  imageGroups?: ProjectImageGroup[];
  roles?: ProjectRole[];
  reports?: Localized<string[]>;
  install?: Localized<string[]>;
  documents?: ProjectDocument[];
  team?: string[];
};

export const projectDetails: Record<string, ProjectDetail> = {
  seygifi: {
    slug: "seygifi",
    version: "V1.0",
    year: "2018",
    client: "Universidad de Cundinamarca — Facultad de Ingeniería",
    subtitle: {
      es: "Semilleros y Grupos de Investigación de la Facultad de Ingeniería",
      en: "Research Groups and Seedbeds of the Engineering Faculty",
    },
    context: {
      es: [
        "SEYGIFI (Semilleros y Grupos de Investigación de la Facultad de Ingeniería) fue uno de mis primeros proyectos grandes: una plataforma web para administrar y controlar toda la información de los grupos de investigación, semilleros, líneas de investigación y proyectos de la facultad.",
        "La plataforma es accesible desde cualquier navegador, interactiva, responsiva y adaptable a cualquier tamaño de pantalla. Incluye un sitio público de consulta y un panel administrativo con roles, reportes en PDF y gestión dinámica de datos.",
        "Mi rol en el proyecto fue crear la base del repositorio, definir el stack del código y el desarrollo completo de varios de los módulos de esta plataforma.",
      ],
      en: [
        "SEYGIFI (Research Groups and Seedbeds of the Engineering Faculty) was one of my first big projects: a web platform to manage and control all the information of research groups, seedbeds, research lines and projects of the faculty.",
        "The platform is accessible from any browser, interactive and fully responsive. It includes a public site for consultation and an admin panel with roles, PDF reports and dynamic data management.",
        "My role in the project was to create the repository base, define the code stack and fully develop several of the platform's modules.",
      ],
    },
    stats: [
      { value: "4", label: { es: "Roles de usuario", en: "User roles" } },
      { value: "10", label: { es: "Módulos de administración", en: "Admin modules" } },
      { value: "8", label: { es: "Tipos de reporte PDF", en: "PDF report types" } },
      { value: "5", label: { es: "Secciones públicas", en: "Public sections" } },
    ],
    stackGroups: [
      {
        label: { es: "Backend", en: "Backend" },
        items: ["PHP", "PostgreSQL", "Apache", "XAMPP"],
      },
      {
        label: { es: "Frontend", en: "Frontend" },
        items: ["JavaScript", "jQuery", "HTML", "CSS", "Materialize"],
      },
      {
        label: { es: "Datos y reportes", en: "Data & reports" },
        items: ["SQL", "pgAdmin 4", "Reportes PDF"],
      },
      {
        label: { es: "Proceso", en: "Process" },
        items: ["SCRUM", "Intranet / LAN", "Diseño responsivo"],
      },
    ],
    publicSite: [
      {
        name: { es: "Inicio", en: "Home" },
        description: {
          es: "Tarjetas de acceso rápido a líneas de investigación, grupos, semilleros y proyectos.",
          en: "Quick-access cards to research lines, groups, seedbeds and projects.",
        },
      },
      {
        name: { es: "Noticias", en: "News" },
        description: {
          es: "Publicaciones de los grupos y semilleros con vista ampliada de cada noticia.",
          en: "Posts from groups and seedbeds with an expanded view for each item.",
        },
      },
      {
        name: { es: "Conteo", en: "Counters" },
        description: {
          es: "Indicadores en vivo de líneas, grupos y semilleros registrados.",
          en: "Live counters of registered lines, groups and seedbeds.",
        },
      },
      {
        name: { es: "Consulta pública", en: "Public directory" },
        description: {
          es: "Información pública de líneas, grupos, semilleros y proyectos de la facultad.",
          en: "Public information on the faculty's lines, groups, seedbeds and projects.",
        },
      },
      {
        name: { es: "Redes y navegación", en: "Social & nav" },
        description: {
          es: "Enlaces a redes de la universidad y menú de navegación siempre visible.",
          en: "Links to the university's social media and an always-visible nav menu.",
        },
      },
    ],
    modules: [
      {
        id: "sedes",
        name: { es: "Sedes y extensiones", en: "Campuses & extensions" },
        description: {
          es: "Administración de sedes, seccionales y extensiones de la universidad.",
          en: "Management of the university's campuses, sectional centers and extensions.",
        },
        features: {
          es: ["CRUD completo", "Formularios validados"],
          en: ["Full CRUD", "Validated forms"],
        },
      },
      {
        id: "programas",
        name: { es: "Programas académicos", en: "Academic programs" },
        description: {
          es: "Gestión de los programas académicos ofrecidos por cada sede.",
          en: "Management of the academic programs offered by each campus.",
        },
        features: {
          es: ["CRUD completo", "Relación con sedes"],
          en: ["Full CRUD", "Campus relationship"],
        },
      },
      {
        id: "lineas",
        name: { es: "Líneas de investigación", en: "Research lines" },
        description: {
          es: "Registro y edición de las líneas de investigación de la universidad.",
          en: "Registration and editing of the university's research lines.",
        },
        features: {
          es: ["CRUD completo", "Reportes PDF generales e individuales"],
          en: ["Full CRUD", "General and individual PDF reports"],
        },
      },
      {
        id: "grupos",
        name: { es: "Grupos de investigación", en: "Research groups" },
        description: {
          es: "Administración de grupos, su información y sus líneas vinculadas.",
          en: "Management of groups, their data and linked research lines.",
        },
        features: {
          es: ["CRUD completo", "Vinculación de líneas", "Actualizaciones semestrales", "Reportes PDF"],
          en: ["Full CRUD", "Line linking", "Semi-annual updates", "PDF reports"],
        },
      },
      {
        id: "semilleros",
        name: { es: "Semilleros", en: "Seedbeds" },
        description: {
          es: "Administración de semilleros de investigación y sus líneas.",
          en: "Management of research seedbeds and their lines.",
        },
        features: {
          es: ["CRUD completo", "Vinculación de líneas", "Actualizaciones semestrales", "Reportes PDF"],
          en: ["Full CRUD", "Line linking", "Semi-annual updates", "PDF reports"],
        },
      },
      {
        id: "proyectos",
        name: { es: "Proyectos", en: "Projects" },
        description: {
          es: "Gestión de los proyectos de investigación vinculados a grupos y semilleros.",
          en: "Management of research projects linked to groups and seedbeds.",
        },
        features: {
          es: ["CRUD completo", "Archivos e imágenes", "Reportes PDF"],
          en: ["Full CRUD", "Files and images", "PDF reports"],
        },
      },
      {
        id: "actualizaciones",
        name: { es: "Actualizaciones semestrales", en: "Semi-annual updates" },
        description: {
          es: "Historial de actualizaciones semestrales de grupos y semilleros.",
          en: "History of semi-annual updates for groups and seedbeds.",
        },
        features: {
          es: ["CRUD completo", "Trazabilidad por periodo"],
          en: ["Full CRUD", "Per-period traceability"],
        },
      },
      {
        id: "lideres",
        name: { es: "Líderes", en: "Leaders" },
        description: {
          es: "Asignación y reemplazo de líderes de grupos y semilleros con creación automática de usuarios.",
          en: "Assignment and replacement of group/seedbed leaders with automatic user creation.",
        },
        features: {
          es: ["Alta de profesor + usuario", "Cambio de líder", "Selección de persona existente"],
          en: ["Professor + user onboarding", "Leader replacement", "Existing person selection"],
        },
      },
      {
        id: "personas",
        name: { es: "Personas", en: "People" },
        description: {
          es: "Directorio de estudiantes, egresados y profesores con filtros por rol.",
          en: "Directory of students, alumni and professors with role filters.",
        },
        features: {
          es: ["CRUD completo", "Filtros por tipo de persona", "Avisos de registro"],
          en: ["Full CRUD", "Person-type filters", "Registration notices"],
        },
      },
      {
        id: "noticias",
        name: { es: "Noticias", en: "News" },
        description: {
          es: "Publicación y edición de las noticias del sitio principal.",
          en: "Publishing and editing of the main site's news.",
        },
        features: {
          es: ["Rol publicador dedicado", "Editor de noticias"],
          en: ["Dedicated publisher role", "News editor"],
        },
      },
    ],
    generalFeatures: {
      es: [
        "Tablas dinámicas interactivas: filtrar, explorar y modificar sin recargar la página.",
        "Buscador dinámico en cada módulo para filtrar los registros de la tabla.",
        "Formularios con validación y avisos de confirmación (enviado, editado, verificación de datos).",
        "Gestión de imágenes y archivos en el servidor (hasta 1 MB por archivo).",
        "Visor de imágenes y PDF en línea para los registros documentales.",
        "Enlaces externos por registro y visualización de líneas vinculadas.",
        "Reportes generales e individuales en PDF para los cuatro objetos del sistema.",
        "Acceso multiusuario en red local mediante IP del servidor.",
      ],
      en: [
        "Interactive dynamic tables: filter, explore and modify without reloading the page.",
        "Dynamic search box in every module to filter table records.",
        "Forms with validation and confirmation notices (sent, edited, data check).",
        "Image and file management on the server (up to 1 MB per file).",
        "Inline image and PDF viewer for documentary records.",
        "External links per record and linked-lines viewer.",
        "General and individual PDF reports for the four system entities.",
        "Multi-user access over the local network via the server IP.",
      ],
    },
    roles: [
      {
        id: "admin",
        name: { es: "Administrador", en: "Administrator" },
        scope: {
          es: "Control total del sistema: todos los módulos, gestión de usuarios y configuración.",
          en: "Full system control: all modules, user management and configuration.",
        },
      },
      {
        id: "publicador",
        name: { es: "Publicador", en: "Publisher" },
        scope: {
          es: "Crea y edita las noticias que se publican en el sitio principal.",
          en: "Creates and edits the news published on the main site.",
        },
      },
      {
        id: "lider-grupo",
        name: { es: "Líder de grupo", en: "Group leader" },
        scope: {
          es: "Administra su propio grupo: semilleros, proyectos, personas y reportes del grupo, sus líneas y semilleros vinculados.",
          en: "Manages their own group: seedbeds, projects, people and reports for the group, its lines and linked seedbeds.",
        },
      },
      {
        id: "lider-semillero",
        name: { es: "Líder de semillero", en: "Seedbed leader" },
        scope: {
          es: "Administra su semillero: personas y reportes del semillero y sus líneas vinculadas.",
          en: "Manages their seedbed: people and reports for the seedbed and its linked lines.",
        },
      },
    ],
    reports: {
      es: [
        "General de líneas de investigación",
        "Individual de línea de investigación",
        "General de grupos de investigación",
        "Individual de grupo de investigación",
        "General de semilleros",
        "Individual de semillero",
        "General de proyectos",
        "Individual de proyecto",
      ],
      en: [
        "Research lines — general",
        "Research line — individual",
        "Research groups — general",
        "Research group — individual",
        "Seedbeds — general",
        "Seedbed — individual",
        "Projects — general",
        "Project — individual",
      ],
    },
    install: {
      es: [
        "Servidor Apache con PHP (instalado vía XAMPP) y PostgreSQL 10.",
        "Código desplegado en la carpeta htdocs del servidor.",
        "Base de datos restaurada desde seygifi.sql con pgAdmin 4.",
        "Acceso remoto desde cualquier equipo de la red vía IP/seygifi.",
      ],
      en: [
        "Apache server with PHP (installed via XAMPP) and PostgreSQL 10.",
        "Code deployed to the server's htdocs folder.",
        "Database restored from seygifi.sql with pgAdmin 4.",
        "Remote access from any device on the network via IP/seygifi.",
      ],
    },
    documents: [
      {
        id: "usuario",
        label: { es: "Manual de usuario", en: "User manual" },
        path: "/Manual-de-usuario-SEYGIFI.pdf",
        pages: 50,
      },
      {
        id: "sistema",
        label: { es: "Manual del sistema", en: "System manual" },
        path: "/Manual-del-sistema-SEYGIFI.pdf",
        pages: 29,
      },
    ],
    team: ["Laura Daniela Zorro Romero", "Juan Camilo Hernández Ortiz", "Faruht Cortes Bohorquez"],
  },

  agrosyst: {
    slug: "agrosyst",
    version: "V1.0",
    year: "2020",
    client: "Cultivadores de tomate de árbol — Vereda Buenos Aires Alto, Pandi (Cundinamarca)",
    subtitle: {
      es: "Sistema de información para el registro y seguimiento de costos y producción del cultivo de tomate de árbol",
      en: "Information system for recording and tracking the costs and production of the tree-tomato crop",
    },
    repository: "https://github.com/FtxDJuan1214/Agrosyst",
    context: {
      es: [
        "Agrosyst Co nació como proyecto de grado en la Universidad de Cundinamarca (extensión Fusagasugá): un sistema de información web para registrar y hacer seguimiento a los costos y la producción del cultivo de tomate de árbol (Cyphomandra betacea) en la Vereda Buenos Aires Alto, Pandi — Cundinamarca.",
        "La plataforma digitaliza la operación completa de los cultivos: fincas, lotes, socios y trabajadores; convenios de jornal y contrato; compras con aportes de los socios, stock de insumos, labores, tareas y cosechas, hasta cerrar el ciclo con informes de aportes, recaudos y rendimiento. Todo sobre una arquitectura cliente-servidor con PostgreSQL, desplegada en hosting web.",
        "Fue un proyecto colaborativo de cuatro integrantes construido con metodología XP. Yo lideré el proyecto: definí el stack, construí la base del código, el esquema inicial de la base de datos (59 tablas) y programé el 100% de los módulos de producción y costos. En el componente fitosanitario construí la estructura base de sus módulos — vistas, scripts y endpoints CRUD — sobre la que el equipo completó la lógica funcional.",
      ],
      en: [
        "Agrosyst Co was born as a capstone project at Universidad de Cundinamarca (Fusagasugá branch): a web information system to record and track the costs and production of the tree-tomato crop (Cyphomandra betacea) in the Buenos Aires Alto village, Pandi — Cundinamarca, Colombia.",
        "The platform digitizes the entire crop operation: farms, lots, partners and workers; per-day and contract agreements; purchases with partner contributions, input stock, labors, tasks and harvests — closing the loop with reports on contributions, collections and yield. All on a client-server architecture with PostgreSQL, deployed on web hosting.",
        "It was a collaborative four-member project built with the XP methodology. I led the project: I defined the stack, built the code base and the initial database schema (59 tables), and programmed 100% of the production and costs modules. On the phytosanitary component I built the base structure of its modules — views, scripts and CRUD endpoints — which the team then completed with the functional logic.",
      ],
    },
    stats: [
      { value: "19", label: { es: "Módulos en el sistema", en: "System modules" } },
      { value: "100%", label: { es: "Del módulo producción y costos", en: "Of the production & costs module" } },
      { value: "15", label: { es: "Historias de usuario XP", en: "XP user stories" } },
      { value: "3", label: { es: "Informes analíticos", en: "Analytical reports" } },
    ],
    contribution: {
      paragraphs: {
        es: [
          "Además de liderar el proyecto y definir el stack tecnológico, construí la base del código sobre la que trabajó todo el equipo: la arquitectura cliente-servidor con MVC, el esquema inicial de la base de datos en PostgreSQL y los estándares transversales de notificaciones, alertas y validaciones. Como administrador del repositorio gestioné el flujo de trabajo: 19 pull requests revisados y fusionados durante el desarrollo.",
          "Programé de principio a fin el módulo de producción y costos — 15 historias de usuario a lo largo de 4 iteraciones XP: desde terceros, fincas y lotes hasta convenios, compras, stock, tareas, producción e informes con mPDF. En el componente fitosanitario creé la estructura base de todos sus módulos (vistas PHP, JavaScript y endpoints CRUD de agroquímicos, plagas y enfermedades, ingredientes activos, etapas, planificación y procesos fitosanitarios), además del sistema de notificaciones por ataque de plagas en cada etapa del cultivo.",
        ],
        en: [
          "Beyond leading the project and defining the tech stack, I built the code base the whole team worked on: the client-server MVC architecture, the initial PostgreSQL database schema and the cross-cutting standards for notifications, alerts and validations. As repository administrator I managed the workflow: 19 pull requests reviewed and merged during development.",
          "I programmed the production and costs module from end to end — 15 user stories across 4 XP iterations: from third parties, farms and lots to agreements, purchases, stock, tasks, production and mPDF reports. On the phytosanitary component I created the base structure of all its modules (PHP views, JavaScript and CRUD endpoints for agrochemicals, pests and diseases, active ingredients, stages, planning and phytosanitary processes), plus the pest-attack notification system for each crop stage.",
        ],
      },
      highlights: {
        es: [
          "Liderazgo del proyecto y definición del stack",
          "Base del código y de la BD: MVC + 59 tablas en PostgreSQL",
          "100% del módulo producción y costos",
          "Estructura base del módulo fitosanitario + notificaciones de plagas",
          "19 pull requests revisados y fusionados",
        ],
        en: [
          "Project leadership and stack definition",
          "Code and DB base: MVC + 59 tables on PostgreSQL",
          "100% of the production & costs module",
          "Phytosanitary module base structure + pest notifications",
          "19 pull requests reviewed and merged",
        ],
      },
      video: {
        src: "/Demo Angorsyst.mp4",
        caption: {
          es: "Recorrido por el sistema en video",
          en: "Video walkthrough of the system",
        },
      },
    },
    stackGroups: [
      {
        label: { es: "Backend", en: "Backend" },
        items: ["PHP", "PostgreSQL 11", "Apache", "XAMPP"],
      },
      {
        label: { es: "Frontend", en: "Frontend" },
        items: ["JavaScript", "jQuery", "HTML", "CSS", "Bootstrap"],
      },
      {
        label: { es: "Datos y reportes", en: "Data & reports" },
        items: ["SQL", "pgAdmin 4", "Gráficas de barras", "Informes PDF"],
      },
      {
        label: { es: "Proceso", en: "Process" },
        items: ["Programación Extrema (XP)", "Cliente-Servidor", "MVC", "Hosting web"],
      },
    ],
    modulesHeading: {
      es: "El módulo que construí de punta a punta",
      en: "The module I built end to end",
    },
    modulesIntro: {
      es: "Producción y costos es el corazón de Agrosyst Co: el ciclo completo del cultivo, desde el registro de la finca y sus socios hasta la cosecha y el análisis de rendimiento. Todas las pantallas marcadas como “Desarrollo 100% propio” las programé íntegramente; en las de “Base propia” construí la vista, el script y los endpoints CRUD sobre los que el equipo completó la lógica.",
      en: "Production and costs is the heart of Agrosyst Co: the full crop cycle, from registering the farm and its partners to harvest and yield analysis. Every screen marked “100% my own work” I programmed entirely; on the “My base structure” ones I built the view, the script and the CRUD endpoints the team then completed with the logic.",
    },
    modules: [
      {
        id: "terceros",
        name: { es: "Terceros", en: "Third parties" },
        description: {
          es: "Directorio central de personas y empresas: dueños, socios, trabajadores, proveedores y clientes.",
          en: "Central directory of people and companies: owners, partners, workers, suppliers and clients.",
        },
        features: {
          es: ["CRUD completo", "Clasificación por cinco tipos de tercero", "Base para convenios, cultivos y compras"],
          en: ["Full CRUD", "Classification into five third-party types", "Foundation for agreements, crops and purchases"],
        },
        ownership: "full",
      },
      {
        id: "fincas",
        name: { es: "Fincas", en: "Farms" },
        description: {
          es: "Registro de las fincas donde operan los cultivos, con su dueño y vereda.",
          en: "Registration of the farms where crops operate, with their owner and village.",
        },
        features: {
          es: ["CRUD completo", "Vinculación con dueño (tercero)", "Punto de partida de lotes y cultivos"],
          en: ["Full CRUD", "Owner (third-party) linking", "Starting point for lots and crops"],
        },
        ownership: "full",
      },
      {
        id: "lotes",
        name: { es: "Lotes", en: "Lots" },
        description: {
          es: "División de cada finca en lotes de tierra donde se siembran los cultivos.",
          en: "Division of each farm into plots of land where crops are planted.",
        },
        features: {
          es: ["CRUD completo", "Relación finca ↔ lote", "Medida y ubicación por lote"],
          en: ["Full CRUD", "Farm ↔ lot relationship", "Size and location per lot"],
        },
        ownership: "full",
      },
      {
        id: "cultivos",
        name: { es: "Cultivos", en: "Crops" },
        description: {
          es: "El registro agrícola central: qué se siembra, en qué lote y con qué socios.",
          en: "The central agricultural record: what is planted, in which lot and with which partners.",
        },
        features: {
          es: ["CRUD completo", "Nombres y variedades de cultivo", "Socios vinculados por cultivo"],
          en: ["Full CRUD", "Crop names and varieties", "Partners linked per crop"],
        },
        ownership: "full",
      },
      {
        id: "convenios",
        name: { es: "Convenios", en: "Agreements" },
        description: {
          es: "Acuerdos de trabajo con cada persona: por jornal o por contrato.",
          en: "Working agreements with each person: per working day or by contract.",
        },
        features: {
          es: ["CRUD completo", "Dos tipos: jornal y contrato", "Valor y condiciones del acuerdo"],
          en: ["Full CRUD", "Two types: per-day and contract", "Agreement value and conditions"],
        },
        ownership: "full",
      },
      {
        id: "fertilizantes",
        name: { es: "Fertilizantes", en: "Fertilizers" },
        description: {
          es: "Catálogo de fertilizantes del sistema de insumos.",
          en: "Catalog of fertilizers in the input system.",
        },
        features: {
          es: ["CRUD completo", "Alimenta compras y stock"],
          en: ["Full CRUD", "Feeds purchases and stock"],
        },
        ownership: "full",
      },
      {
        id: "semilleros",
        name: { es: "Semilleros", en: "Seedbeds" },
        description: {
          es: "Registro de semillas y plántulas que luego se trasplantan a los lotes.",
          en: "Registration of seeds and seedlings later transplanted into the lots.",
        },
        features: {
          es: ["CRUD completo", "Origen y cantidad de semillas"],
          en: ["Full CRUD", "Seed origin and quantity"],
        },
        ownership: "full",
      },
      {
        id: "gastos",
        name: { es: "Gastos", en: "Expenses" },
        description: {
          es: "Egresos del cultivo que no son compras de insumos: transporte, arriendos, servicios.",
          en: "Crop expenses that are not input purchases: transport, rent, utilities.",
        },
        features: {
          es: ["CRUD completo", "Tipos de gasto por cultivo", "Suman al costo total de producción"],
          en: ["Full CRUD", "Expense types per crop", "Add up to the total production cost"],
        },
        ownership: "full",
      },
      {
        id: "compras",
        name: { es: "Compras", en: "Purchases" },
        description: {
          es: "Adquisición de insumos y herramientas con aportes de cada socio.",
          en: "Acquisition of inputs and tools with contributions from each partner.",
        },
        features: {
          es: [
            "CRUD completo",
            "Análisis de aportes por socio",
            "Semáforo de stock (rojo/verde)",
            "Consejos según el estado de los insumos",
          ],
          en: [
            "Full CRUD",
            "Partner contribution analysis",
            "Stock traffic light (red/green)",
            "Advice depending on input status",
          ],
        },
        ownership: "full",
      },
      {
        id: "stock",
        name: { es: "Stock", en: "Stock" },
        description: {
          es: "Inventario de insumos disponibles, alimentado por las compras.",
          en: "Inventory of available inputs, fed by purchases.",
        },
        features: {
          es: ["Consulta por insumo y cultivo", "Indicador rojo/verde de disponibilidad"],
          en: ["Query per input and crop", "Red/green availability indicator"],
        },
        ownership: "full",
      },
      {
        id: "labores",
        name: { es: "Labores", en: "Labors" },
        description: {
          es: "Catálogo de las labores agrícolas que se ejecutan en los cultivos.",
          en: "Catalog of the agricultural labors carried out on the crops.",
        },
        features: {
          es: ["CRUD completo", "Base para asignar tareas"],
          en: ["Full CRUD", "Basis for task assignment"],
        },
        ownership: "full",
      },
      {
        id: "tareas",
        name: { es: "Tareas", en: "Tasks" },
        description: {
          es: "La unidad operativa del cultivo: quién trabaja, bajo qué convenio y con qué insumos.",
          en: "The crop's operating unit: who works, under which agreement and with which inputs.",
        },
        features: {
          es: [
            "CRUD completo",
            "Convenios, insumos y gastos anidados por tarea",
            "Cierra el ciclo laboral del cultivo",
          ],
          en: [
            "Full CRUD",
            "Agreements, inputs and expenses nested per task",
            "Closes the crop's labor cycle",
          ],
        },
        ownership: "full",
      },
      {
        id: "tipos-produccion",
        name: { es: "Tipos de producción", en: "Production types" },
        description: {
          es: "Catálogo de las presentaciones de cosecha (canastillas, bultos) y sus unidades.",
          en: "Catalog of harvest presentations (baskets, sacks) and their units.",
        },
        features: {
          es: ["CRUD completo", "Unidades por tipo de producción"],
          en: ["Full CRUD", "Units per production type"],
        },
        ownership: "full",
      },
      {
        id: "produccion",
        name: { es: "Producción", en: "Production" },
        description: {
          es: "Registro de cosechas: cuánto se recolectó, en qué presentación y a qué precio.",
          en: "Harvest records: how much was collected, in which presentation and at what price.",
        },
        features: {
          es: ["CRUD completo", "Canastillas y bultos con unidades y precio", "Alimenta los informes de rendimiento"],
          en: ["Full CRUD", "Baskets and sacks with units and price", "Feeds the yield reports"],
        },
        ownership: "full",
      },
      {
        id: "informes",
        name: { es: "Informes", en: "Reports" },
        description: {
          es: "Cierre analítico del ciclo: 6 informes PDF y 2 vistas de gráficas generados con mPDF.",
          en: "The cycle's analytical closing: 6 PDF reports and 2 chart views generated with mPDF.",
        },
        features: {
          es: [
            "Aportes por socio con gráfica e informe",
            "Recaudos en el cultivo con gráfica de barras",
            "Rendimiento: recaudo, inversión y ganancia/pérdida",
            "Informes general, de producción y de tareas por cultivo",
          ],
          en: [
            "Partner contributions with chart and report",
            "Crop collections with bar chart",
            "Yield: income, investment and profit/loss",
            "General, production and tasks reports per crop",
          ],
        },
        ownership: "full",
      },
      {
        id: "agroquimicos",
        name: { es: "Agroquímicos", en: "Agrochemicals" },
        description: {
          es: "Catálogo de productos de control fitosanitario con sus 16 campos de ficha técnica.",
          en: "Catalog of phytosanitary control products with their 16 technical-sheet fields.",
        },
        features: {
          es: ["Base: vista + JS + CRUD", "Ficha técnica completa del producto"],
          en: ["Base: view + JS + CRUD", "Complete product data sheet"],
        },
        ownership: "base",
      },
      {
        id: "ingredientes-activos",
        name: { es: "Ingredientes activos", en: "Active ingredients" },
        description: {
          es: "Composición química de cada agroquímico del catálogo.",
          en: "Chemical composition of each agrochemical in the catalog.",
        },
        features: {
          es: ["Base: vista + JS + CRUD", "Relación agroquímico ↔ ingrediente"],
          en: ["Base: view + JS + CRUD", "Agrochemical ↔ ingredient relationship"],
        },
        ownership: "base",
      },
      {
        id: "plagas",
        name: { es: "Enfermedades y plagas", en: "Diseases & pests" },
        description: {
          es: "Fichas de plagas y enfermedades con síntomas, prevención, etapas del patógeno e imágenes de referencia.",
          en: "Pest and disease sheets with symptoms, prevention, pathogen stages and reference images.",
        },
        features: {
          es: ["Base: vista + JS + CRUD", "Etapas del patógeno con imagen", "Síntomas y medidas de prevención"],
          en: ["Base: view + JS + CRUD", "Pathogen stages with image", "Symptoms and prevention measures"],
        },
        ownership: "base",
      },
      {
        id: "proceso-fitosanitario",
        name: { es: "Proceso fitosanitario", en: "Phytosanitary process" },
        description: {
          es: "Aplicaciones y seguimiento del control de plagas sobre los cultivos, con calificación y comentarios.",
          en: "Applications and tracking of pest control on the crops, with rating and comments.",
        },
        features: {
          es: ["Base: vista + JS + CRUD", "Calificación del proceso", "Comentarios de seguimiento"],
          en: ["Base: view + JS + CRUD", "Process rating", "Follow-up comments"],
        },
        ownership: "base",
      },
      {
        id: "planificacion",
        name: { es: "Planificación fitosanitaria", en: "Phytosanitary planning" },
        description: {
          es: "Planificación de las aplicaciones y etapas de control del cultivo.",
          en: "Planning of the crop's control applications and stages.",
        },
        features: {
          es: ["Base: vista + JS + CRUD", "Relación etapas ↔ agroquímicos", "Calendario de aplicaciones"],
          en: ["Base: view + JS + CRUD", "Stages ↔ agrochemicals relationship", "Application calendar"],
        },
        ownership: "base",
      },
    ],
    generalFeatures: {
      es: [
        "Sistema de notificaciones para toda acción completada, con error o informativa.",
        "Cuatro tipos de alertas para advertencias de datos y validaciones.",
        "Herramienta de información integrada: documentación contextual en cada módulo.",
        "Calculadora integrada para operaciones rápidas de costos.",
        "Menú flotante de navegación siempre disponible.",
        "Semáforo de stock con colores rojo/verde según disponibilidad de insumos.",
        "Colores semánticos de botones: crear, editar, ver y eliminar siempre diferenciados.",
        "Despliegue web en hosting público con PostgreSQL 11 y XAMPP.",
      ],
      en: [
        "Notification system for every completed action, with errors and informative ones.",
        "Four alert types for data warnings and validations.",
        "Built-in information tool: contextual documentation in every module.",
        "Integrated calculator for quick cost operations.",
        "Always-available floating navigation menu.",
        "Stock traffic light with red/green colors based on input availability.",
        "Semantic button colors: create, edit, view and delete always differentiated.",
        "Web deployment on public hosting with PostgreSQL 11 and XAMPP.",
      ],
    },
    reports: {
      es: [
        "Aportes por socio — gráfica e informe",
        "Recaudos en el cultivo — gráfica de barras",
        "Rendimiento del cultivo — recaudo, inversión y ganancia/pérdida",
      ],
      en: [
        "Partner contributions — chart and report",
        "Crop collections — bar chart",
        "Crop yield — income, investment and profit/loss",
      ],
    },
    install: {
      es: [
        "Servidor Apache con PHP (instalado vía XAMPP) y PostgreSQL 11.8 (puerto 5432).",
        "Código desplegado en la carpeta htdocs del servidor.",
        "Base de datos restaurada desde el backup con Restore en pgAdmin 4.",
        "Acceso web público en agrosystco.a2hosted.com o local vía localhost.",
      ],
      en: [
        "Apache server with PHP (installed via XAMPP) and PostgreSQL 11.8 (port 5432).",
        "Code deployed to the server's htdocs folder.",
        "Database restored from the backup using pgAdmin 4's Restore.",
        "Public web access at agrosystco.a2hosted.com or locally via localhost.",
      ],
    },
    documents: [
      {
        id: "usuario",
        label: { es: "Manual de usuario", en: "User manual" },
        path: "/Manual de Usuario Agrosyst Co.pdf",
        pages: 45,
      },
      {
        id: "tecnico",
        label: { es: "Manual técnico", en: "Technical manual" },
        path: "/Manual Técnico Agrosyst Co.pdf",
        pages: 24,
      },
      {
        id: "documentacion",
        label: { es: "Documentación del proyecto", en: "Project documentation" },
        path: "/Documentación Agrosyst Co Modulo Producción-Costos.pdf",
        pages: 126,
      },
    ],
    team: [
      "Kelly Yuliana González González",
      "Juan Camilo Hernández Ortiz",
      "Angely Natalia Reyes Roldán",
      "Daniel Camilo Rojas Arias",
    ],
  },
  transmilenio: {
    slug: "transmilenio",
    version: "V1.0",
    year: "2025 — 2026",
    client: "Universidad Nacional de Colombia — Maestría en Ingeniería de Sistemas y Computación",
    subtitle: {
      es: "Tesis de maestría · Machine Learning / Data Science",
      en: "Master's thesis · Machine Learning / Data Science",
    },
    repository: "https://github.com/FtxDJuan1214/deteccion-de-evasion-en-sistemas-BRT",
    context: {
      es: [
        "La evasión del pasaje es un problema crítico en TransMilenio: las tasas llegan al 15% y no existía un mecanismo automatizado y estandarizado para medirla. Las metodologías tradicionales dependen de conteos manuales — la Universidad Nacional llegó a analizar 13.800 horas de video grabado en estaciones — o de sistemas propietarios cerrados.",
        "Esta tesis desarrolla un método computacional basado en Inteligencia Artificial y Visión por Computador para detectar automáticamente los ingresos ilegales por las puertas laterales de los vagones, usando videos reales de vigilancia de las estaciones del sistema.",
        "Fui el autor del 100% del proyecto: definí el problema, construí el dataset propio, diseñé la metodología, implementé el método, ejecuté la exploración experimental de 40 configuraciones y validé los resultados sobre 1.500 videos.",
      ],
      en: [
        "Fare evasion is a critical problem in TransMilenio: rates reach 15% and there was no automated, standardized mechanism to measure it. Traditional methodologies rely on manual counts — Universidad Nacional once analyzed 13,800 hours of station video — or on closed proprietary systems.",
        "This thesis develops a computational method based on Artificial Intelligence and Computer Vision to automatically detect illegal entries through the side doors of the vehicles, using real surveillance videos from the system's stations.",
        "I was the sole author of 100% of the project: I defined the problem, built the proprietary dataset, designed the methodology, implemented the method, ran the experimental exploration of 40 configurations and validated the results on 1,500 videos.",
      ],
    },
    stats: [
      { value: "84.88%", label: { es: "F1-Score en validación final", en: "F1-Score on final validation" } },
      { value: "1800", label: { es: "Construcción de dataset con metadatos representativos", en: "Dataset built with representative metadata" } },
      { value: "40", label: { es: "Configuraciones exploradas (grid search)", en: "Configurations explored (grid search)" } },
      { value: "92.7%", label: { es: "Precisión · baja tasa de falsas alarmas", en: "Precision · low false-alarm rate" } },
    ],
    contribution: {
      paragraphs: {
        es: [
          "Diseñé un enfoque híbrido e interpretable: en lugar de depender exclusivamente de reconocimiento de acciones o poses — inviable por la baja resolución de las escenas —, el método analiza las trayectorias de las personas en relación con la geometría de la estación, combinando la robustez del deep learning con reglas explícitas del dominio.",
          "Todo el pipeline es de mi autoría: segmentación de la estación con YOLO entrenado a la medida, detección de personas cuadro a cuadro, seguimiento multi-objeto con ByteTrack y BoT-SORT, reglas espaciales y temporales para clasificar evasiones, y conteo de eventos con mecanismos anti dobles conteo. La validación final sobre 1.500 videos arrojó F1-Score de 84.88%, precisión de 92.7% y un MAE de 0.34 evasiones por video, funcionando de forma estable tanto en clips cortos como en videos continuos de hasta 20 minutos.",
        ],
        en: [
          "I designed a hybrid, interpretable approach: instead of relying exclusively on action or pose recognition — unfeasible given the scenes' low resolution — the method analyzes people's trajectories in relation to the station's geometry, combining deep learning robustness with explicit domain rules.",
          "The whole pipeline is my own work: station segmentation with a custom-trained YOLO, frame-by-frame person detection, multi-object tracking with ByteTrack and BoT-SORT, spatial and temporal rules to classify evasions, and event counting with double-count prevention. The final validation on 1,500 videos yielded an F1-Score of 84.88%, precision of 92.7% and an MAE of 0.34 evasions per video, performing stably on both short clips and continuous videos of up to 20 minutes.",
        ],
      },
      highlights: {
        es: [
          "100% del proyecto: problema, dataset, método y validación",
          "Método automático y explicable, validado con datos reales",
          "F1-Score 84.88% · Precisión 92.7% · MAE 0.34",
          "Pipeline reproducible y adaptable a otros sistemas BRT",
        ],
        en: [
          "100% of the project: problem, dataset, method and validation",
          "Automatic and explainable method, validated on real data",
          "F1-Score 84.88% · Precision 92.7% · MAE 0.34",
          "Reproducible pipeline, adaptable to other BRT systems",
        ],
      },
    },
    stackGroups: [
      {
        label: { es: "Lenguaje y visión", en: "Language & vision" },
        items: ["Python", "Ultralytics YOLO (YOLO11m)", "OpenCV", "PyAV"],
      },
      {
        label: { es: "Seguimiento multi-objeto", en: "Multi-object tracking" },
        items: ["BoT-SORT", "ByteTrack", "OSNet ReID"],
      },
      {
        label: { es: "Datos y experimentación", en: "Data & experimentation" },
        items: ["NumPy", "Pandas", "Roboflow", "FFmpeg", "tkinter", "Grid search"],
      },
    ],
    modulesHeading: {
      es: "Metodología del método",
      en: "Methodology of the method",
    },
    modulesIntro: {
      es: "Seis etapas encadenadas, de la construcción del dataset al conteo de eventos. Cada trayectoria puede generar como máximo un evento de evasión, lo que permite estimar de forma confiable los ingresos ilegales por clip.",
      en: "Six chained stages, from dataset construction to event counting. Each trajectory can generate at most one evasion event, which allows reliably estimating illegal entries per clip.",
    },
    modules: [
      {
        id: "construccion-dataset",
        name: { es: "Construcción del dataset", en: "Dataset construction" },
        description: {
          es: "Dos aplicaciones de escritorio en Python con interfaz tkinter soportaron la construcción del dataset: una para fragmentar los videos fuente con sus metadatos y otra para verificarlos rápidamente.",
          en: "Two Python desktop applications with tkinter interfaces supported the dataset construction: one to fragment the source videos with their metadata and another to verify them quickly.",
        },
        features: {
          es: [
            "App de corte: fragmenta los videos en clips de 10 a 20 segundos usando FFmpeg",
            "Define el formato MKV y asigna a cada clip 9 metadatos configurables desde la interfaz: nombre, evasión, categoría, cantidad, complejo, duración, orientación, estación y fecha",
            "App de inspección: revisión rápida de los metadatos de cualquier clip salido de la app de corte",
          ],
          en: [
            "Cutting app: fragments the videos into 10 to 20 second clips using FFmpeg",
            "Sets the MKV format and assigns each clip 9 metadata fields configurable from the interface: name, evasion, category, count, complex, duration, orientation, station and date",
            "Inspection app: quick review of the metadata of any clip coming out of the cutting app",
          ],
        },
        ownership: "full",
      },
      {
        id: "segmentacion-estacion",
        name: { es: "Segmentación de la estación", en: "Station segmentation" },
        description: {
          es: "Un YOLO entrenado para segmentación de instancias detecta el polígono de la estación en cada escena.",
          en: "A YOLO trained for instance segmentation detects the station polygon in each scene.",
        },
        features: {
          es: [
            "Modelo propio con dos variantes del polígono: estación completa y sin plataforma",
            "La variante completa reduce falsos positivos de personas que se asoman y regresan",
          ],
          en: [
            "Custom model with two polygon variants: full station and platform-only",
            "The full variant reduces false positives from people who lean out and return",
          ],
        },
        ownership: "full",
      },
      {
        id: "deteccion-personas",
        name: { es: "Detección de personas", en: "Person detection" },
        description: {
          es: "Detección cuadro a cuadro con modelos YOLO preentrenados, ajustada al contexto del problema.",
          en: "Frame-by-frame detection with pretrained YOLO models, tuned to the problem's context.",
        },
        features: {
          es: [
            "Confianza baja (0.35) para conservar detecciones en poses inusuales o cuerpos cubiertos",
            "IoU 0.4 y resolución 1280 para manejar personas solapadas sin captar zonas irrelevantes",
          ],
          en: [
            "Low confidence (0.35) to keep detections on unusual poses or partially covered bodies",
            "IoU 0.4 and 1280 resolution to handle overlapping people without picking up irrelevant areas",
          ],
        },
        ownership: "full",
      },
      {
        id: "tracking",
        name: { es: "Seguimiento de personas", en: "Person tracking" },
        description: {
          es: "Tracking-by-detection con asignación de IDs únicos para reconstruir trayectorias completas.",
          en: "Tracking-by-detection with unique ID assignment to rebuild full trajectories.",
        },
        features: {
          es: [
            "ByteTrack y BoT-SORT con re-identificación OSNet",
            "BoT-SORT resultó ganador: más robusto en escenas densas y horas pico",
          ],
          en: [
            "ByteTrack and BoT-SORT with OSNet re-identification",
            "BoT-SORT came out on top: more robust in dense, rush-hour scenes",
          ],
        },
        ownership: "full",
      },
      {
        id: "analisis-trayectorias",
        name: { es: "Análisis de trayectorias", en: "Trajectory analysis" },
        description: {
          es: "Reglas espaciales y temporales del dominio aplicadas sobre las trayectorias, en lugar de poses.",
          en: "Spatial and temporal domain rules applied over trajectories, instead of poses.",
        },
        features: {
          es: [
            "Trayectoria que inicia fuera e ingresa al polígono, con tiempo mínimo fuera → evasión",
            "Trayectoria que desaparece yendo hacia la estación → evasión (oclusiones y saltos)",
            "Umbral de proximidad de 50 px y 1 segundo mínimo fuera de la estación",
          ],
          en: [
            "Trajectory starting outside and entering the polygon, with minimum time outside → evasion",
            "Trajectory vanishing while heading to the station → evasion (occlusions and jumps)",
            "50 px proximity threshold and 1 second minimum outside the station",
          ],
        },
        ownership: "full",
      },
      {
        id: "conteo-eventos",
        name: { es: "Conteo de eventos", en: "Event counting" },
        description: {
          es: "Cuantificación confiable de los ingresos ilegales por clip con control de dobles conteos.",
          en: "Reliable quantification of illegal entries per clip with double-count control.",
        },
        features: {
          es: [
            "Máximo un evento por trayectoria",
            "Mecanismos para evitar dobles conteos y reducir falsos positivos/negativos",
          ],
          en: [
            "At most one event per trajectory",
            "Mechanisms to prevent double counts and reduce false positives/negatives",
          ],
        },
        ownership: "full",
      },
    ],
    videoGroups: [
      {
        id: "complejos",
        title: { es: "Evasión en escenarios complejos", en: "Evasion in complex scenarios" },
        description: {
          es: "Casos difíciles: alta densidad, oclusiones y entradas simultáneas en horas pico.",
          en: "Hard cases: high density, occlusions and simultaneous entries at rush hour.",
        },
        videos: [
          {
            url: "https://github.com/user-attachments/assets/235bc1b1-b455-47f2-ad22-f318bc1217b2",
            label: { es: "Ejemplo complejo 1", en: "Complex example 1" },
          },
          {
            url: "https://github.com/user-attachments/assets/55f725c8-4d94-4826-83ef-925a5a80ec28",
            label: { es: "Ejemplo complejo 2", en: "Complex example 2" },
          },
        ],
      },
      {
        id: "regulares",
        title: { es: "Evasión en escenarios regulares", en: "Evasion in regular scenarios" },
        description: {
          es: "Casos típicos de ingreso ilegal por la puerta del vagón.",
          en: "Typical cases of illegal entry through the vehicle door.",
        },
        videos: [
          {
            url: "https://github.com/user-attachments/assets/7c1b3d60-0d6b-4e25-a0e5-2dd6ddb5bdca",
            label: { es: "Ejemplo regular 1", en: "Regular example 1" },
          },
          {
            url: "https://github.com/user-attachments/assets/64bcc0de-08ca-4937-a94d-634037ca623d",
            label: { es: "Ejemplo regular 2", en: "Regular example 2" },
          },
        ],
      },
      {
        id: "no-evasion",
        title: { es: "Casos sin evasión", en: "Non-evasion cases" },
        description: {
          es: "El método se mantiene robusto ante personas que parecen entrar ilegalmente pero no lo hacen.",
          en: "The method stays robust against people who appear to enter illegally but don't.",
        },
        videos: [
          {
            url: "https://github.com/user-attachments/assets/e008d617-310e-4815-bdd4-283896ace219",
            label: { es: "Sin evasión 1", en: "No evasion 1" },
          },
          {
            url: "https://github.com/user-attachments/assets/2b147f02-0e1c-4a0f-95d1-1536de8562bc",
            label: { es: "Sin evasión 2", en: "No evasion 2" },
          },
          {
            url: "https://github.com/user-attachments/assets/3b1104c4-5b56-4077-9309-c3bc351333cd",
            label: { es: "Sin evasión 3", en: "No evasion 3" },
          },
        ],
      },
      {
        id: "mixtos",
        title: { es: "Casos mixtos", en: "Mixed cases" },
        description: {
          es: "Escenas con personas saliendo y entrando a la vez: el método discrimina a los evasores.",
          en: "Scenes with people exiting and entering at once: the method tells evaders apart.",
        },
        videos: [
          {
            url: "https://github.com/user-attachments/assets/1afe256b-a6d7-4dc2-8a1e-3a656b08fba7",
            label: { es: "Caso mixto", en: "Mixed case" },
          },
        ],
      },
    ],
    imageGroups: [
      {
        id: "grid-search",
        title: { es: "Exploración de parámetros (grid search)", en: "Parameter exploration (grid search)" },
        description: {
          es: "Muestreo de 300 videos (200 con evasión, 100 sin evasión) y exploración sistemática de 40 configuraciones sobre 8 parámetros del método. El F1-Score fue la métrica de selección por el desbalance de clases; la configuración 30 resultó ganadora.",
          en: "Sample of 300 videos (200 with evasion, 100 without) and systematic exploration of 40 configurations over 8 method parameters. F1-Score was the selection metric due to class imbalance; configuration 30 came out on top.",
        },
        images: [
          {
            src: "/proyectos/transmilenio/grid-search-f1-score.png",
            alt: {
              es: "Gráfica del F1-Score para las 40 configuraciones exploradas en el grid search",
              en: "F1-Score chart for the 40 configurations explored in the grid search",
            },
            width: 4695,
            height: 2217,
            caption: {
              es: "F1-Score de cada una de las 40 configuraciones exploradas (Figura 4-14 del documento)",
              en: "F1-Score of each of the 40 explored configurations (Figure 4-14 of the document)",
            },
          },
          {
            src: "/proyectos/transmilenio/grid-search-ranking.png",
            alt: {
              es: "Ranking de las 20 mejores configuraciones del grid search con F1-Score, recall y MAE",
              en: "Ranking of the top 20 grid search configurations with F1-Score, recall and MAE",
            },
            width: 4727,
            height: 2392,
            caption: {
              es: "Ranking de las 20 mejores configuraciones: F1-Score, recall y MAE (Figura 4-15 del documento)",
              en: "Top 20 configuration ranking: F1-Score, recall and MAE (Figure 4-15 of the document)",
            },
          },
        ],
      },
      {
        id: "mejor-configuracion",
        title: { es: "Mejor configuración (#30)", en: "Best configuration (#30)" },
        description: {
          es: "Configuración ganadora: YOLO11m + BoT-SORT sobre la estación completa, con confianza 0.35, IoU 0.4, imgsz 1280, umbral de proximidad de 50 px y 1 s mínimo fuera de la zona.",
          en: "Winning configuration: YOLO11m + BoT-SORT over the full station, with confidence 0.35, IoU 0.4, imgsz 1280, a 50 px proximity threshold and 1 s minimum outside the zone.",
        },
        metrics: [
          { label: { es: "F1-Score", en: "F1-Score" }, value: "85.05%" },
          { label: { es: "Precisión", en: "Precision" }, value: "93.81%" },
          { label: { es: "Recall", en: "Recall" }, value: "77.78%" },
          { label: { es: "Accuracy", en: "Accuracy" }, value: "79.08%" },
          { label: { es: "MAE", en: "MAE" }, value: "0.32" },
        ],
        images: [
          {
            src: "/proyectos/transmilenio/grid-search-config30-conteos.png",
            alt: {
              es: "Matriz de confusión de conteos exactos de la mejor configuración del grid search",
              en: "Exact counts confusion matrix of the best grid search configuration",
            },
            width: 507,
            height: 455,
            caption: {
              es: "Matriz de confusión de conteos exactos (Figura 4-16 del documento)",
              en: "Exact counts confusion matrix (Figure 4-16 of the document)",
            },
          },
          {
            src: "/proyectos/transmilenio/grid-search-config30-evasion.png",
            alt: {
              es: "Matriz de confusión por eventos de evasión de la mejor configuración del grid search",
              en: "Evasion events confusion matrix of the best grid search configuration",
            },
            width: 519,
            height: 455,
            caption: {
              es: "Matriz de confusión por eventos de evasión (Figura 4-17 del documento)",
              en: "Evasion events confusion matrix (Figure 4-17 of the document)",
            },
          },
        ],
      },
      {
        id: "validacion-final",
        title: { es: "Validación final", en: "Final validation" },
        description: {
          es: "Ejecutada sobre 1.500 videos nunca vistos (1.000 con evasión, 500 sin evasión) con la configuración óptima. El método detectó 1.434 de los 1.832 eventos de evasión, con 450 de 500 videos de control reportados sin evasión.",
          en: "Run on 1,500 unseen videos (1,000 with evasion, 500 without) with the optimal configuration. The method detected 1,434 of the 1,832 evasion events, with 450 of the 500 control videos reported as evasion-free.",
        },
        metrics: [
          { label: { es: "F1-Score", en: "F1-Score" }, value: "84.88%" },
          { label: { es: "Precisión", en: "Precision" }, value: "92.7%" },
          { label: { es: "Recall", en: "Recall" }, value: "78.3%" },
          { label: { es: "Accuracy", en: "Accuracy" }, value: "78.7%" },
          { label: { es: "MAE", en: "MAE" }, value: "0.34" },
        ],
        images: [
          {
            src: "/proyectos/transmilenio/validacion-matriz-conteos.png",
            alt: {
              es: "Matriz de confusión de conteos exactos en la validación final",
              en: "Exact counts confusion matrix on the final validation",
            },
            width: 516,
            height: 455,
            caption: {
              es: "Matriz de confusión de conteos exactos en la validación final (Figura 5-1 del documento)",
              en: "Exact counts confusion matrix on the final validation (Figure 5-1 of the document)",
            },
          },
          {
            src: "/proyectos/transmilenio/validacion-matriz-evasion.png",
            alt: {
              es: "Matriz de confusión por eventos de evasión en la validación final",
              en: "Evasion events confusion matrix on the final validation",
            },
            width: 519,
            height: 455,
            caption: {
              es: "Matriz de confusión por eventos de evasión en la validación final (Figura 5-2 del documento)",
              en: "Evasion events confusion matrix on the final validation (Figure 5-2 of the document)",
            },
          },
        ],
      },
    ],
    generalFeatures: {
      es: [
        "Dataset propio de 1.800 clips reales (1.200 con evasión, 600 sin evasión) de 20–24 segundos",
        "Grid search sobre 300 videos representativos explorando 40 configuraciones de 8 parámetros del método",
        "Mejor configuración (#30): YOLO11m + BoT-SORT + estación completa — F1 85.05%, precisión 93.81%, MAE 0.32",
        "Validación final sobre 1.500 videos: F1 84.88%, precisión 92.7%, recall 78.3%, accuracy 78.7%, MAE 0.34",
        "Detección de 1.434 de 1.832 eventos de evasión: 1.434 TP · 113 FP · 398 FN · 450 TN",
        "Estable tanto en clips cortos como en videos continuos de hasta 20 minutos",
        "Filtra ruido operativo reduciendo falsos positivos (personas que se asoman y regresan)",
        "Transferible a otros sistemas BRT con vagones, si el ángulo de cámara es similar",
        "Repositorio con implementación, modelos, trackers, notebooks y resultados reproducibles",
        "Trabajo futuro identificado: fine-tuning con datos del dominio, clasificador de trayectorias aprendido y detección de buses",
      ],
      en: [
        "Proprietary dataset of 1,800 real clips (1,200 with evasion, 600 without) of 20–24 seconds",
        "Grid search over 300 representative videos exploring 40 configurations of 8 method parameters",
        "Best configuration (#30): YOLO11m + BoT-SORT + full station — F1 85.05%, precision 93.81%, MAE 0.32",
        "Final validation on 1,500 videos: F1 84.88%, precision 92.7%, recall 78.3%, accuracy 78.7%, MAE 0.34",
        "Detection of 1,434 of 1,832 evasion events: 1,434 TP · 113 FP · 398 FN · 450 TN",
        "Stable on both short clips and continuous videos of up to 20 minutes",
        "Filters operational noise reducing false positives (people who lean out and return)",
        "Transferable to other wagon-based BRT systems with a similar camera angle",
        "Repository with implementation, models, trackers, notebooks and reproducible results",
        "Identified future work: fine-tuning on domain data, a learned trajectory classifier and bus detection",
      ],
    },
    reports: {
      es: [
        "F1-Score por configuración y ranking de las 20 mejores del grid search",
        "Matrices de confusión de conteos exactos y de eventos de evasión",
        "Comparativa de desempeño de trackers ByteTrack vs BoT-SORT",
        "Métricas globales y análisis exploratorio del dataset en notebooks",
      ],
      en: [
        "F1-Score per configuration and top-20 grid search ranking",
        "Confusion matrices for exact counts and for evasion events",
        "ByteTrack vs BoT-SORT tracker performance comparison",
        "Global metrics and dataset exploratory analysis in notebooks",
      ],
    },
    install: {
      es: [
        "Clona el repositorio con el método, los modelos entrenados y los trackers.",
        "Instala las dependencias: ultralytics, opencv, av, numpy entre otras.",
        "Usa implementation.py con los videos de la carpeta de ejemplos para correr el método localmente.",
        "La configuración 30 (yolo11m + BoT-SORT + stationv1) es la tomada por defecto.",
      ],
      en: [
        "Clone the repository with the method, the trained models and the trackers.",
        "Install the dependencies: ultralytics, opencv, av, numpy among others.",
        "Use implementation.py with the videos in the examples folder to run the method locally.",
        "Configuration 30 (yolo11m + BoT-SORT + stationv1) is taken as the default.",
      ],
    },
    documents: [
      {
        id: "tesis",
        label: { es: "Documento final de la tesis", en: "Final thesis document" },
        path: "/TrabajoFinal1069765825.pdf",
        pages: 80,
      },
    ],
    team: ["Juan Camilo Hernández Ortiz"],
  },

  fortexdesign: {
    slug: "fortexdesign",
    version: "V1.0",
    year: "2020 — 2022",
    client: "Proyecto empresarial privado",
    context: {
      es: [
        "FortexDesign App es una plataforma web empresarial privada orientada a la gestión de proyectos de ingeniería de redes. Por acuerdos de confidencialidad no puedo compartir el código, capturas ni detalles del negocio: esta página describe únicamente el lado técnico del sistema.",
        "La aplicación fue construida sobre Laravel 6 con PostgreSQL, siguiendo una arquitectura monolítica clásica: Blade en el frontend, controladores por módulo y una capa de eventos en tiempo real con Pusher para mantener la interfaz sincronizada sin recargas.",
        "El sistema cubre todo el ciclo de los proyectos: gestión documental en la nube, control de calidad, reportes PDF automáticos, un visor GIS interactivo sobre Leaflet y un módulo de control de acceso por roles y permisos.",
      ],
      en: [
        "FortexDesign App is a private enterprise web platform for network engineering project management. Due to confidentiality agreements I cannot share code, screenshots or business details: this page describes only the technical side of the system.",
        "The application was built on Laravel 6 with PostgreSQL, following a classic monolithic architecture: Blade on the frontend, per-module controllers and a real-time event layer with Pusher to keep the interface synchronized without reloads.",
        "The system covers the full project cycle: cloud document management, quality control, automatic PDF reports, an interactive GIS viewer built on Leaflet and a role-and-permission based access control module.",
      ],
    },
    stats: [
      { value: "451", label: { es: "Endpoints HTTP", en: "HTTP endpoints" } },
      { value: "21", label: { es: "Eventos en tiempo real", en: "Real-time events" } },
      { value: "9", label: { es: "Capas del visor GIS", en: "GIS viewer layers" } },
      { value: "18", label: { es: "Controladores", en: "Controllers" } },
    ],
    stackGroups: [
      {
        label: { es: "Backend", en: "Backend" },
        items: ["PHP", "Laravel 6", "PostgreSQL", "Blade"],
      },
      {
        label: { es: "Frontend", en: "Frontend" },
        items: ["JavaScript", "jQuery", "Bootstrap 4", "SCSS", "Vue 2"],
      },
      {
        label: { es: "Tiempo real", en: "Real time" },
        items: ["Pusher", "WebSockets"],
      },
      {
        label: { es: "Integraciones", en: "Integrations" },
        items: ["Google Drive API", "Gmail API", "DOMPDF", "Socialite"],
      },
      {
        label: { es: "GIS", en: "GIS" },
        items: ["Leaflet", "GeoJSON", "Turf", "Leaflet.draw", "MarkerCluster"],
      },
    ],
    modules: [
      {
        id: "gestion-proyectos",
        name: { es: "Gestión de proyectos y versiones", en: "Project and version management" },
        description: {
          es: "Núcleo del sistema: proyectos con versionado, carpetas organizadas en la nube por proyecto, versión y contrato, y ciclo de aprobación de cada versión.",
          en: "System core: projects with versioning, cloud folders organized by project, version and contract, and an approval cycle for each version.",
        },
        features: {
          es: [
            "Versionado de proyectos con carpetas asociadas en Google Drive",
            "Ciclo de aprobación de versiones con estados y validaciones",
            "Asignación de equipos de trabajo por proyecto",
          ],
          en: [
            "Project versioning with associated Google Drive folders",
            "Version approval cycle with states and validations",
            "Team assignment per project",
          ],
        },
        ownership: "full",
      },
      {
        id: "visor-gis",
        name: { es: "Visor GIS de red", en: "Network GIS viewer" },
        description: {
          es: "Visor cartográfico interactivo sobre Leaflet con nueve capas de red consultables de forma individual, dibujo y medición sobre el mapa y carga de geometrías GeoJSON.",
          en: "Interactive cartographic viewer on Leaflet with nine network layers that can be toggled individually, drawing and measuring on the map and GeoJSON geometry loading.",
        },
        features: {
          es: [
            "Nueve capas de red independientes (postes, cámaras, empalmes, terminales, fibras, ductos, etc.)",
            "Edición gráfica sobre el mapa con Leaflet.draw y mediciones de trazados",
            "Agrupamiento de marcadores y geobúsqueda integrada",
          ],
          en: [
            "Nine independent network layers (poles, handholes, splices, terminals, fibers, conduit, etc.)",
            "On-map graphical editing with Leaflet.draw and route measuring",
            "Marker clustering and integrated geosearch",
          ],
        },
        ownership: "full",
      },
      {
        id: "gestion-documental",
        name: { es: "Gestión documental en la nube", en: "Cloud document management" },
        description: {
          es: "Integración con Google Drive API para centralizar los documentos de cada proyecto: creación de carpetas, subida de archivos y acceso directo desde la plataforma.",
          en: "Google Drive API integration to centralize each project's documents: folder creation, file uploads and direct access from the platform.",
        },
        features: {
          es: [
            "Carpetas en Drive organizadas por proyecto, versión y contrato",
            "Subida de archivos desde la plataforma hacia la nube",
            "Compartición y accesos directos a documentos",
          ],
          en: [
            "Drive folders organized by project, version and contract",
            "File uploads from the platform to the cloud",
            "Document sharing and shortcuts",
          ],
        },
        ownership: "full",
      },
      {
        id: "integracion-gmail",
        name: { es: "Integración con Gmail", en: "Gmail integration" },
        description: {
          es: "Integración con Gmail API para consultar correos y adjuntos desde la propia plataforma, junto con procesamiento de correo entrante.",
          en: "Gmail API integration to consult emails and attachments from within the platform, plus incoming mail processing.",
        },
        features: {
          es: [
            "Lectura de bandeja de entrada y adjuntos desde la plataforma",
            "Procesamiento de correo entrante con laravel-mailbox",
            "Login con Google mediante Socialite",
          ],
          en: [
            "Inbox and attachment reading from the platform",
            "Incoming mail processing with laravel-mailbox",
            "Google login via Socialite",
          ],
        },
        ownership: "full",
      },
      {
        id: "tiempo-real",
        name: { es: "Capa en tiempo real", en: "Real-time layer" },
        description: {
          es: "Sistema reactivo construido sobre Pusher: eventos broadcast que sincronizan la interfaz de todos los usuarios conectados sin recargar la página.",
          en: "Reactive system built on Pusher: broadcast events that synchronize the interface of every connected user without page reloads.",
        },
        features: {
          es: [
            "21 eventos broadcast sobre un canal compartido",
            "Actualización de usuarios en línea y notificaciones en vivo",
            "Recarga coordinada de vistas cuando otro usuario modifica datos",
          ],
          en: [
            "21 broadcast events over a shared channel",
            "Online user updates and live notifications",
            "Coordinated view reloads when another user modifies data",
          ],
        },
        ownership: "full",
      },
      {
        id: "rbac",
        name: { es: "Roles y permisos", en: "Roles and permissions" },
        description: {
          es: "Control de acceso basado en roles con el paquete Shinobi: permisos granulares por módulo aplicados en rutas y vistas.",
          en: "Role-based access control with the Shinobi package: granular per-module permissions enforced on routes and views.",
        },
        features: {
          es: [
            "Roles y permisos administrables desde la plataforma",
            "Middleware de permisos en las rutas (can:xxx)",
            "Interfaces que se adaptan según los permisos del usuario",
          ],
          en: [
            "Roles and permissions manageable from the platform",
            "Permission middleware on routes (can:xxx)",
            "Interfaces that adapt to the user's permissions",
          ],
        },
        ownership: "full",
      },
      {
        id: "qc",
        name: { es: "Control de calidad (QC)", en: "Quality control (QC)" },
        description: {
          es: "Módulo de control de calidad con misiones, errores e ítems verificables asociados a los proyectos.",
          en: "Quality control module with missions, errors and verifiable items associated with the projects.",
        },
        features: {
          es: [
            "Registro de misiones y errores por proyecto",
            "Ítems de verificación con seguimiento de estado",
          ],
          en: [
            "Mission and error logging per project",
            "Verification items with status tracking",
          ],
        },
      },
      {
        id: "gpr",
        name: { es: "Módulo GPR", en: "GPR module" },
        description: {
          es: "Módulo de reportes con generación de documentos PDF, imágenes y archivos de diseño CAD/KML asociados a los levantamientos.",
          en: "Reporting module with PDF document generation, images and CAD/KML design files associated with the surveys.",
        },
        features: {
          es: [
            "Generación de reportes PDF con DOMPDF",
            "Gestión de imágenes y archivos AutoCAD/KML/KMZ",
          ],
          en: [
            "PDF report generation with DOMPDF",
            "Image and AutoCAD/KML/KMZ file management",
          ],
        },
      },
      {
        id: "organizacion",
        name: { es: "Equipos y contactos", en: "Teams and contacts" },
        description: {
          es: "Administración de empleados, clientes, agencias y compañías, con contratos y métricas asociadas.",
          en: "Administration of employees, clients, agencies and companies, with associated contracts and metrics.",
        },
        features: {
          es: [
            "CRUD de empleados, clientes y agencias",
            "Compañías con contratos y métricas asociadas",
          ],
          en: [
            "CRUD for employees, clients and agencies",
            "Companies with associated contracts and metrics",
          ],
        },
      },
    ],
    generalFeatures: {
      es: [
        "Monolito Laravel 6 con PostgreSQL y frontend Blade + jQuery sobre Bootstrap 4",
        "451 endpoints HTTP organizados por módulo con middleware de permisos",
        "21 eventos broadcast con Pusher para sincronizar la UI de los usuarios conectados",
        "Visor GIS en Leaflet con 9 capas de red, dibujo, medición y GeoJSON",
        "Integraciones con Google Drive API y Gmail API, y login con Google",
        "Reportes PDF automáticos con DOMPDF y procesamiento de archivos CAD/KML",
        "Control de acceso por roles y permisos (Shinobi) aplicado en rutas y vistas",
        "Auditoría de acciones del sistema mediante logs de actividad",
      ],
      en: [
        "Laravel 6 monolith with PostgreSQL and a Blade + jQuery frontend on Bootstrap 4",
        "451 HTTP endpoints organized by module with permission middleware",
        "21 Pusher broadcast events to sync the UI of connected users",
        "Leaflet GIS viewer with 9 network layers, drawing, measuring and GeoJSON",
        "Google Drive API and Gmail API integrations, plus Google login",
        "Automatic PDF reports with DOMPDF and CAD/KML file processing",
        "Role-and-permission access control (Shinobi) enforced on routes and views",
        "System action auditing through activity logs",
      ],
    },
  },
};