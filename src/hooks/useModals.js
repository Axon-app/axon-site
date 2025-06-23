import { useState } from "react";

// Hook para manejar los modales
export const useModals = () => {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);

  return {
    // Estados
    contactModalOpen,
    quoteModalOpen,
    consultationModalOpen,

    // Funciones para abrir
    openContactModal: () => setContactModalOpen(true),
    openQuoteModal: () => setQuoteModalOpen(true),
    openConsultationModal: () => setConsultationModalOpen(true),

    // Funciones para cerrar
    closeContactModal: () => setContactModalOpen(false),
    closeQuoteModal: () => setQuoteModalOpen(false),
    closeConsultationModal: () => setConsultationModalOpen(false),

    // Cerrar todos
    closeAllModals: () => {
      setContactModalOpen(false);
      setQuoteModalOpen(false);
      setConsultationModalOpen(false);
    },
  };
};
