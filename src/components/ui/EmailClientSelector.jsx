import React from "react";

export const EmailClientSelector = React.memo(
  ({ emailData, onClose, isOpen }) => {
    // URLs para diferentes clientes de correo
    const getGmailUrl = () => {
      const params = new URLSearchParams({
        to: emailData.to,
        subject: emailData.subject,
        body: emailData.body,
      });
      return `https://mail.google.com/mail/?view=cm&fs=1&${params.toString()}`;
    };
    const getOutlookUrl = () => {
      const params = new URLSearchParams({
        to: emailData.to,
        subject: emailData.subject,
        body: emailData.body,
      });
      return `https://outlook.live.com/mail/0/deeplink/compose?${params.toString()}`;
    };

    const getMailtoUrl = () => {
      return `mailto:${emailData.to}?subject=${encodeURIComponent(
        emailData.subject
      )}&body=${encodeURIComponent(emailData.body)}`;
    };

    const handleClientSelection = (url, isExternal = false) => {
      if (isExternal) {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = url;
      }
      onClose();
    };

    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="email-selector-title"
      >
        <div
          className="bg-slate-800 rounded-xl max-w-md w-full shadow-2xl border border-blue-500/30"
          onClick={(e) => e.stopPropagation()}
        >
          {" "}
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/logo1.png"
                alt="Axon.App"
                className="w-10 h-10 rounded-lg"
              />
              <h3
                id="email-selector-title"
                className="text-xl font-bold text-white"
              >
                Elige tu cliente de correo
              </h3>
            </div>
            <p className="text-gray-400 text-sm">
              Selecciona dónde quieres redactar tu mensaje
            </p>
          </div>
          {/* Email preview */}
          <div className="p-4 bg-slate-900/50 border-b border-gray-700">
            <div className="text-xs text-gray-400 space-y-1">
              <p>
                <strong>Para:</strong> {emailData.to}
              </p>
              <p>
                <strong>Asunto:</strong> {emailData.subject}
              </p>
            </div>
          </div>{" "}
          {/* Client options - Solo Gmail y Outlook */}
          <div className="p-6 space-y-3">
            {/* Gmail */}
            <button
              onClick={() => handleClientSelection(getGmailUrl(), true)}
              className="w-full flex items-center p-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-4">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">Gmail</div>
                <div className="text-xs text-red-200">
                  Recomendado para cuentas @gmail.com
                </div>
              </div>
            </button>
            {/* Outlook */}
            <button
              onClick={() => handleClientSelection(getOutlookUrl(), true)}
              className="w-full flex items-center p-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-4">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#0078D4"
                    d="M21.5 4.5v15h-7v-7h7zm-8.5 0v15h-11.5v-15h11.5zm-10.5 1v13h9.5v-13h-9.5zm18 1v5h-5v-5h5z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">
                  Outlook / Hotmail
                </div>
                <div className="text-xs text-blue-200">
                  Para @outlook.com, @hotmail.com, @live.com
                </div>
              </div>
            </button>{" "}
            {/* Cliente predeterminado */}
            <button
              onClick={() => handleClientSelection(getMailtoUrl(), false)}
              className="w-full flex items-center p-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">
                  Cliente predeterminado
                </div>
                <div className="text-xs text-gray-300">
                  Aplicación de correo del sistema
                </div>
              </div>
            </button>
          </div>
          {/* Footer */}
          <div className="p-4 border-t border-gray-700 text-center">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }
);

EmailClientSelector.displayName = "EmailClientSelector";
