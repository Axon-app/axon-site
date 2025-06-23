/* cspell:disable */
/* Este archivo contiene texto en español que puede ser marcado como error por el linter */

// Datos para las secciones de la página

// Constantes para niveles de experiencia
const LEVELS = {
  EXPERT: "Expert",
  ADVANCED: "Advanced",
};

// Constantes para categorías
const CATEGORIES = {
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  DEVOPS: "DevOps",
  DATABASE: "Database",
  CLOUD: "Cloud",
  AI_ML: "IA/ML",
  API: "API",
  PROGRAMMING: "Programming",
  CACHE: "Cache",
};

// Índices para búsqueda rápida
const categoryIndex = new Map();
const levelIndex = new Map();

export const technologies = [
  // Frontend & Frameworks - Stack principal utilizado en Axon
  {
    name: "React",
    category: CATEGORIES.FRONTEND,
    icon: "⚛️",
    description: "Biblioteca para interfaces de usuario",
    gradient: "from-blue-500 to-cyan-400",
    level: LEVELS.EXPERT,
  },
  {
    name: "Vite",
    category: CATEGORIES.FRONTEND,
    icon: "⚡",
    description: "Build tool ultrarrápido para desarrollo",
    gradient: "from-purple-500 to-indigo-500",
    level: LEVELS.EXPERT,
  },
  {
    name: "Tailwind CSS",
    category: CATEGORIES.FRONTEND,
    icon: "🎨",
    description: "Framework CSS utility-first",
    gradient: "from-cyan-400 to-blue-500",
    level: LEVELS.EXPERT,
  },
  {
    name: "TypeScript",
    category: CATEGORIES.PROGRAMMING,
    icon: "🔷",
    description: "JavaScript con tipado estático",
    gradient: "from-blue-500 to-blue-700",
    level: LEVELS.EXPERT,
  },
  {
    name: "Next.js",
    category: CATEGORIES.FRONTEND,
    icon: "▲",
    description: "Framework de React para producción",
    gradient: "from-gray-800 to-gray-600",
    level: LEVELS.EXPERT,
  },

  // Backend & APIs - Tecnologías del lado del servidor
  {
    name: "Node.js",
    category: CATEGORIES.BACKEND,
    icon: "🟢",
    description: "Runtime de JavaScript del lado del servidor",
    gradient: "from-green-500 to-emerald-400",
    level: LEVELS.EXPERT,
  },
  {
    name: "Express",
    category: CATEGORIES.BACKEND,
    icon: "🚀",
    description: "Framework web minimalista para Node.js",
    gradient: "from-gray-600 to-gray-800",
    level: LEVELS.EXPERT,
  },
  {
    name: "Python",
    category: CATEGORIES.BACKEND,
    icon: "🐍",
    description: "Lenguaje versátil para desarrollo y análisis",
    gradient: "from-yellow-500 to-orange-400",
    level: LEVELS.EXPERT,
  },
  {
    name: "FastAPI",
    category: CATEGORIES.BACKEND,
    icon: "⚡",
    description: "Framework moderno y rápido para APIs",
    gradient: "from-teal-500 to-cyan-600",
    level: LEVELS.ADVANCED,
  },
  {
    name: "GraphQL",
    category: CATEGORIES.API,
    icon: "💜",
    description: "Lenguaje de consulta para APIs",
    gradient: "from-pink-500 to-purple-500",
    level: LEVELS.ADVANCED,
  },

  // Cloud & DevOps - Infraestructura y despliegue
  {
    name: "AWS",
    category: CATEGORIES.CLOUD,
    icon: "☁️",
    description: "Servicios de computación en la nube",
    gradient: "from-orange-500 to-red-400",
    level: LEVELS.EXPERT,
  },
  {
    name: "Docker",
    category: CATEGORIES.DEVOPS,
    icon: "🐋",
    description: "Plataforma de containerización",
    gradient: "from-blue-600 to-indigo-500",
    level: LEVELS.EXPERT,
  },
  {
    name: "GitHub Actions",
    category: CATEGORIES.DEVOPS,
    icon: "🔄",
    description: "CI/CD integrado con GitHub",
    gradient: "from-gray-700 to-gray-500",
    level: LEVELS.EXPERT,
  },
  {
    name: "GitHub Pages",
    category: CATEGORIES.CLOUD,
    icon: "📄",
    description: "Hosting gratuito para sitios estáticos",
    gradient: "from-gray-800 to-purple-600",
    level: LEVELS.EXPERT,
  },

  // Databases & Storage - Almacenamiento de datos
  {
    name: "PostgreSQL",
    category: CATEGORIES.DATABASE,
    icon: "🐘",
    description: "Base de datos relacional avanzada",
    gradient: "from-blue-700 to-blue-500",
    level: LEVELS.EXPERT,
  },
  {
    name: "MongoDB",
    category: CATEGORIES.DATABASE,
    icon: "🍃",
    description: "Base de datos NoSQL flexible",
    gradient: "from-green-600 to-green-400",
    level: LEVELS.EXPERT,
  },
  {
    name: "Redis",
    category: CATEGORIES.CACHE,
    icon: "🔴",
    description: "Almacén de datos en memoria",
    gradient: "from-red-500 to-red-400",
    level: LEVELS.ADVANCED,
  },

  // AI & Analytics - Inteligencia Artificial y análisis
  {
    name: "TensorFlow",
    category: CATEGORIES.AI_ML,
    icon: "🧠",
    description: "Framework de machine learning",
    gradient: "from-orange-600 to-yellow-500",
    level: LEVELS.ADVANCED,
  },
  {
    name: "OpenAI API",
    category: CATEGORIES.AI_ML,
    icon: "🤖",
    description: "Integración con modelos de IA",
    gradient: "from-green-400 to-blue-500",
    level: LEVELS.ADVANCED,
  },

  // Services & Integrations - Servicios utilizados
  {
    name: "Canvas API",
    category: CATEGORIES.FRONTEND,
    icon: "🎨",
    description: "API para generación de imágenes dinámicas",
    gradient: "from-indigo-500 to-purple-600",
    level: LEVELS.ADVANCED,
  },
];

