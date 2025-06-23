import React from "react";
import { EmailLink } from "../ui/EmailLink";

export const EnhancedTermsModal = React.memo(({ isOpen, onClose }) => {
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

  // Early return si no está abierto
  if (!isOpen) return null;

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
      aria-labelledby="terms-modal-title"
    >
      <div className="bg-slate-800 rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-blue-500/30">
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 border-b border-gray-700 p-4 sm:p-6 flex items-center justify-between">
          <h2
            id="terms-modal-title"
            className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
          >
            Términos y Condiciones
          </h2>{" "}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Cerrar términos y condiciones"
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
            <section>
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                1. Aceptación de los Términos
              </h3>
              <p className="leading-relaxed">
                Al acceder y utilizar los servicios de Axon.app, usted acepta
                cumplir con estos términos y condiciones. Si no está de acuerdo
                con alguna parte de estos términos, no debe utilizar nuestros
                servicios.
              </p>
              <p className="leading-relaxed text-sm text-gray-400 mt-3">
                <strong>Nota importante:</strong> Estos términos constituyen un
                acuerdo legal vinculante entre usted y Axon.app.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                2. Servicios Ofrecidos
              </h3>
              <p className="leading-relaxed mb-4">
                Axon.app proporciona servicios profesionales de desarrollo web,
                incluyendo pero no limitado a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Desarrollo de sitios web personalizados y aplicaciones web
                </li>
                <li>Aplicaciones web progresivas (PWA) y soluciones móviles</li>
                <li>Consultoría en tecnologías web modernas y arquitectura</li>
                <li>
                  Optimización de rendimiento, SEO y experiencia de usuario
                </li>
                <li>Mantenimiento, soporte técnico y actualizaciones</li>
                <li>Auditorías de código y revisiones de seguridad</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                3. Responsabilidades del Cliente
              </h3>
              <p className="leading-relaxed mb-4">
                El cliente se compromete a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Información:</strong> Proporcionar información
                  precisa, completa y actualizada
                </li>
                <li>
                  <strong>Comunicación:</strong> Brindar feedback oportuno
                  durante el proceso de desarrollo
                </li>
                <li>
                  <strong>Pagos:</strong> Cumplir con los plazos de pago
                  acordados según el cronograma
                </li>
                <li>
                  <strong>Propiedad:</strong> Respetar los derechos de propiedad
                  intelectual de terceros
                </li>
                <li>
                  <strong>Colaboración:</strong> Participar activamente en
                  reuniones y revisiones programadas
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                4. Propiedad Intelectual
              </h3>
              <p className="leading-relaxed mb-4">
                Los derechos de propiedad intelectual se distribuyen de la
                siguiente manera:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Contenido del cliente:</strong> El cliente posee los
                  derechos sobre el contenido proporcionado
                </li>
                <li>
                  <strong>Metodologías propias:</strong> Axon.app retiene los
                  derechos sobre metodologías y frameworks propios
                </li>
                <li>
                  <strong>Código desarrollado:</strong> El código desarrollado
                  es propiedad del cliente una vez completado el pago
                </li>
                <li>
                  <strong>Licencias de terceros:</strong> Las licencias de
                  software de terceros se rigen por sus términos específicos
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                5. Limitación de Responsabilidad
              </h3>
              <p className="leading-relaxed mb-4">
                Axon.app no será responsable por daños indirectos, incidentales
                o consecuenciales que puedan surgir del uso de nuestros
                servicios. Nuestra responsabilidad se limita al valor del
                contrato específico.
              </p>
              <p className="leading-relaxed text-sm text-gray-400">
                <strong>Excepciones:</strong> Esta limitación no aplica en casos
                de negligencia grave, dolo o violaciones a la seguridad por
                nuestra parte.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                6. Garantías y Soporte
              </h3>
              <p className="leading-relaxed mb-4">
                Ofrecemos las siguientes garantías y soporte:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Garantía de errores:</strong> 30 días de corrección de
                  errores sin costo adicional
                </li>
                <li>
                  <strong>Soporte técnico:</strong> Soporte durante el período
                  de garantía especificado
                </li>
                <li>
                  <strong>Actualizaciones críticas:</strong> Actualizaciones de
                  seguridad críticas incluidas
                </li>
                <li>
                  <strong>Documentación:</strong> Entrega de documentación
                  técnica completa
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                7. Cancelación y Reembolsos
              </h3>
              <p className="leading-relaxed mb-4">
                Política de cancelación y reembolsos:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Cancelación:</strong> Los proyectos pueden cancelarse
                  con 7 días de aviso por escrito
                </li>
                <li>
                  <strong>Reembolsos:</strong> Se calculan basándose en el
                  trabajo completado hasta la fecha
                </li>
                <li>
                  <strong>Entregables:</strong> El cliente recibe todos los
                  entregables completados
                </li>
                <li>
                  <strong>Gastos:</strong> Los gastos incurridos no son
                  reembolsables
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                8. Confidencialidad
              </h3>
              <p className="leading-relaxed mb-4">
                Nos comprometemos a mantener la confidencialidad de:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Información comercial y estratégica del cliente</li>
                <li>Datos técnicos y de arquitectura de sistemas</li>
                <li>Información financiera y operativa</li>
                <li>Cualquier información marcada como confidencial</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                9. Modificaciones
              </h3>
              <p className="leading-relaxed">
                Nos reservamos el derecho de modificar estos términos en
                cualquier momento. Los cambios serán comunicados con al menos 30
                días de anticipación a través de nuestros canales oficiales.
              </p>
              <p className="leading-relaxed text-sm text-gray-400 mt-3">
                <strong>Aplicabilidad:</strong> Las modificaciones no afectarán
                proyectos en curso bajo términos previamente acordados.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                10. Jurisdicción y Ley Aplicable
              </h3>
              <p className="leading-relaxed">
                Estos términos se rigen por las leyes aplicables en la
                jurisdicción donde opera Axon.app. Cualquier disputa será
                resuelta mediante arbitraje o en los tribunales competentes de
                dicha jurisdicción.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                11. Contacto
              </h3>{" "}
              <p className="leading-relaxed">
                Para preguntas sobre estos términos y condiciones, contáctenos
                en:{" "}
                <EmailLink
                  mailtoUrl="mailto:axonapp.info@gmail.com?subject=Consulta%20Legal%20-%20Términos%20y%20Condiciones%20Axon.App&body=Estimado%20equipo%20legal%20de%20Axon.App,%0A%0AMe%20dirijo%20a%20ustedes%20para%20realizar%20una%20consulta%20sobre%20los%20Términos%20y%20Condiciones%20de%20servicio:%0A%0ATipo%20de%20consulta%20(marque%20con%20X):%0A[%20]%20Dudas%20sobre%20derechos%20de%20propiedad%20intelectual%0A[%20]%20Consulta%20sobre%20limitaciones%20de%20responsabilidad%0A[%20]%20Preguntas%20sobre%20el%20uso%20de%20servicios%0A[%20]%20Resolución%20de%20disputas%0A[%20]%20Otro:%20__________________%0A%0ADetalles%20de%20mi%20consulta:%0A%0A%0A%0ANombre%20completo:%20%0AEmpresa/Organización:%20%0AEmail:%20%0ATeléfono:%20%0A%0AGracias%20por%20su%20tiempo%20y%20atención.%0A%0ASaludos%20cordiales,"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors underline"
                >
                  axonapp.info@gmail.com
                </EmailLink>
              </p>
              <p className="leading-relaxed mt-3 text-sm text-gray-400">
                <strong>Tiempo de respuesta:</strong> Responderemos a consultas
                legales dentro de 5 días hábiles.
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
                <strong>Versión:</strong> 3.0
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

EnhancedTermsModal.displayName = "EnhancedTermsModal";
