import React from "react";

// Iconos SVG profesionales
const IconsLibrary = {
  web: (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/>
    </svg>
  ),
  mobile: (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm1 17H7V4h10v14zm-3-2H10v-1h4v1z" fill="currentColor"/>
    </svg>
  ),
  marketing: (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
    </svg>
  ),
  api: (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" fill="currentColor"/>
    </svg>
  ),
  ai: (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
      <circle cx="12" cy="12" r="4" fill="currentColor"/>
    </svg>
  ),
  support: (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" fill="currentColor"/>
    </svg>
  ),
  design: (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
      <path d="M7 14l5-5 5 5-5 5-5-5z" fill="white"/>
    </svg>
  ),
  strategy: (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="currentColor"/>
    </svg>
  ),
  analytics: (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2v-10h2v10zm4 0h-2V8h2v9z" fill="currentColor"/>
    </svg>
  ),
  devops: (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18l-4-4h3V8h2v8h3l-4 4z" fill="currentColor"/>
    </svg>
  ),
  default: (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
    </svg>
  )
};

// Mapeo de iconos basado en el ID del servicio
const getIconByService = (id) => {
  const iconMap = {
    'desarrollo-web': IconsLibrary.web,
    'apps-moviles': IconsLibrary.mobile,
    'marketing-digital': IconsLibrary.marketing,
    'apis-integracion': IconsLibrary.api,
    'inteligencia-artificial': IconsLibrary.ai,
    'soporte-hardware-software': IconsLibrary.support,
    'ui-ux-design': IconsLibrary.design,
    'estrategia-digital': IconsLibrary.strategy,
    'data-analytics': IconsLibrary.analytics,
    'devops-automatizacion': IconsLibrary.devops,
  };
  return iconMap[id] || IconsLibrary.default;
};

// Componente de tarjeta de servicio mejorado
export const ServiceCard = React.memo(
  ({ title, description, onOpenModal, id }) => {
    const iconSvg = getIconByService(id);

    return (
      <div className="group relative bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center transform transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/25 hover:-translate-y-3 shadow-xl border border-slate-600/50 hover:border-cyan-500/50 h-full min-h-[320px] sm:min-h-[360px] overflow-hidden">

        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Floating Decoration */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Icon Container */}
        <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 mb-6 sm:mb-8 transition-transform duration-500 group-hover:scale-110">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
          <div className="relative w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-cyan-500/30 group-hover:border-cyan-400/60 transition-all duration-500">
            <div className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-500">
              {iconSvg}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-slate-300 group-hover:text-slate-200 mb-6 sm:mb-8 leading-relaxed flex-grow text-sm sm:text-base transition-colors duration-300">
            {description}
          </p>

          {/* CTA Button */}
          {onOpenModal && (
            <button
              onClick={() => onOpenModal(id)}
              className="relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl transition-all duration-300 transform hover:scale-105 text-base sm:text-lg font-semibold shadow-lg group-hover:shadow-cyan-500/25 mt-auto overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="relative">Más Información</span>
            </button>
          )}
        </div>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    );
  }
);

ServiceCard.displayName = "ServiceCard";

// Componente de tarjeta de testimonio optimizado
export const TestimonialCard = React.memo(({ testimonial }) => {
  return (
    <div className="bg-slate-800/60 backdrop-blur-md rounded-xl p-6 sm:p-8 transform transition-all duration-300 hover:shadow-cyan-500/30 hover:-translate-y-2 shadow-xl border border-cyan-500/30">
      <div className="flex items-center mb-4 sm:mb-6">
        <img
          src={testimonial.avatar}
          alt={`Avatar de ${testimonial.name}`}
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mr-3 sm:mr-5 border-2 border-cyan-400 shadow-lg"
          loading="lazy"
          width="64"
          height="64"
        />
        <div>
          <h4 className="text-lg sm:text-xl font-semibold text-cyan-400">
            {testimonial.name}
          </h4>
          <p className="text-gray-400 text-xs sm:text-sm">{testimonial.role}</p>
        </div>
      </div>
      <p className="text-gray-300 italic text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
        &ldquo;{testimonial.review}&rdquo;
      </p>
      <div
        className="flex items-center text-yellow-400 text-xl sm:text-2xl"
        role="img"
        aria-label={`Calificación: ${testimonial.rating} de 5 estrellas`}
      >
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i}>{i < testimonial.rating ? "★" : "☆"}</span>
        ))}
      </div>
    </div>
  );
});

TestimonialCard.displayName = "TestimonialCard";