// Crear índices para búsqueda rápida
technologies.forEach((tech) => {
  // Índice por categoría
  if (!categoryIndex.has(tech.category)) {
    categoryIndex.set(tech.category, []);
  }
  categoryIndex.get(tech.category).push(tech);

  // Índice por nivel
  if (!levelIndex.has(tech.level)) {
    levelIndex.set(tech.level, []);
  }
  levelIndex.get(tech.level).push(tech);
});

// Funciones de ayuda para filtrado rápido
export const getTechnologiesByCategory = (category) =>
  categoryIndex.get(category) || [];
export const getTechnologiesByLevel = (level) => levelIndex.get(level) || [];
export const getCategories = () => Object.values(CATEGORIES);
export const getLevels = () => Object.values(LEVELS);
export const TECH_CATEGORIES = CATEGORIES;
export const TECH_LEVELS = LEVELS;

// Testimonios de clientes
export const testimonials = [
  {
    id: 1,
    name: "María González",
    role: "CEO - TechStart Solutions",
    company: "TechStart Solutions",
    avatar:
      "https://ui-avatars.com/api/?name=Maria+Gonzalez&background=0ea5e9&color=fff&size=128&bold=true",
    rating: 5,
    review:
      "Axon transformó completamente nuestra presencia digital. Su equipo no solo entregó una plataforma excepcional, sino que superó todas nuestras expectativas. El nivel de profesionalismo y atención al detalle es impresionante.",
    project: "Plataforma E-commerce",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    role: "CTO - InnovateLab",
    company: "InnovateLab",
    avatar:
      "https://ui-avatars.com/api/?name=Carlos+Mendoza&background=10b981&color=fff&size=128&bold=true",
    rating: 5,
    review:
      "La experiencia trabajando con Axon ha sido extraordinaria. Desarrollaron una aplicación web compleja con integraciones avanzadas en tiempo récord. Su expertise técnico es de clase mundial.",
    project: "Sistema de Gestión Empresarial",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    id: 3,
    name: "Ana Rodríguez",
    role: "Directora de Marketing - Digital Boost",
    company: "Digital Boost",
    avatar:
      "https://ui-avatars.com/api/?name=Ana+Rodriguez&background=a855f7&color=fff&size=128&bold=true",
    rating: 5,
    review:
      "Axon no solo construyó nuestro sitio web, creó una experiencia digital que convierte visitantes en clientes. El ROI ha sido increíble y el soporte post-lanzamiento es excepcional.",
    project: "Landing Page & Marketing",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 4,
    name: "Roberto Silva",
    role: "Fundador - StartupX",
    company: "StartupX",
    avatar:
      "https://ui-avatars.com/api/?name=Roberto+Silva&background=f59e0b&color=fff&size=128&bold=true",
    rating: 5,
    review:
      "Como startup, necesitábamos un socio tecnológico confiable. Axon nos ayudó a escalar desde una idea hasta una plataforma robusta con miles de usuarios. Su visión estratégica es invaluable.",
    project: "MVP & Escalamiento",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: 5,
    name: "Lucía Fernández",
    role: "Gerente General - RetailPro",
    company: "RetailPro",
    avatar:
      "https://ui-avatars.com/api/?name=Lucia+Fernandez&background=6366f1&color=fff&size=128&bold=true",
    rating: 5,
    review:
      "La migración a la nube que realizó Axon mejoró nuestra eficiencia operativa en un 40%. Su enfoque en la seguridad y la escalabilidad nos da total tranquilidad para el futuro.",
    project: "Migración Cloud & DevOps",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    id: 6,
    name: "Diego Morales",
    role: "VP Technology - FinanceNext",
    company: "FinanceNext",
    avatar:
      "https://ui-avatars.com/api/?name=Diego+Morales&background=06b6d4&color=fff&size=128&bold=true",
    rating: 5,
    review:
      "Implementaron un sistema de IA que revolucionó nuestro análisis de datos. Los insights que obtenemos ahora nos permiten tomar decisiones más inteligentes y oportunas.",
    project: "IA & Machine Learning",
    gradient: "from-teal-500 to-cyan-500",
  },
];

// Función para obtener testimonios aleatorios
export const getRandomTestimonials = (count = 3) => {
  const shuffled = [...testimonials].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
