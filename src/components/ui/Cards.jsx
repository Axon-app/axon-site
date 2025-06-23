import React from "react";

// Componente de tarjeta de servicio optimizado
export const ServiceCard = React.memo(
  ({ icon, title, description, onOpenModal, id }) => {
    return (
      <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:shadow-blue-500/30 hover:-translate-y-2 shadow-xl border border-blue-500/30 group h-full min-h-[280px] sm:min-h-[320px]">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 text-blue-400 flex items-center justify-center text-3xl sm:text-4xl transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-blue-300">
          {title}
        </h3>
        <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed flex-grow text-sm sm:text-base">
          {description}
        </p>
        {onOpenModal && (
          <button
            onClick={() => onOpenModal(id)}
            className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 text-base sm:text-lg font-semibold shadow-lg mt-auto"
          >
            Más Información
          </button>
        )}
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
