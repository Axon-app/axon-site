import React, { useEffect, useState } from "react";

export const EnhancedCookiesModal = React.memo(({ isOpen, onClose }) => {
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Las cookies necesarias siempre están habilitadas
    analytics: false,
    marketing: false,
    preferences: false,
  });

  // Cargar preferencias guardadas
  useEffect(() => {
    const savedPreferences = localStorage.getItem("axon-cookie-preferences");
    if (savedPreferences) {
      setCookiePreferences(JSON.parse(savedPreferences));
    }
  }, []);

  // Manejar escape key
  useEffect(() => {
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

  // Manejar click en backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Guardar preferencias
  const savePreferences = () => {
    localStorage.setItem(
      "axon-cookie-preferences",
      JSON.stringify(cookiePreferences)
    );
    localStorage.setItem("axon-cookies-accepted", "true");
    onClose();
  };

  // Aceptar todas las cookies
  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    setCookiePreferences(allAccepted);
    localStorage.setItem(
      "axon-cookie-preferences",
      JSON.stringify(allAccepted)
    );
    localStorage.setItem("axon-cookies-accepted", "true");
    onClose();
  };

  // Rechazar cookies opcionales
  const rejectOptional = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    setCookiePreferences(onlyNecessary);
    localStorage.setItem(
      "axon-cookie-preferences",
      JSON.stringify(onlyNecessary)
    );
    localStorage.setItem("axon-cookies-accepted", "true");
    onClose();
  };

  // Cambiar preferencia individual
  const togglePreference = (type) => {
    if (type === "necessary") return; // Las cookies necesarias no se pueden desactivar

    setCookiePreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // Early return si no está abierto
  if (!isOpen) return null;

  const cookieTypes = [
    {
      key: "necessary",
      title: "Cookies Necesarias",
      description:
        "Estas cookies son esenciales para el funcionamiento básico del sitio web y no se pueden desactivar.",
      examples: "Autenticación, seguridad, navegación básica",
      required: true,
    },
    {
      key: "analytics",
      title: "Cookies de Análisis",
      description:
        "Nos ayudan a entender cómo interactúas con nuestro sitio web mediante la recopilación y el análisis de información.",
      examples: "Google Analytics, estadísticas de uso, rendimiento del sitio",
      required: false,
    },
    {
      key: "marketing",
      title: "Cookies de Marketing",
      description:
        "Se utilizan para rastrear a los visitantes en los sitios web para mostrar anuncios relevantes y atractivos.",
      examples: "Publicidad personalizada, remarketing, redes sociales",
      required: false,
    },
    {
      key: "preferences",
      title: "Cookies de Preferencias",
      description:
        "Permiten que el sitio web recuerde información que cambia la forma en que se comporta o se ve.",
      examples: "Idioma preferido, configuración de tema, región",
      required: false,
    },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookies-modal-title"
    >
      <div className="bg-slate-800 rounded-xl max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-blue-500/30">
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 border-b border-gray-700 p-4 sm:p-6 flex items-center justify-between">
          {" "}
          <h2
            id="cookies-modal-title"
            className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center gap-3"
          >
            <img
              src="logo1.png"
              alt="Axon Logo"
              className="w-8 h-8 rounded-lg"
            />
            Configuración de Cookies
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Cerrar modal"
          >
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* Introducción */}
          <div className="text-gray-300 space-y-4">
            <p className="text-lg">
              Utilizamos cookies y tecnologías similares para mejorar tu
              experiencia en nuestro sitio web.
            </p>
            <p>
              Puedes configurar tus preferencias de cookies a continuación. Ten
              en cuenta que deshabilitar algunas cookies puede afectar la
              funcionalidad del sitio.
            </p>
          </div>

          {/* Cookie Types */}
          <div className="space-y-6">
            {cookieTypes.map((type) => (
              <div
                key={type.key}
                className="border border-gray-700 rounded-lg p-4 bg-slate-900/50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      {type.title}
                      {type.required && (
                        <span className="px-2 py-1 bg-blue-600 text-xs rounded-full">
                          Requeridas
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {type.description}
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                      <strong>Ejemplos:</strong> {type.examples}
                    </p>
                  </div>
                  <div className="ml-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cookiePreferences[type.key]}
                        onChange={() => togglePreference(type.key)}
                        disabled={type.required}
                        className="sr-only peer"
                      />
                      <div
                        className={`relative w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                          cookiePreferences[type.key]
                            ? "peer-checked:bg-blue-600"
                            : ""
                        } ${
                          type.required ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      ></div>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Information */}
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
            <h4 className="text-blue-400 font-semibold mb-2">
              ℹ️ Información Adicional
            </h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>
                • Puedes cambiar tus preferencias en cualquier momento desde el
                footer
              </li>
              <li>
                • Las cookies necesarias no se pueden desactivar ya que son
                esenciales para el funcionamiento del sitio
              </li>
              <li>• Tus preferencias se guardarán en tu navegador</li>
              <li>
                • Para más información, consulta nuestra Política de Privacidad
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-slate-800 border-t border-gray-700 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={rejectOptional}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Solo Necesarias
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg transition-colors"
              >
                Aceptar Todas
              </button>
            </div>
            <button
              onClick={savePreferences}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-colors font-semibold"
            >
              Guardar Preferencias
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

EnhancedCookiesModal.displayName = "EnhancedCookiesModal";
