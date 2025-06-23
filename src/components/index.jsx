// Exportaciones directas sin lazy loading
import React from "react";

// Componentes básicos
export {
  AnimatedBackground,
  AxonLogo,
  ScrollToTopButton,
} from "./ui/BasicComponents";

export { ServiceCard, TestimonialCard } from "./ui/Cards";

export {
  AnimatedCounter,
  AnimatedCounterWithProgress,
  TechCarousel,
  TechItem,
  TestimonialsBanner,
} from "./ui/Interactive";

// Componentes UI adicionales
export { FloatingBlogButton } from "./ui/FloatingBlogButton";

// Secciones
export { BlogSection } from "./sections/BlogSection";

// Modales - importación directa
export { EnhancedPrivacyModal } from "./modals/PrivacyModal";
export { EnhancedTermsModal } from "./modals/TermsModal";
export { ServiceDetailModal } from "./modals/ServiceModal";
export { QuoteRequestModal } from "./modals/QuoteModal";
export { ConsultationModal } from "./modals/ConsultationModal";
export { EnhancedCookiesModal } from "./modals/CookiesModal";
export { BlogModal } from "./modals/BlogModal";
