import React from "react";

export const ServiceDetailModal = React.memo(
  ({ isOpen, onClose, service, onOpenQuote, onOpenConsultation }) => {
    // Manejar escape key
    React.useEffect(() => {
      const handleEscape = (event) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";
      }

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";
      };
    }, [isOpen, onClose]);

    // Early return si no está abierto o no hay servicio
    if (!isOpen || !service) return null;

    // Manejar click en backdrop
    const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    return (
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
      >
        <div className="bg-slate-800 rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-blue-500/30">
          {/* Header */}
          <div className="sticky top-0 bg-slate-800 border-b border-gray-700 p-4 sm:p-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-3xl sm:text-4xl mr-4 text-blue-400">
                {service.icon}
              </div>
              <h2
                id="service-modal-title"
                className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
              >
                {service.title}
              </h2>
            </div>{" "}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Cerrar detalles del servicio"
              type="button"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>{" "}
          {/* Content */}
          <div className="p-4 sm:p-6 space-y-6 text-gray-300">
            <div className="prose prose-invert prose-blue max-w-none">
              {/* Descripción principal */}
              <section>
                <p className="text-lg leading-relaxed text-gray-200 mb-4">
                  {service.description}
                </p>
              </section>

              {/* Descripción detallada */}
              {service.detailedDescription && (
                <section>
                  <h3 className="text-xl font-semibold text-blue-300 mb-3">
                    📋 Descripción Detallada
                  </h3>
                  <p className="leading-relaxed">
                    {service.detailedDescription}
                  </p>
                </section>
              )}

              {/* Características principales */}
              {service.features && service.features.length > 0 && (
                <section>
                  <h3 className="text-xl font-semibold text-blue-300 mb-3">
                    ⭐ Características Principales
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start p-3 bg-slate-700/50 rounded-lg border border-blue-500/20"
                      >
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="leading-relaxed text-sm">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Tecnologías utilizadas */}
              {service.technologies && service.technologies.length > 0 && (
                <section>
                  <h3 className="text-xl font-semibold text-blue-300 mb-3">
                    🛠️ Tecnologías Utilizadas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-blue-300 rounded-full text-sm border border-blue-500/30 hover:border-blue-400/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Proceso de trabajo */}
              {service.process && service.process.length > 0 && (
                <section>
                  <h3 className="text-xl font-semibold text-blue-300 mb-3">
                    🔄 Proceso de Trabajo
                  </h3>
                  <div className="space-y-4">
                    {service.process.map((step, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 shadow-lg">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-blue-200 mb-2">
                            {step.title}
                          </h4>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Información adicional en cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Tiempo estimado */}
                {service.estimatedTime && (
                  <div className="bg-slate-700/30 rounded-lg p-4 border border-blue-500/20">
                    <h4 className="text-lg font-semibold text-blue-300 mb-2 flex items-center">
                      ⏱️ Tiempo Estimado
                    </h4>
                    <p className="leading-relaxed">
                      <span className="font-semibold text-cyan-400 text-lg">
                        {service.estimatedTime}
                      </span>
                      {service.timeNote && (
                        <span className="text-gray-400 text-sm block mt-1">
                          {service.timeNote}
                        </span>
                      )}
                    </p>
                  </div>
                )}

                {/* Rango de precios */}
                {service.priceRange && (
                  <div className="bg-slate-700/30 rounded-lg p-4 border border-cyan-500/20">
                    <h4 className="text-lg font-semibold text-cyan-300 mb-2 flex items-center">
                      💰 Rango de Inversión
                    </h4>
                    <p className="leading-relaxed">
                      <span className="font-semibold text-cyan-400 text-lg">
                        {service.priceRange}
                      </span>
                      {service.priceNote && (
                        <span className="text-gray-400 text-sm block mt-1">
                          {service.priceNote}
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>{" "}
            {/* Panel informativo */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-2 flex items-center">
                💡 Siguiente Paso
              </h4>
              <p className="text-sm text-gray-300 mb-3">
                Elige una opción para continuar con este servicio:
              </p>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>
                  • <strong>Propuesta:</strong> Recibe una propuesta detallada y
                  personalizada
                </li>
                <li>
                  • <strong>Consulta:</strong> Conversa con nuestro equipo sobre
                  tus necesidades
                </li>
              </ul>
            </div>
            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-700">
              {" "}
              <button
                onClick={() => {
                  onClose(); // Cerrar el modal actual
                  if (onOpenQuote) onOpenQuote(); // Abrir modal de propuesta
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg flex items-center justify-center"
                aria-label={`Solicitar propuesta para ${service.title}`}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Solicitar Propuesta
              </button>{" "}
              <button
                onClick={() => {
                  onClose(); // Cerrar el modal actual
                  if (onOpenConsultation) onOpenConsultation(); // Abrir modal de consulta
                }}
                className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all duration-300 font-semibold border border-gray-600 hover:border-gray-500 flex items-center justify-center"
                aria-label={`Programar consulta para ${service.title}`}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h.268a2 2 0 011.933 2.477l-.599 2.796A1 1 0 0116.535 11H7.465a1 1 0 01-.967-.727L5.9 7.477A2 2 0 017.732 5H8z"
                  />
                </svg>
                Programar Consulta
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ServiceDetailModal.displayName = "ServiceDetailModal";
