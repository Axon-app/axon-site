import { useCallback, useState } from "react";

/**
 * Hook personalizado para manejar la selección de cliente de correo
 * @returns {Object} Funciones y estado para el selector de correo
 */
export const useEmailSelector = () => {
  const [isEmailSelectorOpen, setIsEmailSelectorOpen] = useState(false);
  const [emailData, setEmailData] = useState(null);

  /**
   * Abre el selector de correo con los datos proporcionados
   * @param {Object} data - Datos del correo (to, subject, body)
   */
  const openEmailSelector = useCallback((data) => {
    setEmailData(data);
    setIsEmailSelectorOpen(true);
  }, []);

  /**
   * Cierra el selector de correo
   */
  const closeEmailSelector = useCallback(() => {
    setIsEmailSelectorOpen(false);
    setEmailData(null);
  }, []);

  /**
   * Extrae datos de un mailto URL y abre el selector
   * @param {string} mailtoUrl - URL mailto completa
   */
  const openEmailSelectorFromMailto = useCallback(
    (mailtoUrl) => {
      try {
        // Extraer componentes del mailto URL
        const url = new URL(mailtoUrl);
        const to = url.pathname;
        const params = new URLSearchParams(url.search);
        const emailData = {
          to,
          subject: params.get("subject") || "",
          body: params.get("body") || "",
        };

        openEmailSelector(emailData);
      } catch {
        // Fallback: abrir enlace directamente
        window.location.href = mailtoUrl;
      }
    },
    [openEmailSelector]
  );

  return {
    isEmailSelectorOpen,
    emailData,
    openEmailSelector,
    closeEmailSelector,
    openEmailSelectorFromMailto,
  };
};
