import React, { useState } from "react";
import { UnifiedContactForm } from "./components/forms/UnifiedContactForm";
import {
  AnimatedCounterWithProgress,
  BlogModal,
  BlogSection,
  EnhancedCookiesModal,
  EnhancedPrivacyModal,
  EnhancedTermsModal,
  FloatingBlogButton,
  ServiceCard,
  ServiceDetailModal,
  TestimonialsBanner,
} from "./components/index";
import {
  ConsultationModal,
  ContactModal,
  QuoteModal,
} from "./components/modals/UnifiedModals";
import { ClientsSection } from "./components/sections/ClientsSection";
import { EmailLink } from "./components/ui/EmailLink";
import { technologies, testimonials } from "./data/content";
import { servicesData } from "./data/servicesData";
import { useModals } from "./hooks/useModals";
import logo1 from "/logo1.png";
import logo231 from "/logo231.png";

const App = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showCookiesModal, setShowCookiesModal] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Estados para el blog
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);

  // Hook para manejar los modales unificados
  const {
    contactModalOpen,
    quoteModalOpen,
    consultationModalOpen,
    openContactModal,
    openQuoteModal,
    openConsultationModal,
    closeContactModal,
    closeQuoteModal,
    closeConsultationModal,
  } = useModals();
  // Efecto para detectar la sección activa al hacer scroll
  React.useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "services",
        "technologies",
        "testimonials",
        "blog",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const { offsetTop, offsetHeight } = element;
              if (
                scrollPosition >= offsetTop &&
                scrollPosition < offsetTop + offsetHeight
              ) {
                setActiveSection(section);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Efecto para mostrar el banner de cookies
  React.useEffect(() => {
    const cookiesAccepted = localStorage.getItem("axon-cookies-accepted");
    if (!cookiesAccepted) {
      // Mostrar el banner después de 2 segundos para no ser intrusivo
      const timer = setTimeout(() => {
        setShowCookieBanner(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleLogoError = () => {
    setLogoError(true);
  };
  const handleOpenServiceModal = (serviceId) => {
    const serviceData = servicesData[serviceId];
    if (serviceData) {
      setSelectedService(serviceData);
      setShowServiceModal(true);
    }
  };

  const handleCloseServiceModal = () => {
    setShowServiceModal(false);
    setSelectedService(null);
  };
  const handleOpenQuoteModal = () => {
    openQuoteModal();
  };
  const handleOpenConsultationModal = () => {
    openConsultationModal();
  };

  // Funciones para el blog
  const handleOpenBlogModal = (post) => {
    setSelectedBlogPost(post);
    setShowBlogModal(true);
  };

  const handleCloseBlogModal = () => {
    setShowBlogModal(false);
    setSelectedBlogPost(null);
  };

  const scrollToBlog = () => {
    scrollToSection('blog');
  };

  // Función para navegación suave a las secciones
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Offset para el navbar fijo
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Logo SVG como fallback
  const LogoSVG = ({ className }) => (
    <div
      className={`bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 rounded-lg flex items-center justify-center text-white font-bold ${className}`}
    >
      <span className="text-2xl">⚡</span>
    </div>
  );  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white font-sans overflow-x-hidden">
      {/* Professional Navbar */}
      <nav className="fixed w-full z-50 glass-effect navbar-blur shadow-2xl border-b border-gray-800/50 nav-slide-in">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo Section */}
            <button
              onClick={() => scrollToSection("hero")}
              className="flex items-center group transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={logo1}
                  alt="Axon Logo Original"
                  className="h-16 w-16 object-contain logo-rotate-1 rounded-lg transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/25"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <img
                  src={logo231}
                  alt="Axon.App Logo 3D"
                  className="h-20 w-auto object-contain logo-rotate-2 rounded-lg transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/25"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            </button>{" "}
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <NavLink
                href="#hero"
                isActive={activeSection === "hero"}
                scrollToSection={scrollToSection}
              >
                <span className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span>Inicio</span>
                </span>
              </NavLink>
              <NavLink
                href="#about"
                isActive={activeSection === "about"}
                scrollToSection={scrollToSection}
              >
                <span className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Nosotros</span>
                </span>
              </NavLink>
              <NavLink
                href="#services"
                isActive={activeSection === "services"}
                scrollToSection={scrollToSection}
              >
                <span className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Servicios</span>
                </span>
              </NavLink>
              <NavLink
                href="#technologies"
                isActive={activeSection === "technologies"}
                scrollToSection={scrollToSection}
              >
                <span className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Tecnologías</span>
                </span>
              </NavLink>
              <NavLink
                href="#testimonials"
                isActive={activeSection === "testimonials"}
                scrollToSection={scrollToSection}
              >
                <span className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />                  </svg>
                  <span>Testimonios</span>
                </span>
              </NavLink>
              <NavLink
                href="#blog"
                isActive={activeSection === "blog"}
                scrollToSection={scrollToSection}
              >
                <span className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Blog</span>
                </span>
              </NavLink>
              <NavLink
                href="#contact"
                isActive={activeSection === "contact"}
                scrollToSection={scrollToSection}
              >
                <span className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>Contacto</span>
                </span>
              </NavLink>
            </div>
            {/* CTA Button & Mobile Menu Toggle */}
            <div className="flex items-center space-x-4">
              {/* CTA Button - Hidden on small screens */}
              <button
                onClick={handleOpenQuoteModal}
                className="hidden md:block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-6 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 border border-blue-500/20"
              >
                <span className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>Propuesta Personalizada</span>
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="lg:hidden flex items-center space-x-2 p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
                aria-label="Toggle mobile menu"
              >
                <svg
                  className={`w-6 h-6 transition-transform duration-300 ${
                    showMenu ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {showMenu ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
                <span className="text-sm font-medium">
                  {showMenu ? "Cerrar" : "Menú"}
                </span>
              </button>
            </div>
          </div>

          {/* Enhanced Mobile Menu */}
          <div
            className={`lg:hidden transition-all duration-300 ease-in-out ${
              showMenu ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <div className="py-4 space-y-2 border-t border-gray-800/50 menu-slide">
              <NavLink
                href="#hero"
                mobile
                onClick={() => setShowMenu(false)}
                isActive={activeSection === "hero"}
                scrollToSection={scrollToSection}
              >
                <span className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span>Inicio</span>
                </span>
              </NavLink>
              <NavLink
                href="#about"
                mobile
                onClick={() => setShowMenu(false)}
                isActive={activeSection === "about"}
                scrollToSection={scrollToSection}
              >
                <span className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Nosotros</span>
                </span>
              </NavLink>
              <NavLink
                href="#services"
                mobile
                onClick={() => setShowMenu(false)}
                isActive={activeSection === "services"}
                scrollToSection={scrollToSection}
              >
                <span className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Servicios</span>
                </span>
              </NavLink>
              <NavLink
                href="#technologies"
                mobile
                onClick={() => setShowMenu(false)}
                isActive={activeSection === "technologies"}
                scrollToSection={scrollToSection}
              >
                <span className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Tecnologías</span>
                </span>
              </NavLink>
              <NavLink
                href="#testimonials"
                mobile
                onClick={() => setShowMenu(false)}
                isActive={activeSection === "testimonials"}
                scrollToSection={scrollToSection}
              >
                <span className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>                  <span>Testimonios</span>
                </span>
              </NavLink>
              <NavLink
                href="#blog"
                mobile
                onClick={() => setShowMenu(false)}
                isActive={activeSection === "blog"}
                scrollToSection={scrollToSection}
              >
                <span className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Blog</span>
                </span>
              </NavLink>
              <NavLink
                href="#contact"
                mobile
                onClick={() => setShowMenu(false)}
                isActive={activeSection === "contact"}
                scrollToSection={scrollToSection}
              >
                <span className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>Contacto</span>
                </span>
              </NavLink>

              {/* Mobile CTA Button */}
              <div className="pt-4 border-t border-gray-800/30">
                <button
                  onClick={() => {
                    handleOpenQuoteModal();
                    setShowMenu(false);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>Propuesta Personalizada</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section
        id="hero"
        className="relative flex items-center justify-center min-h-screen text-center p-8 overflow-hidden pt-20 md:pt-0"
      >
        <div className="absolute inset-0 z-0 opacity-10">
          {/* Fondo de partículas o formas futuristas con movimiento dinámico */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-500 rounded-full mix-blend-screen animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-green-500 rounded-full mix-blend-screen animate-blob"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
          {/* Logo de Axon.App en la sección Hero */}
          <div className="mb-8 animate-fadeInScale">
            {!logoError ? (
              <img
                src={logo1}
                alt="Axon.App Logo"
                className="h-20 md:h-28 w-auto mx-auto"
                onError={handleLogoError}
              />
            ) : (
              <LogoSVG className="h-20 md:h-28 w-20 md:w-28 mx-auto" />
            )}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight animate-fadeInUp text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
            Desarrollamos el Futuro.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 animate-fadeInUp delay-200">
            Soluciones de software y aplicaciones que transforman ideas en
            realidad.
          </p>
          <a
            href="#services"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 animate-bounceIn delay-400"
          >
            Explorar Servicios
          </a>
        </div>
      </section>
      {/* About Us Section - Mission & Vision */}
      <section
        id="about"
        className="py-20 md:py-32 bg-gray-900 bg-opacity-70 backdrop-blur-md relative overflow-hidden"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-blue-500/10 border border-blue-500/30 rounded-full px-6 py-3 mb-6">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse mr-3"></div>
              <span className="text-blue-300 text-sm font-medium uppercase tracking-wider">Quiénes Somos</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
              Nuestra Esencia
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Transformamos ideas en soluciones digitales de clase mundial, impulsando el crecimiento y éxito de nuestros clientes
            </p>
          </div>

          {/* Mission & Vision Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {/* Mission */}
            <div className="group bg-gradient-to-br from-blue-900/30 to-cyan-900/20 backdrop-blur-sm rounded-3xl p-8 border border-blue-400/20 hover:border-blue-400/50 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-5 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-blue-300 group-hover:text-blue-200 transition-colors">
                  Nuestra Misión
                </h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors">
                Democratizar la tecnología de vanguardia, creando soluciones digitales accesibles e innovadoras que impulsen el crecimiento exponencial de nuestros clientes. Nos comprometemos a entregar productos de software excepcionales que transformen ideas ambiciosas en realidades digitales exitosas.
              </p>
            </div>

            {/* Vision */}
            <div className="group bg-gradient-to-br from-purple-900/30 to-pink-900/20 backdrop-blur-sm rounded-3xl p-8 border border-purple-400/20 hover:border-purple-400/50 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-5 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-purple-300 group-hover:text-purple-200 transition-colors">
                  Nuestra Visión
                </h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors">
                Ser la empresa líder en desarrollo de software personalizado en Latinoamérica, reconocida mundialmente por nuestra excelencia técnica, innovación disruptiva y capacidad excepcional de anticipar y moldear las necesidades del mercado digital global.
              </p>
            </div>
          </div>

          {/* Strategic Pillars */}
          <div className="bg-gradient-to-r from-gray-800/40 via-gray-700/30 to-gray-800/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-600/30 mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                Pilares Estratégicos
              </h3>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                Nuestra roadmap hacia la excelencia tecnológica y el liderazgo en innovación
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Immediate Excellence */}
              <div className="space-y-6">
                <div className="flex items-center mb-8">
                  <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mr-5">
                    <span className="text-xl">⚡</span>
                  </div>
                  <h4 className="text-2xl font-bold text-green-300">
                    Excelencia Inmediata
                  </h4>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start group">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-3 mr-4 group-hover:scale-150 transition-transform"></div>
                    <span className="text-gray-300 text-lg group-hover:text-green-200 transition-colors">
                      Equipo especializado de desarrolladores senior y arquitectos de software
                    </span>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-3 mr-4 group-hover:scale-150 transition-transform"></div>
                    <span className="text-gray-300 text-lg group-hover:text-green-200 transition-colors">
                      Metodologías ágiles avanzadas y procesos DevOps optimizados
                    </span>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-3 mr-4 group-hover:scale-150 transition-transform"></div>
                    <span className="text-gray-300 text-lg group-hover:text-green-200 transition-colors">
                      Portafolio robusto de proyectos de alta complejidad y rendimiento
                    </span>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-3 mr-4 group-hover:scale-150 transition-transform"></div>
                    <span className="text-gray-300 text-lg group-hover:text-green-200 transition-colors">
                      Alianzas estratégicas con líderes tecnológicos globales
                    </span>
                  </div>
                </div>
              </div>

              {/* Future Innovation */}
              <div className="space-y-6">
                <div className="flex items-center mb-8">
                  <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mr-5">
                    <span className="text-xl">�</span>
                  </div>
                  <h4 className="text-2xl font-bold text-cyan-300">
                    Innovación Continua
                  </h4>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start group">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-3 mr-4 group-hover:scale-150 transition-transform"></div>
                    <span className="text-gray-300 text-lg group-hover:text-cyan-200 transition-colors">
                      Referente mundial en soluciones de Inteligencia Artificial y Machine Learning
                    </span>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-3 mr-4 group-hover:scale-150 transition-transform"></div>
                    <span className="text-gray-300 text-lg group-hover:text-cyan-200 transition-colors">
                      Expansión estratégica a mercados internacionales clave
                    </span>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-3 mr-4 group-hover:scale-150 transition-transform"></div>
                    <span className="text-gray-300 text-lg group-hover:text-cyan-200 transition-colors">
                      Ecosistema de productos SaaS innovadores y escalables
                    </span>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-3 mr-4 group-hover:scale-150 transition-transform"></div>
                    <span className="text-gray-300 text-lg group-hover:text-cyan-200 transition-colors">
                      Centro de excelencia con talentos especializados de élite
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12 pt-8 border-t border-gray-600/30">
              <p className="text-lg text-gray-300 mb-6">
                <span className="text-green-400 font-semibold">¿Listo para formar parte de nuestro éxito?</span> Únete a empresas líderes que ya confían en nosotros
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25">
                  🚀 Iniciar Mi Proyecto
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 font-bold rounded-2xl transition-all duration-300 transform hover:scale-105">
                  📞 Agendar Consulta Gratuita
                </button>
              </div>
            </div>
          </div>

          {/* Values Section Enhanced */}
          <div>
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                Nuestros Valores Fundamentales
              </h3>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Los principios que guían cada decisión y definen nuestra cultura organizacional
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group text-center p-8 bg-gradient-to-br from-orange-900/20 to-yellow-900/20 rounded-3xl border border-orange-400/20 hover:border-orange-400/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">💡</div>
                <h4 className="text-2xl font-bold text-orange-300 mb-4 group-hover:text-orange-200 transition-colors">
                  Innovación Disruptiva
                </h4>
                <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors">
                  Pioneros en adoptar y dominar tecnologías emergentes que revolucionan industrias
                </p>
              </div>
              <div className="group text-center p-8 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-3xl border border-blue-400/20 hover:border-blue-400/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🤝</div>
                <h4 className="text-2xl font-bold text-blue-300 mb-4 group-hover:text-blue-200 transition-colors">
                  Partnership Estratégico
                </h4>
                <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors">
                  Construimos relaciones duraderas como socios tecnológicos de confianza
                </p>
              </div>
              <div className="group text-center p-8 bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-3xl border border-green-400/20 hover:border-green-400/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">⭐</div>
                <h4 className="text-2xl font-bold text-green-300 mb-4 group-hover:text-green-200 transition-colors">
                  Excelencia Sin Límites
                </h4>
                <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors">
                  Estándar de calidad excepcional que supera expectativas en cada entrega
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section - Professional Design */}
      <section
        id="services"
        className="py-20 md:py-32 bg-gradient-to-br from-gray-800 via-gray-900 to-slate-900 relative overflow-hidden"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 animate-fadeIn">
              Nuestros Servicios
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              Soluciones tecnológicas integrales para impulsar tu negocio hacia
              el futuro digital
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto rounded-full"></div>
          </div>

          {/* Main Services Grid - Uniform Layout */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-cyan-300 mb-8 flex items-center justify-center">
              <span className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center mr-3 text-sm">
                💻
              </span>
              Desarrollo & Tecnología Core
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard
                icon="🌐"
                title="Desarrollo Web Full-Stack"
                description="Aplicaciones web modernas con React, Node.js, Python y tecnologías de vanguardia. Desde landing pages hasta plataformas enterprise."
                onOpenModal={handleOpenServiceModal}
                id="desarrollo-web"
              />
              <ServiceCard
                icon="📱"
                title="Apps Móviles Nativas"
                description="Desarrollo nativo para iOS y Android, React Native y Flutter. Experiencias móviles que conquistan usuarios."
                onOpenModal={handleOpenServiceModal}
                id="apps-moviles"
              />{" "}
              <ServiceCard
                icon="📢"
                title="Marketing Digital"
                description="Estrategias digitales integrales, campañas publicitarias, SEO y gestión de redes sociales."
                onOpenModal={handleOpenServiceModal}
                id="marketing-digital"
              />
              <ServiceCard
                icon="🔗"
                title="APIs & Integración"
                description="APIs RESTful y GraphQL robustas. Integración con sistemas empresariales y servicios de terceros."
                onOpenModal={handleOpenServiceModal}
                id="apis-integracion"
              />
              <ServiceCard
                icon="🤖"
                title="Inteligencia Artificial"
                description="Machine Learning, NLP, Computer Vision. Automatización inteligente para tu negocio."
                onOpenModal={handleOpenServiceModal}
                id="inteligencia-artificial"
              />{" "}
              <ServiceCard
                icon="�"
                title="Soporte Hardware y Software"
                description="Soporte técnico integral, mantenimiento de equipos y asistencia en software empresarial."
                onOpenModal={handleOpenServiceModal}
                id="soporte-hardware-software"
              />
            </div>
          </div>

          {/* Design & Strategy Services */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-green-300 mb-8 flex items-center justify-center">
              <span className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mr-3 text-sm">
                🎨
              </span>
              Diseño & Estrategia Digital
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ServiceCard
                icon="✨"
                title="UI/UX Design"
                description="Interfaces intuitivas y experiencias memorables. Diseño centrado en el usuario con metodologías ágiles."
                onOpenModal={handleOpenServiceModal}
                id="ui-ux-design"
              />
              <ServiceCard
                icon="🎯"
                title="Estrategia Digital"
                description="Consultoría tecnológica, roadmaps de producto y transformación digital empresarial."
                onOpenModal={handleOpenServiceModal}
                id="estrategia-digital"
              />
              <ServiceCard
                icon="📊"
                title="Data Analytics"
                description="Business Intelligence, dashboards interactivos y análisis predictivo para toma de decisiones."
                onOpenModal={handleOpenServiceModal}
                id="data-analytics"
              />
              <ServiceCard
                icon="🔄"
                title="DevOps & Automatización"
                description="CI/CD, monitoreo, testing automatizado y optimización de procesos de desarrollo."
                onOpenModal={handleOpenServiceModal}
                id="devops-automatizacion"
              />
            </div>
          </div>

          {/* Emerging Technologies */}
          <div className="bg-gradient-to-r from-slate-800/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-600/30">
            <h3 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-8">
              🌟 Tecnologías Emergentes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-800/40 rounded-xl border border-gray-600/20 hover:border-yellow-400/40 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-4xl mb-4">🔗</div>
                <h4 className="text-lg font-bold text-yellow-300 mb-2">
                  Blockchain & Web3
                </h4>
                <p className="text-gray-300 text-sm">
                  Smart contracts, DApps y soluciones descentralizadas
                </p>
              </div>
              <div className="text-center p-6 bg-gray-800/40 rounded-xl border border-gray-600/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-4xl mb-4">🥽</div>
                <h4 className="text-lg font-bold text-purple-300 mb-2">
                  AR/VR & Metaverse
                </h4>
                <p className="text-gray-300 text-sm">
                  Experiencias inmersivas y realidad extendida
                </p>
              </div>
              <div className="text-center p-6 bg-gray-800/40 rounded-xl border border-gray-600/20 hover:border-green-400/40 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-4xl mb-4">🌱</div>
                <h4 className="text-lg font-bold text-green-300 mb-2">
                  IoT & Edge Computing
                </h4>
                <p className="text-gray-300 text-sm">
                  Dispositivos conectados y computación distribuida
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold text-white mb-6">
              ¿Listo para transformar tu idea en realidad?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Nuestro equipo de expertos está preparado para llevar tu proyecto
              al siguiente nivel
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Iniciar Proyecto
              </a>
              <a
                href="#technologies"
                className="bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Ver Tecnologías
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Tech Stack Section - Diseño Elegante y Compacto */}
      <section
        id="technologies"
        className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header Minimalista */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2 mb-4 border border-gray-700/50">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-gray-300 text-sm font-medium">
                Tech Stack
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Tecnologías que
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                {" "}
                Dominamos
              </span>
            </h2>

            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Stack moderno para soluciones escalables y de alto rendimiento
            </p>
          </div>

          {/* Tech Grid Compacto y Elegante */}
          <div className="max-w-6xl mx-auto">
            {/* Primera fila - Frontend & Frameworks */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">
                  Frontend & Frameworks
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-blue-400/50 to-transparent ml-4"></div>
              </div>
              <div className="flex flex-wrap gap-3">
                {technologies
                  .filter((tech) =>
                    ["Frontend", "Programming"].includes(tech.category)
                  )
                  .map((tech) => (
                    <div
                      key={tech.name}
                      className="group flex items-center bg-gray-800/40 hover:bg-gray-700/60 backdrop-blur-sm rounded-lg px-4 py-3 border border-gray-700/30 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
                    >
                      <span className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-300">
                        {tech.icon}
                      </span>
                      <div>
                        <div className="text-white font-medium text-sm">
                          {tech.name}
                        </div>
                        <div
                          className={`text-xs ${
                            tech.level === "Expert"
                              ? "text-emerald-400"
                              : "text-blue-400"
                          }`}
                        >
                          {tech.level}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Segunda fila - Backend & APIs */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">
                  Backend & APIs
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-emerald-400/50 to-transparent ml-4"></div>
              </div>
              <div className="flex flex-wrap gap-3">
                {technologies
                  .filter((tech) => ["Backend", "API"].includes(tech.category))
                  .map((tech) => (
                    <div
                      key={tech.name}
                      className="group flex items-center bg-gray-800/40 hover:bg-gray-700/60 backdrop-blur-sm rounded-lg px-4 py-3 border border-gray-700/30 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105"
                    >
                      <span className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-300">
                        {tech.icon}
                      </span>
                      <div>
                        <div className="text-white font-medium text-sm">
                          {tech.name}
                        </div>
                        <div
                          className={`text-xs ${
                            tech.level === "Expert"
                              ? "text-emerald-400"
                              : "text-blue-400"
                          }`}
                        >
                          {tech.level}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Tercera fila - Infrastructure */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">
                  Infrastructure & Data
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-purple-400/50 to-transparent ml-4"></div>
              </div>
              <div className="flex flex-wrap gap-3">
                {technologies
                  .filter((tech) =>
                    ["Cloud", "DevOps", "Database", "Cache", "IA/ML"].includes(
                      tech.category
                    )
                  )
                  .map((tech) => (
                    <div
                      key={tech.name}
                      className="group flex items-center bg-gray-800/40 hover:bg-gray-700/60 backdrop-blur-sm rounded-lg px-4 py-3 border border-gray-700/30 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
                    >
                      <span className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-300">
                        {tech.icon}
                      </span>
                      <div>
                        <div className="text-white font-medium text-sm">
                          {tech.name}
                        </div>
                        <div
                          className={`text-xs ${
                            tech.level === "Expert"
                              ? "text-emerald-400"
                              : "text-blue-400"
                          }`}
                        >
                          {tech.level}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Stats compactos y CTA */}
            <div className="flex flex-col md:flex-row items-center justify-between mt-12 pt-8 border-t border-gray-800/50">
              {/* Stats minimalistas */}
              <div className="flex items-center space-x-8 mb-6 md:mb-0">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">20+</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    Tecnologías
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">5+</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    Años Exp
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">100%</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    Actualizados
                  </div>
                </div>
              </div>

              {/* CTA compacto */}
              <div className="flex space-x-3">
                {" "}
                <button
                  onClick={() => openQuoteModal()}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm"
                >
                  Propuesta
                </button>
                <button
                  onClick={() => openConsultationModal()}
                  className="bg-transparent border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 text-sm"
                >
                  Consulta
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Counter Section - Logros y Proyectos */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-800 to-slate-800 relative overflow-hidden">
        {/* Efectos de fondo */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gray-700/30 backdrop-blur-sm rounded-full px-4 py-2 mb-4 border border-gray-600/30">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-gray-300 text-sm font-medium">
                Nuestros Logros
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Proyectos que
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                {" "}
                Transforman
              </span>
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto">
              Cada número representa la confianza de nuestros clientes y nuestro
              compromiso con la excelencia
            </p>
          </div>

          {/* Contadores Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {/* Proyectos Completados */}
            <AnimatedCounterWithProgress
              end={150}
              suffix="+"
              duration={2500}
              title="Proyectos"
              subtitle="Completados"
              progressColor="from-blue-500 to-cyan-500"
              progressWidth={80}
              hoverColor="blue-500"
            />

            {/* Clientes Satisfechos */}
            <AnimatedCounterWithProgress
              end={120}
              suffix="+"
              duration={2200}
              title="Clientes"
              subtitle="Satisfechos"
              progressColor="from-emerald-500 to-green-500"
              progressWidth={100}
              hoverColor="emerald-500"
            />

            {/* Años de Experiencia */}
            <AnimatedCounterWithProgress
              end={5}
              suffix="+"
              duration={1800}
              title="Años"
              subtitle="Experiencia"
              progressColor="from-purple-500 to-pink-500"
              progressWidth={75}
              hoverColor="purple-500"
            />

            {/* Uptime/Disponibilidad */}
            <AnimatedCounterWithProgress
              end={99.9}
              suffix="%"
              duration={3000}
              decimals={1}
              title="Uptime"
              subtitle="Disponibilidad"
              progressColor="from-amber-500 to-orange-500"
              progressWidth={99.9}
              hoverColor="amber-500"
            />
          </div>

          {/* Logros adicionales en formato horizontal */}
          <div className="mt-12 bg-gradient-to-r from-gray-800/30 to-gray-700/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">
                    Respuesta &lt; 24h
                  </div>
                  <div className="text-sm text-gray-400">Garantizada</div>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">
                    100% Seguro
                  </div>
                  <div className="text-sm text-gray-400">SSL & Cifrado</div>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">
                    Soporte 24/7
                  </div>
                  <div className="text-sm text-gray-400">Técnico Dedicado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>      {/* Testimonials Section */}      <section
        id="testimonials"
        className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-gray-700/50">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-gray-300 font-medium">Testimonios</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Lo que Dicen Nuestros
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Clientes
              </span>
            </h2>

            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              La satisfacción de nuestros clientes es nuestra mejor carta de
              presentación. Descubre cómo hemos transformado sus negocios con
              soluciones tecnológicas innovadoras.
            </p>
          </div>          {/* Testimonials Banner */}
          <TestimonialsBanner testimonials={testimonials} />          {/* Clients Section */}
          <div className="mt-20">
            <ClientsSection />
          </div>

          {/* Blog Section */}
          <div className="mt-20">
            <BlogSection onOpenBlogModal={handleOpenBlogModal} />
          </div>

          {/* Stats Row */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                4.9/5
              </div>
              <div className="text-gray-400">Calificación Promedio</div>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">
                100%
              </div>
              <div className="text-gray-400">Proyectos Exitosos</div>
              <div className="text-sm text-emerald-300 mt-1">
                Sin fallos en entrega
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">98%</div>
              <div className="text-gray-400">Clientes Recurrentes</div>
              <div className="text-sm text-blue-300 mt-1">
                Confían en nosotros
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-6 text-lg">
              ¿Quieres ser nuestro próximo caso de éxito?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openQuoteModal()}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-yellow-500/25"
              >
                Iniciar Mi Proyecto
              </button>
              <button
                onClick={() => openConsultationModal()}
                className="bg-transparent border-2 border-gray-500 text-gray-300 hover:border-gray-400 hover:text-white font-bold py-4 px-8 rounded-full transition-all duration-300"
              >
                Ver Más Casos
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 animate-fadeIn">
              Contáctanos
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              ¿Listo para transformar tu idea en una solución tecnológica
              exitosa?
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Información de contacto mejorada */}
            <div className="space-y-8 h-full">
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md p-8 rounded-2xl border border-gray-700/50 shadow-2xl h-full flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <svg
                    className="w-8 h-8 mr-3 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Conectemos
                </h3>

                <div className="space-y-4 flex-grow">
                  {/* Email */}
                  <div className="flex items-start space-x-4 group cursor-pointer hover:bg-gray-700/30 p-4 rounded-lg transition-all duration-300 min-h-[80px]">
                    <div className="bg-blue-500/20 p-3 rounded-lg group-hover:bg-blue-500/30 transition-all duration-300 flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-white font-semibold">
                        Email Corporativo
                      </h4>
                      <EmailLink
                        mailtoUrl="mailto:axonapp.info@gmail.com?subject=Consulta%20sobre%20servicios%20de%20Axon.App&body=Hola%20equipo%20de%20Axon.App,%0A%0AEstoy%20interesado%20en%20conocer%20más%20sobre%20sus%20servicios.%20Me%20gustaría%20que%20me%20contacten%20para:%0A%0A-%20%0A-%20%0A-%20%0A%0AGracias,%0A[Tu%20nombre]"
                        className="text-blue-400 hover:text-blue-300 transition duration-200"
                      >
                        axonapp.info@gmail.com
                      </EmailLink>
                      <p className="text-gray-400 text-sm mt-1">
                        Consultas generales y soporte técnico
                      </p>
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div className="flex items-start space-x-4 group cursor-pointer hover:bg-gray-700/30 p-4 rounded-lg transition-all duration-300 min-h-[80px]">
                    <div className="bg-green-500/20 p-3 rounded-lg group-hover:bg-green-500/30 transition-all duration-300 flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-white font-semibold">
                        Teléfono / WhatsApp
                      </h4>
                      <a
                        href="https://wa.me/573233932071"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300 transition duration-200 flex items-center"
                      >
                        +57 323 393 2071
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                        </svg>
                      </a>
                      <p className="text-gray-400 text-sm mt-1">
                        Colombia - Disponible 24/7
                      </p>
                    </div>
                  </div>

                  {/* Ubicación */}
                  <div className="flex items-start space-x-4 group cursor-pointer hover:bg-gray-700/30 p-4 rounded-lg transition-all duration-300 min-h-[80px]">
                    <div className="bg-purple-500/20 p-3 rounded-lg group-hover:bg-purple-500/30 transition-all duration-300 flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-purple-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-white font-semibold">Ubicación</h4>
                      <p className="text-purple-400">Colombia</p>
                      <p className="text-gray-400 text-sm mt-1">
                        Servicios disponibles globalmente
                      </p>
                    </div>
                  </div>

                  {/* Tiempo de respuesta */}
                  <div className="flex items-start space-x-4 group cursor-pointer hover:bg-gray-700/30 p-4 rounded-lg transition-all duration-300 min-h-[80px]">
                    <div className="bg-yellow-500/20 p-3 rounded-lg group-hover:bg-yellow-500/30 transition-all duration-300 flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-white font-semibold">
                        Tiempo de Respuesta
                      </h4>
                      <p className="text-yellow-400">≤ 24 horas</p>
                      <p className="text-gray-400 text-sm mt-1">
                        Respuesta garantizada en horario laboral
                      </p>
                    </div>
                  </div>
                </div>

                {/* Call to Action adicional */}
                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md p-6 rounded-2xl border border-blue-500/30 mt-6">
                  <h4 className="text-white font-bold text-lg mb-2">
                    ¿Necesitas una respuesta inmediata?
                  </h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Contáctanos por WhatsApp para consultas urgentes
                  </p>
                  <a
                    href="https://wa.me/573233932071?text=Hola%2C%20estoy%20interesado%20en%20sus%20servicios%20de%20desarrollo%20tecnológico"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                    Chatear en WhatsApp
                  </a>
                </div>
              </div>
            </div>{" "}
            {/* Formulario unificado */}
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-md p-8 rounded-2xl border border-gray-700/50 shadow-2xl h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Envíanos un mensaje
                  </h3>
                  <p className="text-gray-400">
                    Cuéntanos sobre tu proyecto y te contactaremos pronto
                  </p>
                </div>
                <button
                  onClick={openContactModal}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  Abrir en modal
                </button>
              </div>
              <UnifiedContactForm mode="contact" className="flex-grow" />
            </div>
          </div>
        </div>
      </section>
      {/* Footer Profesional */}
      <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        {/* Efectos de fondo animados sutiles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Columna 1: Información de la Empresa */}
            <div className="space-y-6 text-center">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <img
                  src={logo1}
                  alt="Axon Logo Original"
                  className="h-16 w-16 object-contain logo-rotate-1 rounded-lg"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <img
                  src={logo231}
                  alt="Axon.App Logo 3D"
                  className="h-20 w-auto object-contain logo-rotate-2 rounded-lg"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed text-center">
                Transformamos ideas en soluciones digitales innovadoras.
                Desarrollo web, aplicaciones móviles, inteligencia artificial y
                más.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                <svg
                  className="w-4 h-4 text-purple-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Bogotá D.C., Colombia</span>
              </div>
            </div>

            {/* Columna 2: Servicios */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-white font-rajdhani">
                🚀 Nuestros Servicios
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center space-x-2 cursor-pointer"
                  >
                    <span className="text-green-400">▶</span>
                    <span>Desarrollo Web</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center space-x-2 cursor-pointer"
                  >
                    <span className="text-green-400">▶</span>
                    <span>Aplicaciones Móviles</span>
                  </button>
                </li>{" "}
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center space-x-2 cursor-pointer"
                  >
                    <span className="text-green-400">▶</span>
                    <span>Marketing Digital</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center space-x-2 cursor-pointer"
                  >
                    <span className="text-green-400">▶</span>
                    <span>Consultoría TI</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center space-x-2 cursor-pointer"
                  >
                    <span className="text-green-400">▶</span>
                    <span>E-commerce</span>
                  </button>
                </li>{" "}
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center space-x-2 cursor-pointer"
                  >
                    <span className="text-green-400">▶</span>
                    <span>Soporte Hardware y Software</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Columna 3: Contacto */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-white font-rajdhani">
                📞 Contacto
              </h4>
              <div className="space-y-4 text-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400">Email</p>
                    <EmailLink
                      mailtoUrl="mailto:axonapp.info@gmail.com?subject=Contacto%20desde%20sitio%20web%20-%20Axon.App&body=Hola%20equipo%20de%20Axon.App,%0A%0AMe%20pongo%20en%20contacto%20con%20ustedes%20desde%20su%20sitio%20web%20para:%0A%0A-%20%0A-%20%0A-%20%0A%0AMis%20datos%20de%20contacto:%0ANombre:%20%0ATeléfono:%20%0AEmpresa:%20%0A%0AGracias%20por%20su%20tiempo.%0A%0ASaludos,"
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      axonapp.info@gmail.com
                    </EmailLink>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400">Teléfono</p>
                    <a
                      href="tel:+573233932071"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      +57 323 393 2071
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400">Horario</p>
                    <p className="text-purple-400">Lun - Vie: 8AM - 6PM</p>
                    <p className="text-purple-400">Sáb: 9AM - 2PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna 4: Enlaces Rápidos */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-white font-rajdhani">
                🔗 Enlaces Rápidos
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <button
                    onClick={() => scrollToSection("hero")}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center space-x-2 cursor-pointer"
                  >
                    <span className="text-green-400">▶</span>
                    <span>Inicio</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center space-x-2 cursor-pointer"
                  >
                    <span className="text-green-400">▶</span>
                    <span>Nosotros</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center space-x-2 cursor-pointer"
                  >
                    <span className="text-green-400">▶</span>
                    <span>Servicios</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("technologies")}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center space-x-2 cursor-pointer"
                  >
                    <span className="text-green-400">▶</span>
                    <span>Tecnologías</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("testimonials")}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center space-x-2 cursor-pointer"
                  >
                    <span className="text-green-400">▶</span>
                    <span>Testimonios</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center space-x-2 cursor-pointer"
                  >
                    <span className="text-green-400">▶</span>
                    <span>Contacto</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 pt-8">
            {/* Social Media Section */}
            <div className="text-center mb-8">
              <h4 className="text-lg font-semibold text-white mb-6 font-rajdhani">
                🌐 Síguenos en Redes Sociales
              </h4>
              <div className="flex justify-center items-center space-x-6">
                {/* Facebook */}
                <a
                  href="https://facebook.com/axonapp.colombia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Facebook
                  </span>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/axonapp.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Instagram
                  </span>
                </a>

                {/* Twitter/X */}
                <a
                  href="https://x.com/axonapp_co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-800 to-black rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Twitter
                  </span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/company/axonapp-colombia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-700 to-blue-800 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    LinkedIn
                  </span>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com/@axonapp-colombia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </div>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    YouTube
                  </span>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/573233932071"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.51 3.488" />
                    </svg>
                  </div>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    WhatsApp
                  </span>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/axon-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    GitHub
                  </span>
                </a>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-800">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p className="text-gray-400 text-sm">
                  &copy; {new Date().getFullYear()}{" "}
                  <span className="font-semibold">
                    <span className="text-cyan-300">Axon</span>
                    <span className="text-emerald-400">.App</span>
                  </span>
                  . Todos los derechos reservados.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Desarrollado con ❤️ en Colombia 🇨🇴
                </p>
              </div>

              <div className="flex flex-wrap justify-center space-x-6 text-sm">
                <button
                  onClick={() => setShowPrivacyModal(true)}
                  className="text-gray-400 hover:text-green-400 transition-colors duration-200"
                >
                  Privacidad
                </button>
                <button
                  onClick={() => setShowTermsModal(true)}
                  className="text-gray-400 hover:text-green-400 transition-colors duration-200"
                >
                  Términos
                </button>
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-200"
                >
                  Mapa del sitio
                </a>
                <button
                  onClick={() => setShowCookiesModal(true)}
                  className="text-gray-400 hover:text-green-400 transition-colors duration-200"
                >
                  Cookies
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Button - WhatsApp */}
        <div className="fixed bottom-6 right-6 z-50">
          <a
            href="https://wa.me/573233932071?text=Hola%2C%20me%20interesa%20conocer%20más%20sobre%20sus%20servicios%20de%20desarrollo%20web"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl animate-pulse">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.51 3.488" />
              </svg>
            </div>
            <div className="absolute -top-12 right-0 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              ¡Chatea con nosotros!
            </div>
          </a>
        </div>
      </footer>      {/* Cookie Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 shadow-2xl z-40 p-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              {" "}
              <div className="flex items-start gap-3 flex-1">
                <div className="flex-shrink-0">
                  <img
                    src="logo1.png"
                    alt="Axon Logo"
                    className="w-8 h-8 rounded-lg"
                  />
                </div>
                <div className="text-sm text-gray-300">
                  <p className="font-semibold text-white mb-1">
                    Utilizamos cookies para mejorar tu experiencia
                  </p>
                  <p>
                    Usamos cookies esenciales y opcionales para personalizar
                    contenido, analizar el tráfico y mejorar nuestros servicios.{" "}
                    <button
                      onClick={() => setShowCookiesModal(true)}
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      Ver configuración detallada
                    </button>
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 lg:gap-3 w-full lg:w-auto">
                <button
                  onClick={() => {
                    // Solo cookies necesarias
                    const onlyNecessary = {
                      necessary: true,
                      analytics: false,
                      marketing: false,
                      preferences: false,
                    };
                    localStorage.setItem(
                      "axon-cookie-preferences",
                      JSON.stringify(onlyNecessary)
                    );
                    localStorage.setItem("axon-cookies-accepted", "true");
                    setShowCookieBanner(false);
                  }}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
                >
                  Solo Necesarias
                </button>
                <button
                  onClick={() => {
                    // Aceptar todas
                    const allAccepted = {
                      necessary: true,
                      analytics: true,
                      marketing: true,
                      preferences: true,
                    };
                    localStorage.setItem(
                      "axon-cookie-preferences",
                      JSON.stringify(allAccepted)
                    );
                    localStorage.setItem("axon-cookies-accepted", "true");
                    setShowCookieBanner(false);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-colors text-sm font-semibold"
                >
                  Aceptar Todas
                </button>
                <button
                  onClick={() => setShowCookiesModal(true)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                >
                  Configurar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modals mejorados de Privacidad y Términos */}
      <EnhancedPrivacyModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />
      <EnhancedTermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />
      <EnhancedCookiesModal
        isOpen={showCookiesModal}
        onClose={() => setShowCookiesModal(false)}
      />
      {/* ServiceDetailModal temporalmente comentado para debug */}
      {selectedService && showServiceModal && (
        <ServiceDetailModal
          service={selectedService}
          isOpen={showServiceModal}
          onClose={handleCloseServiceModal}
          onOpenQuote={handleOpenQuoteModal}
          onOpenConsultation={handleOpenConsultationModal}
        />      )}{" "}
      {/* Modales Unificados */}
      <ContactModal isOpen={contactModalOpen} onClose={closeContactModal} />
      <QuoteModal isOpen={quoteModalOpen} onClose={closeQuoteModal} />
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={closeConsultationModal}
      />

      {/* Modal del Blog */}
      <BlogModal
        isOpen={showBlogModal}
        onClose={handleCloseBlogModal}
        post={selectedBlogPost}
      />

      {/* Botón flotante del blog */}
      <FloatingBlogButton
        onClick={scrollToBlog}
        isVisible={true}
      />
    </div>
  );
};

// Componente para enlaces de navegación
const NavLink = ({
  href,
  children,
  mobile,
  onClick,
  isActive,
  scrollToSection,
}) => {
  const baseClasses = mobile
    ? `block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 transform hover:translate-x-2 border-l-2 cursor-pointer ${
        isActive
          ? "text-blue-400 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-blue-400"
          : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-cyan-600/20 border-transparent hover:border-blue-400"
      }`
    : `relative text-sm font-semibold transition-all duration-300 group px-3 py-2 rounded-lg cursor-pointer ${
        isActive
          ? "text-blue-400 bg-white/10"
          : "text-gray-300 hover:text-white hover:bg-white/5"
      }`;

  const desktopEffect = !mobile ? (
    <>
      <div
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 rounded-full ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      ></div>
      <div
        className={`absolute inset-0 bg-gradient-to-r rounded-lg transition-all duration-300 ${
          isActive
            ? "from-blue-600/20 to-cyan-600/20"
            : "from-blue-600/0 to-cyan-600/0 group-hover:from-blue-600/10 group-hover:to-cyan-600/10"
        }`}
      ></div>
    </>
  ) : null;

  const handleClick = (e) => {
    e.preventDefault();
    const sectionId = href.replace("#", "");
    if (scrollToSection) {
      scrollToSection(sectionId);
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <div onClick={handleClick} className={baseClasses}>
      {mobile ? (
        children
      ) : (
        <div className="relative">
          <span
            className={`relative z-10 transition-all duration-300 ${
              isActive
                ? "text-blue-400 font-semibold"
                : "text-gray-300 group-hover:text-white"
            }`}
          >
            {children}
          </span>
          {desktopEffect}
        </div>
      )}
    </div>
  );
};

export default App;
