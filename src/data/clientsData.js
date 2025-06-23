/**
 * Datos de clientes ficticios para mostrar en la sección de portafolio
 * Incluye información del cliente, proyecto realizado y logo
 */

export const clientsData = [
  {
    id: 1,
    name: "TechFlow Solutions",
    industry: "Tecnología",
    logo: "🔧",
    logoColor: "from-blue-500 to-cyan-500",
    project: {
      title: "Plataforma de Gestión Empresarial",
      description: "Desarrollo completo de una plataforma web para gestión de recursos empresariales con dashboard interactivo y analytics en tiempo real.",
      technologies: ["React", "Node.js", "MongoDB", "AWS"],
      duration: "6 meses",
      year: "2024",
      type: "Desarrollo Web Completo"
    },
    testimonial: "Axon.app transformó completamente nuestra operación digital. La plataforma superó todas nuestras expectativas.",
    results: [
      "300% mejora en eficiencia operativa",
      "Reducción del 60% en tiempo de procesos",
      "Dashboard con 15+ métricas en tiempo real"
    ]
  },
  {
    id: 2,
    name: "MediCare Plus",
    industry: "Salud",
    logo: "🏥",
    logoColor: "from-green-500 to-emerald-500",
    project: {
      title: "Sistema de Citas Médicas IA",
      description: "Aplicación móvil y web con inteligencia artificial para agendamiento automático de citas médicas y seguimiento de pacientes.",
      technologies: ["React Native", "Python", "TensorFlow", "PostgreSQL"],
      duration: "8 meses",
      year: "2024",
      type: "App Móvil + IA"
    },
    testimonial: "La IA implementada por Axon.app redujo significativamente los tiempos de espera y mejoró la experiencia del paciente.",
    results: [
      "85% automatización en agendamiento",
      "40% reducción en tiempo de espera",
      "95% satisfacción del paciente"
    ]
  },
  {
    id: 3,
    name: "EcoGreen Energy",
    industry: "Energía Renovable",
    logo: "🌱",
    logoColor: "from-green-400 to-lime-500",
    project: {
      title: "Portal de Monitoreo Solar",
      description: "Sistema de monitoreo en tiempo real para paneles solares con predicciones de energía basadas en machine learning.",
      technologies: ["Vue.js", "Python", "IoT", "InfluxDB"],
      duration: "5 meses",
      year: "2024",
      type: "IoT + Machine Learning"
    },
    testimonial: "Gracias a Axon.app, ahora podemos predecir la producción energética con 95% de precisión.",
    results: [
      "Monitoreo 24/7 de 500+ paneles",
      "Predicciones con 95% precisión",
      "30% optimización en mantenimiento"
    ]
  },
  {
    id: 4,
    name: "FinanceFlow",
    industry: "Fintech",
    logo: "💰",
    logoColor: "from-yellow-500 to-orange-500",
    project: {
      title: "App de Inversiones Inteligentes",
      description: "Aplicación móvil para inversiones automatizadas con algoritmos de trading y análisis de riesgo en tiempo real.",
      technologies: ["Flutter", "Node.js", "Redis", "Blockchain"],
      duration: "10 meses",
      year: "2023-2024",
      type: "Fintech + Blockchain"
    },
    testimonial: "La app desarrollada por Axon.app nos posicionó como líderes en fintech con más de 50K usuarios activos.",
    results: [
      "50,000+ usuarios registrados",
      "85% rentabilidad promedio",
      "Procesamiento de $2M+ mensual"
    ]
  },
  {
    id: 5,
    name: "EduTech Academy",
    industry: "Educación",
    logo: "🎓",
    logoColor: "from-purple-500 to-indigo-500",
    project: {
      title: "Plataforma E-Learning IA",
      description: "Sistema de aprendizaje adaptativo con inteligencia artificial que personaliza el contenido según el progreso del estudiante.",
      technologies: ["Next.js", "Python", "OpenAI", "MySQL"],
      duration: "7 meses",
      year: "2024",
      type: "E-Learning + IA"
    },
    testimonial: "Axon.app creó una plataforma que revolucionó nuestra metodología de enseñanza con resultados excepcionales.",
    results: [
      "10,000+ estudiantes activos",
      "75% mejora en retención",
      "Contenido adaptativo personalizado"
    ]
  },
  {
    id: 6,
    name: "FoodieExpress",
    industry: "Delivery",
    logo: "🍕",
    logoColor: "from-red-500 to-pink-500",
    project: {
      title: "Super App de Delivery",
      description: "Aplicación completa de delivery con tracking en tiempo real, pagos integrados y sistema de recomendaciones IA.",
      technologies: ["React Native", "GraphQL", "PostgreSQL", "Stripe"],
      duration: "9 meses",
      year: "2023-2024",
      type: "Super App + Pagos"
    },
    testimonial: "La super app de Axon.app nos convirtió en el delivery #1 de la ciudad con crecimiento exponencial.",
    results: [
      "500+ restaurantes aliados",
      "25,000+ pedidos mensuales",
      "4.8★ rating en app stores"
    ]
  }
];

// Estadísticas generales de clientes
export const clientsStats = {
  totalClients: 50,
  projectsCompleted: 127,
  industriesCovered: 12,
  satisfactionRate: 98,
  averageProjectDuration: "6.5 meses",
  technologiesUsed: 35
};
