import React from "react";
import { sendQuoteRequest } from "../../services/emailService";

// Funciones de validación y seguridad
const SecurityValidators = {
  // Sanitizar entrada para prevenir XSS
  sanitizeInput: (input) => {
    if (typeof input !== "string") return "";
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<[^>]*>/g, "")
      .replace(/javascript:/gi, "")
      .replace(/on\w+\s*=/gi, "");
    // Removido .trim() para permitir espacios normales
  },

  // Validar email con regex seguro
  validateEmail: (email) => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email) && email.length <= 254;
  },

  // Validar teléfono
  validatePhone: (phone) => {
    if (!phone) return true; // Campo opcional
    const phoneRegex = /^[+]?[0-9\s()-]{7,20}$/;
    return phoneRegex.test(phone);
  },

  // Validar nombre (solo letras, espacios, acentos)
  validateName: (name) => {
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
    return nameRegex.test(name);
  },

  // Validar ciudad
  validateCity: (city) => {
    const cityRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s,.-]{2,100}$/;
    return cityRegex.test(city);
  },

  // Detectar patrones de inyección SQL básicos
  detectSQLInjection: (input) => {
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/gi,
      /((%27)|('))((%6F)|o|(%4F))((%72)|r|(%52))/gi,
      /(((%3D)|(=))[^\n]*((%27)|(')|((%3B)|(;))))/gi,
      /((%27)|('))((%4F)|o|(%6F))((%52)|r|(%72))/gi,
    ];
    return sqlPatterns.some((pattern) => pattern.test(input));
  },

  // Validar longitud de campos
  validateLength: (value, min = 0, max = 1000) => {
    return value.length >= min && value.length <= max;
  },
};

export const QuoteRequestModal = React.memo(({ isOpen, onClose, _service }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    clientType: "",
    company: "",
    city: "",
    projectType: "", // Siempre inicia vacío
    description: "",
    additionalRequirements: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState(null);
  const [validationErrors, setValidationErrors] = React.useState({});
  const [securityError, setSecurityError] = React.useState("");

  // Calcular si el formulario está completo
  const isFormComplete = React.useMemo(() => {
    const requiredFields = [
      "name",
      "email",
      "clientType",
      "city",
      "projectType",
      "description",
    ];
    const hasRequiredFields = requiredFields.every((field) =>
      formData[field].trim()
    );
    const hasNoErrors =
      Object.keys(validationErrors).length === 0 && !securityError;
    return hasRequiredFields && hasNoErrors;
  }, [formData, validationErrors, securityError]);

  // Función para obtener campos faltantes y errores
  const getMissingFields = React.useMemo(() => {
    const missing = [];
    const errors = [];

    // Verificar campos requeridos
    if (!formData.name.trim()) missing.push("Nombre");
    if (!formData.email.trim()) missing.push("Email");
    if (!formData.clientType.trim()) missing.push("Tipo de Cliente");
    if (!formData.city.trim()) missing.push("Ciudad");
    if (!formData.projectType.trim()) missing.push("Tipo de Proyecto");
    if (!formData.description.trim()) missing.push("Descripción del Proyecto"); // Verificar errores de validación
    Object.entries(validationErrors).forEach(([, error]) => {
      if (error) errors.push(error);
    });
    return {
      missing,
      errors,
      hasIssues: missing.length > 0 || errors.length > 0,
    };
  }, [formData, validationErrors]);

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
  }, [isOpen, onClose]); // Reset form cuando se abre/cierra
  React.useEffect(() => {
    if (isOpen) {
      // Resetear completamente el formulario
      setFormData({
        name: "",
        email: "",
        phone: "",
        clientType: "",
        company: "",
        city: "",
        projectType: "", // Siempre inicia vacío para permitir selección manual
        description: "",
        additionalRequirements: "",
      });
      setSubmitStatus(null);
      setValidationErrors({});
      setSecurityError("");
    }
  }, [isOpen]);

  // Early return si no está abierto
  if (!isOpen) return null; // Manejar cambios en el formulario - VERSION DEBUG
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Debug: verificar si el evento llega
    if (typeof window !== "undefined" && window.console) {
      window.console.log("Input change:", name, value);
    }

    // Actualizar directamente sin validación para debug
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      return newData;
    });

    // Limpiar errores
    setSecurityError("");
    setValidationErrors({});
  }; // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSecurityError("");
    try {
      // Validación de campos
      const missing = getMissingFields;
      if (missing.missing.length > 0 || missing.errors.length > 0) {
        let errorMessage = "⚠️ Por favor completa la información faltante:\n\n";

        if (missing.missing.length > 0) {
          errorMessage += `📝 Campos requeridos:\n• ${missing.missing.join(
            "\n• "
          )}\n\n`;
        }

        if (missing.errors.length > 0) {
          errorMessage += `❌ Errores a corregir:\n• ${missing.errors.join(
            "\n• "
          )}\n\n`;
        }

        setSecurityError(errorMessage);
        return;
      }

      // 3. Validación adicional de longitud para prevenir ataques
      if (
        !SecurityValidators.validateLength(formData.name, 2, 50) ||
        !SecurityValidators.validateLength(formData.email, 5, 254) ||
        !SecurityValidators.validateLength(formData.description, 10, 2000)
      ) {
        setSecurityError(
          "Algunos campos tienen una longitud inválida. Por favor, revisa la información."
        );
        return;
      }

      // 4. Preparar datos para envío con sanitización final
      const sanitizedData = {
        name: SecurityValidators.sanitizeInput(formData.name.trim()),
        email: SecurityValidators.sanitizeInput(formData.email.trim()),
        phone: SecurityValidators.sanitizeInput(formData.phone.trim()),
        clientType: SecurityValidators.sanitizeInput(
          formData.clientType.trim()
        ),
        company: SecurityValidators.sanitizeInput(formData.company.trim()),
        city: SecurityValidators.sanitizeInput(formData.city.trim()),
        projectType: SecurityValidators.sanitizeInput(
          formData.projectType.trim()
        ),
        description: SecurityValidators.sanitizeInput(
          formData.description.trim()
        ),
        additionalRequirements: SecurityValidators.sanitizeInput(
          formData.additionalRequirements.trim()
        ),
        timestamp: new Date().toISOString(),
        formType: "quote-request",
      }; // Validación final antes del envío
      for (const [key, value] of Object.entries(sanitizedData)) {
        if (
          typeof value === "string" &&
          SecurityValidators.detectSQLInjection(value)
        ) {
          throw new Error(`Entrada inválida detectada en campo ${key}`);
        }
      } // 4. Enviar formulario de cotización
      const emailResult = await sendQuoteRequest(sanitizedData);

      if (!emailResult.success) {
        throw new Error(emailResult.error || "Error al enviar la propuesta");
      }
      setSubmitStatus("success");
      setTimeout(() => {
        onClose();
        // Reset form - NUNCA usar service.title para projectType
        setFormData({
          name: "",
          email: "",
          phone: "",
          clientType: "",
          company: "",
          city: "",
          projectType: "", // Siempre vacío - selección manual requerida
          description: "",
          additionalRequirements: "",
        });
        setValidationErrors({});
      }, 2000);
    } catch {
      // Error al enviar propuesta
      setSecurityError(
        "Error al enviar la propuesta. Por favor, intenta nuevamente o contáctanos directamente."
      );
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      <div className="bg-slate-800 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-blue-500/30 z-[10000] relative modal-content">
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 border-b border-gray-700 p-4 sm:p-6 flex items-center justify-between z-[10001]">
          <h2
            id="quote-modal-title"
            className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
          >
            Solicitar Propuesta
          </h2>{" "}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Cerrar solicitud de propuesta"
            type="button"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>{" "}
        </div>

        {/* Mensajes de Error de Seguridad */}
        {securityError && (
          <div className="mx-4 sm:mx-6 mb-4 p-4 bg-red-900/50 border border-red-500/50 rounded-lg">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="text-red-300 text-sm font-medium whitespace-pre-line">
                {securityError}
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-4 sm:p-6">
          {submitStatus === "success" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-400 mb-2">
                ¡Propuesta Enviada con Éxito!
              </h3>
              <p className="text-gray-300 mb-3">
                Hemos recibido tu solicitud de propuesta. Nuestro equipo la
                revisará y te contactará dentro de{" "}
                <strong>24 horas hábiles</strong> con una propuesta detallada.
              </p>
              <p className="text-sm text-gray-400">
                Revisa tu email (incluyendo spam) para la confirmación.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Información personal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {" "}
                <div>
                  {" "}
                  <label
                    htmlFor="quote-name"
                    className="text-blue-300 text-sm font-medium mb-2 block"
                  >
                    Nombre <span className="text-red-500">*</span>
                  </label>{" "}
                  <input
                    id="quote-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    autoComplete="name"
                    className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Tu nombre completo"
                    style={{
                      zIndex: 9999,
                      position: "relative",
                      pointerEvents: "auto",
                    }}
                  />
                  {validationErrors.name && (
                    <p className="text-red-400 text-xs mt-1">
                      {validationErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  {" "}
                  <label
                    htmlFor="quote-email"
                    className="text-blue-300 text-sm font-medium mb-2 block"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="quote-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    autoComplete="email"
                    className={`w-full p-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500/20 text-white transition-all ${
                      validationErrors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-600 focus:border-blue-500"
                    }`}
                    placeholder="tu@email.com"
                  />
                  {validationErrors.email && (
                    <p className="text-red-400 text-xs mt-1">
                      {validationErrors.email}
                    </p>
                  )}
                </div>
              </div>{" "}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="quote-phone"
                    className="text-blue-300 text-sm font-medium mb-2 block"
                  >
                    Teléfono
                  </label>
                  <input
                    id="quote-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    autoComplete="tel"
                    className={`w-full p-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500/20 text-white transition-all ${
                      validationErrors.phone
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-600 focus:border-blue-500"
                    }`}
                    placeholder="+57 300 123 4567"
                  />
                  {validationErrors.phone && (
                    <p className="text-red-400 text-xs mt-1">
                      {validationErrors.phone}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="quote-clientType"
                    className="text-blue-300 text-sm font-medium mb-2 block"
                  >
                    Tipo de Cliente <span className="text-red-500">*</span>
                  </label>{" "}
                  <select
                    id="quote-clientType"
                    name="clientType"
                    value={formData.clientType}
                    onChange={handleInputChange}
                    required
                    className={`w-full p-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500/20 text-white transition-all cursor-pointer ${
                      validationErrors.clientType
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-600 focus:border-blue-500"
                    }`}
                    style={{
                      zIndex: 1000,
                      position: "relative",
                    }}
                  >
                    <option
                      value=""
                      disabled
                      className="bg-slate-800 text-gray-400"
                    >
                      Selecciona tipo de cliente
                    </option>
                    <option value="empresa" className="bg-slate-800 text-white">
                      Empresa
                    </option>
                    <option
                      value="persona-natural"
                      className="bg-slate-800 text-white"
                    >
                      Persona Natural
                    </option>
                  </select>
                  {validationErrors.clientType && (
                    <p className="text-red-400 text-xs mt-1">
                      {validationErrors.clientType}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="quote-company"
                    className="text-blue-300 text-sm font-medium mb-2 block"
                  >
                    {formData.clientType === "empresa"
                      ? "Nombre de la Empresa"
                      : "Nombre/Razón Social"}
                  </label>
                  <input
                    id="quote-company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    autoComplete="organization"
                    className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white transition-all"
                    placeholder={
                      formData.clientType === "empresa"
                        ? "Nombre de tu empresa"
                        : "Tu nombre o razón social"
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="quote-city"
                    className="text-blue-300 text-sm font-medium mb-2 block"
                  >
                    Ciudad <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="quote-city"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className={`w-full p-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500/20 text-white transition-all ${
                      validationErrors.city
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-600 focus:border-blue-500"
                    }`}
                    placeholder="Bogotá, Medellín, Cali..."
                  />
                  {validationErrors.city && (
                    <p className="text-red-400 text-xs mt-1">
                      {validationErrors.city}
                    </p>
                  )}
                </div>
              </div>{" "}
              <div>
                <label className="text-blue-300 text-sm font-medium mb-2 block">
                  Tipo de Proyecto <span className="text-red-500">*</span>
                </label>{" "}
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  style={{
                    zIndex: 9999,
                    position: "relative",
                    pointerEvents: "auto",
                  }}
                >
                  <option
                    value=""
                    disabled
                    className="bg-slate-800 text-gray-400"
                  >
                    Selecciona un tipo de proyecto
                  </option>
                  <option
                    value="Desarrollo Web Full-Stack"
                    className="bg-slate-800 text-white"
                  >
                    Desarrollo Web Full-Stack
                  </option>
                  <option
                    value="Aplicaciones Móviles"
                    className="bg-slate-800 text-white"
                  >
                    Aplicaciones Móviles
                  </option>
                  <option
                    value="Sistemas de Gestión"
                    className="bg-slate-800 text-white"
                  >
                    Sistemas de Gestión
                  </option>
                  <option
                    value="E-commerce"
                    className="bg-slate-800 text-white"
                  >
                    E-commerce
                  </option>
                  <option
                    value="APIs y Microservicios"
                    className="bg-slate-800 text-white"
                  >
                    APIs y Microservicios
                  </option>{" "}
                  <option
                    value="Marketing Digital"
                    className="bg-slate-800 text-white"
                  >
                    Marketing Digital
                  </option>
                  <option
                    value="Soporte Hardware y Software"
                    className="bg-slate-800 text-white"
                  >
                    Soporte Hardware y Software
                  </option>
                  <option
                    value="Migración de Sistemas"
                    className="bg-slate-800 text-white"
                  >
                    Migración de Sistemas
                  </option>
                  <option
                    value="Integración de Sistemas"
                    className="bg-slate-800 text-white"
                  >
                    Integración de Sistemas
                  </option>
                  <option
                    value="Automatización de Procesos"
                    className="bg-slate-800 text-white"
                  >
                    Automatización de Procesos
                  </option>
                  <option
                    value="Análisis de Datos"
                    className="bg-slate-800 text-white"
                  >
                    Análisis de Datos
                  </option>
                  <option value="Otro" className="bg-slate-800 text-white">
                    Otro
                  </option>
                </select>
                {validationErrors.projectType && (
                  <p className="text-red-400 text-xs mt-1">
                    {validationErrors.projectType}
                  </p>
                )}
              </div>
              <div>
                <label className="text-blue-300 text-sm font-medium mb-2 block">
                  Descripción del Proyecto{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className={`w-full p-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500/20 text-white transition-all resize-none ${
                    validationErrors.description
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-600 focus:border-blue-500"
                  }`}
                  placeholder="Describe detalladamente tu proyecto, objetivos y requisitos específicos..."
                />
                {validationErrors.description && (
                  <p className="text-red-400 text-xs mt-1">
                    {validationErrors.description}
                  </p>
                )}
              </div>
              <div>
                <label className="text-blue-300 text-sm font-medium mb-2 block">
                  Requerimientos Adicionales
                </label>
                <textarea
                  name="additionalRequirements"
                  value={formData.additionalRequirements}
                  onChange={handleInputChange}
                  rows="3"
                  className={`w-full p-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500/20 text-white transition-all resize-none ${
                    validationErrors.additionalRequirements
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-600 focus:border-blue-500"
                  }`}
                  placeholder="Integraciones específicas, funcionalidades especiales, restricciones técnicas, etc."
                />
                {validationErrors.additionalRequirements && (
                  <p className="text-red-400 text-xs mt-1">
                    {validationErrors.additionalRequirements}
                  </p>
                )}
              </div>{" "}
              {submitStatus === "error" && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                  <p className="text-red-400 text-sm">
                    <strong>Error:</strong> Por favor verifica que todos los
                    campos requeridos estén completos y sean válidos. Si el
                    problema persiste, contáctanos directamente.
                  </p>
                </div>
              )}
              {/* Estado del formulario con validación paso a paso */}
              {isFormComplete ? (
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-5 h-5 text-green-400 mr-2 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-green-300 text-sm font-medium">
                      ✅ Formulario completo y listo para enviar
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                  <div className="flex items-start mb-2">
                    <svg
                      className="w-5 h-5 text-orange-400 mr-2 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="flex-1">
                      <span className="text-orange-300 text-sm font-medium block mb-2">
                        📝 Información pendiente para completar el formulario
                      </span>

                      {/* Campos faltantes */}
                      {getMissingFields.missing.length > 0 && (
                        <div className="mb-3">
                          <p className="text-orange-200 text-xs font-medium mb-1">
                            Campos requeridos faltantes:
                          </p>
                          <ul className="text-orange-100 text-xs space-y-1">
                            {getMissingFields.missing.map((field, index) => (
                              <li key={index} className="flex items-center">
                                <span className="w-1 h-1 bg-orange-400 rounded-full mr-2"></span>
                                {field}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Errores de validación */}
                      {getMissingFields.errors.length > 0 && (
                        <div className="mb-3">
                          <p className="text-red-200 text-xs font-medium mb-1">
                            Errores a corregir:
                          </p>
                          <ul className="text-red-100 text-xs space-y-1">
                            {getMissingFields.errors.map((error, index) => (
                              <li key={index} className="flex items-center">
                                <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                                {error}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}{" "}
              <div className="border-t border-gray-700 pt-4">
                {/* Sistema de seguridad integrado */}
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-300 font-semibold mb-2">
                  💡 Información sobre Cotizaciones
                </h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Propuesta gratuita y sin compromiso</li>
                  <li>• Respuesta dentro de 24 horas hábiles</li>
                  <li>• Propuesta detallada con cronograma</li>
                  <li>• Consulta inicial incluida en la propuesta</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all duration-300 font-semibold border border-gray-600"
                >
                  Cancelar
                </button>{" "}
                <button
                  type="submit"
                  disabled={isSubmitting || !isFormComplete}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isSubmitting || !isFormComplete
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg hover:shadow-xl"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    "Solicitar Propuesta"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
});

QuoteRequestModal.displayName = "QuoteRequestModal";
