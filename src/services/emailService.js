/**
 * Servicio de contacto simplificado sin dependencias externas
 * Maneja formularios de contacto, cotizaciones y consultas
 */

// Configuración de contacto de la empresa
const CONTACT_CONFIG = {
  EMAILS: {
    PRIMARY: "axonapp.info@gmail.com",
    SECONDARY: "axonapp@outlook.es",
  },
  COMPANY_NAME: "Axon.app",
  RESPONSE_TIME: "24 horas",
};

/**
 * Valida los datos básicos de un formulario
 * @param {Object} formData - Datos del formulario
 * @returns {Object} - Resultado de la validación
 */
const validateFormData = (formData) => {
  const errors = [];

  if (!formData.name?.trim()) {
    errors.push("El nombre es requerido");
  }

  if (!formData.email?.trim()) {
    errors.push("El email es requerido");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.push("El formato del email no es válido");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Simula el procesamiento de formularios para demo
 * @param {string} type - Tipo: 'contact', 'quote', 'consultation'
 * @param {Object} formData - Datos del formulario
 * @returns {Promise<Object>} - Resultado simulado del envío
 */
export const sendUnifiedEmail = async (type, formData) => {
  // Validar datos básicos
  const validation = validateFormData(formData);
  if (!validation.isValid) {
    return { success: false, errors: validation.errors };
  }

  // Simular procesamiento
  return new Promise((resolve) => {
    setTimeout(() => {
      const timestamp = new Date().toLocaleString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      resolve({
        success: true,
        demo: true,
        type,
        data: {
          name: formData.name,
          email: formData.email,
          contactEmail: CONTACT_CONFIG.EMAILS.PRIMARY,
        },
        timestamp,
        message:
          "Formulario procesado correctamente. En producción se enviaría por email.",
      });
    }, 1200);
  });
};

/**
 * Función para enviar email de contacto general
 * @param {Object} formData - Datos del formulario de contacto
 * @returns {Promise<Object>} - Resultado del envío
 */
export const sendContactEmail = async (formData) => {
  return await sendUnifiedEmail("contact", formData);
};

/**
 * Función para enviar solicitud de propuesta
 * @param {Object} formData - Datos del formulario de propuesta
 * @returns {Promise<Object>} - Resultado del envío
 */
export const sendQuoteRequest = async (formData) => {
  return await sendUnifiedEmail("quote", formData);
};

/**
 * Función para enviar solicitud de consulta
 * @param {Object} formData - Datos del formulario de consulta
 * @returns {Promise<Object>} - Resultado del envío
 */
export const sendConsultationRequest = async (formData) => {
  return await sendUnifiedEmail("consultation", formData);
};

/**
 * Función para enviar email de confirmación al cliente
 * @param {string} _clientEmail - Email del cliente
 * @param {string} _type - Tipo de confirmación
 * @param {string} _serviceName - Nombre del servicio
 * @returns {Promise<Object>} - Resultado del envío
 */
export const sendClientConfirmation = async (
  _clientEmail,
  _type,
  _serviceName = ""
) => {
  // Simulación de confirmación
  return {
    success: true,
    demo: true,
    message: "Confirmación enviada (modo demo)",
  };
};
