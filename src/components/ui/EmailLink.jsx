import { useEmailSelector } from "../../hooks/useEmailSelector";
import { EmailClientSelector } from "./EmailClientSelector";

/**
 * Componente de enlace de correo que abre un selector de cliente de correo
 * @param {Object} props - Props del componente
 * @param {string} props.to - Dirección de correo destinatario
 * @param {string} props.subject - Asunto del correo
 * @param {string} props.body - Cuerpo del correo
 * @param {string} props.children - Contenido del enlace
 * @param {string} props.className - Clases CSS adicionales
 * @param {string} props.mailtoUrl - URL mailto completa (alternativa a to, subject, body)
 */
export const EmailLink = ({
  to,
  subject = "",
  body = "",
  children,
  className = "",
  mailtoUrl,
  ...props
}) => {
  const {
    isEmailSelectorOpen,
    emailData,
    openEmailSelector,
    closeEmailSelector,
    openEmailSelectorFromMailto,
  } = useEmailSelector();

  const handleClick = (e) => {
    e.preventDefault();

    if (mailtoUrl) {
      openEmailSelectorFromMailto(mailtoUrl);
    } else {
      openEmailSelector({ to, subject, body });
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`${className} inline-flex items-center transition-colors`}
        type="button"
        {...props}
      >
        {children}
      </button>

      {isEmailSelectorOpen && emailData && (
        <EmailClientSelector
          emailData={emailData}
          isOpen={isEmailSelectorOpen}
          onClose={closeEmailSelector}
        />
      )}
    </>
  );
};
