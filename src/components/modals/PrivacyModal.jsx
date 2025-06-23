import React from "react";
import { EmailLink } from "../ui/EmailLink";

export const EnhancedPrivacyModal = React.memo(({ isOpen, onClose }) => {
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

  // Manejar click en backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Early return si no está abierto
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      <div className="bg-slate-800 rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-blue-500/30">
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 border-b border-gray-700 p-4 sm:p-6 flex items-center justify-between">
          {" "}
          <h2
            id="privacy-modal-title"
            className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
          >
            Política de Privacidad
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Cerrar política de privacidad"
            type="button"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />{" "}
            </svg>
          </button>
        </div>
        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6 text-gray-300">
          <div className="prose prose-invert prose-blue max-w-none">
            <section>
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                1. Información que Recopilamos
              </h3>
              <p className="leading-relaxed mb-4">
                En Axon.app, recopilamos únicamente la información necesaria
                para proporcionar nuestros servicios de desarrollo web y
                consultoría tecnológica:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Información de contacto (nombre, email, teléfono)</li>
                <li>Detalles del proyecto y requerimientos técnicos</li>
                <li>Información de navegación y uso del sitio web</li>
                <li>
                  Cookies técnicas necesarias para el funcionamiento del sitio
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                2. Uso de la Información
              </h3>
              <p className="leading-relaxed mb-4">
                Utilizamos su información exclusivamente para:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contactarle sobre sus proyectos y consultas</li>
                <li>Proporcionar cotizaciones y propuestas técnicas</li>
                <li>Mejorar nuestros servicios y experiencia de usuario</li>
                <li>Enviar actualizaciones relevantes sobre proyectos</li>
                <li>Cumplir con obligaciones legales y contractuales</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                3. Protección de Datos
              </h3>
              <p className="leading-relaxed mb-4">
                Implementamos medidas de seguridad robustas para proteger su
                información personal:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encriptación SSL/TLS para todas las comunicaciones</li>
                <li>Acceso restringido a información personal</li>
                <li>Copias de seguridad seguras y regulares</li>
                <li>
                  Cumplimiento con estándares internacionales de seguridad
                </li>
                <li>Monitoreo continuo de seguridad y auditorías regulares</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                4. Compartir Información
              </h3>
              <p className="leading-relaxed mb-4">
                No vendemos, alquilamos ni compartimos su información personal
                con terceros, excepto cuando sea necesario para proporcionar
                nuestros servicios o cuando la ley lo requiera.
              </p>
              <p className="leading-relaxed text-sm text-gray-400">
                <strong>Excepciones:</strong> Podemos compartir información con
                proveedores de servicios de confianza que nos ayudan a operar
                nuestro sitio web y brindar servicios, siempre bajo estrictos
                acuerdos de confidencialidad.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                5. Sus Derechos
              </h3>
              <p className="leading-relaxed mb-4">
                De acuerdo con las regulaciones de protección de datos (GDPR,
                CCPA), usted tiene derecho a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Acceso:</strong> Solicitar una copia de su información
                  personal
                </li>
                <li>
                  <strong>Rectificación:</strong> Corregir datos incorrectos o
                  incompletos
                </li>
                <li>
                  <strong>Eliminación:</strong> Solicitar la eliminación de sus
                  datos
                </li>
                <li>
                  <strong>Portabilidad:</strong> Recibir sus datos en formato
                  estructurado
                </li>
                <li>
                  <strong>Oposición:</strong> Oponerse al procesamiento de sus
                  datos
                </li>
                <li>
                  <strong>Limitación:</strong> Solicitar la limitación del
                  procesamiento
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                6. Retención de Datos
              </h3>
              <p className="leading-relaxed mb-4">
                Conservamos su información personal solo durante el tiempo
                necesario para:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cumplir con los propósitos para los que fue recopilada</li>
                <li>Satisfacer requisitos legales, contables o de informes</li>
                <li>Resolver disputas y hacer cumplir nuestros acuerdos</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                7. Contacto
              </h3>{" "}
              <p className="leading-relaxed">
                {" "}
                Para preguntas sobre esta política de privacidad o para ejercer
                sus derechos, contáctenos en:{" "}
                <EmailLink
                  mailtoUrl="mailto:axonapp.info@gmail.com?subject=Consulta%20sobre%20Política%20de%20Privacidad%20-%20Axon.App&body=Estimado%20equipo%20de%20Axon.App,%0A%0AMe%20dirijo%20a%20ustedes%20para%20realizar%20una%20consulta%20sobre%20su%20Política%20de%20Privacidad:%0A%0ATipo%20de%20consulta%20(marque%20con%20X):%0A[%20]%20Solicitud%20de%20acceso%20a%20mis%20datos%20personales%0A[%20]%20Solicitud%20de%20rectificación%20de%20datos%0A[%20]%20Solicitud%20de%20eliminación%20de%20datos%0A[%20]%20Consulta%20general%20sobre%20privacidad%0A[%20]%20Otro:%20__________________%0A%0ADetalles%20de%20mi%20consulta:%0A%0A%0A%0AMis%20datos%20de%20contacto:%0ANombre%20completo:%20%0AEmail:%20%0ATeléfono:%20%0A%0AGracias%20por%20su%20atención.%0A%0ASaludos%20cordiales,"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors underline"
                >
                  axonapp.info@gmail.com
                </EmailLink>
              </p>
              <p className="leading-relaxed mt-3 text-sm text-gray-400">
                <strong>Tiempo de respuesta:</strong> Responderemos a su
                solicitud dentro de 30 días hábiles.
              </p>
            </section>
          </div>

          <div className="text-sm text-gray-400 pt-4 border-t border-gray-700 bg-slate-900/30 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <p>
                <strong>Última actualización:</strong>{" "}
                {new Date().toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-xs">
                <strong>Versión:</strong> 2.1
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

EnhancedPrivacyModal.displayName = "EnhancedPrivacyModal";
