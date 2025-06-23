import React, { useState } from "react";

/**
 * Componente de tarjeta individual para mostrar información del cliente
 * Incluye animaciones, hover effects y modal de detalles
 */
export const ClientCard = ({ client, index }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Animación de entrada escalonada
  const animationDelay = `${index * 0.1}s`;

  return (
    <>      <div        className={`group relative glass-card rounded-2xl p-6 
          transition-all duration-500 hover:scale-105 
          animate-fade-in-up cursor-pointer transform-gpu
          hover:animate-client-card-hover`}
        style={{ animationDelay }}
        onClick={() => setShowDetails(true)}
      >
        {/* Efecto de brillo en hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
          opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

        {/* Header con logo y nombre */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">            <div className={`w-12 h-12 bg-gradient-to-br ${client.logoColor} 
              rounded-xl flex items-center justify-center text-2xl
              group-hover:animate-logo-float transition-all duration-300 
              shadow-lg shadow-blue-500/20`}>
              {client.logo}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-300 
                transition-colors duration-300">
                {client.name}
              </h3>
              <p className="text-sm text-gray-400">{client.industry}</p>
            </div>
          </div>
          
          {/* Año del proyecto */}
          <div className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-lg text-sm font-medium">
            {client.project.year}
          </div>
        </div>

        {/* Información del proyecto */}
        <div className="mb-4">
          <h4 className="text-white font-semibold mb-2 group-hover:text-blue-300 
            transition-colors duration-300">
            {client.project.title}
          </h4>
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
            {client.project.description}
          </p>
        </div>

        {/* Tecnologías utilizadas */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {client.project.technologies.slice(0, 3).map((tech, techIndex) => (
              <span
                key={techIndex}
                className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded-md text-xs
                  group-hover:bg-blue-500/20 group-hover:text-blue-300 
                  transition-all duration-300"
              >
                {tech}
              </span>
            ))}
            {client.project.technologies.length > 3 && (
              <span className="bg-gray-700/50 text-gray-400 px-2 py-1 rounded-md text-xs">
                +{client.project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Resultados clave */}
        <div className="mb-4">
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-green-300 text-sm font-medium">Resultado Destacado</span>
            </div>
            <p className="text-green-100 text-sm">
              {client.results[0]}
            </p>
          </div>
        </div>

        {/* Footer con duración y tipo */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{client.project.duration}</span>
          </div>
          <div className="text-blue-300 font-medium">
            {client.project.type}
          </div>
        </div>

        {/* Indicador de click */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 
          transition-opacity duration-300">
          <div className="bg-blue-500 text-white p-2 rounded-full">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Modal de detalles */}
      {showDetails && (
        <ClientDetailModal 
          client={client} 
          onClose={() => setShowDetails(false)} 
        />
      )}
    </>
  );
};

/**
 * Modal con información detallada del cliente y proyecto
 */
const ClientDetailModal = ({ client, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header del modal */}
        <div className="sticky top-0 bg-gradient-to-br from-gray-800 to-gray-900 p-6 border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 bg-gradient-to-br ${client.logoColor} 
                rounded-2xl flex items-center justify-center text-3xl`}>
                {client.logo}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{client.name}</h2>
                <p className="text-gray-400">{client.industry}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Contenido del modal */}
        <div className="p-6 space-y-6">
          {/* Información del proyecto */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">{client.project.title}</h3>
            <p className="text-gray-300 leading-relaxed mb-4">{client.project.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-300 font-semibold mb-2">Duración</h4>
                <p className="text-white">{client.project.duration}</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h4 className="text-purple-300 font-semibold mb-2">Tipo de Proyecto</h4>
                <p className="text-white">{client.project.type}</p>
              </div>
            </div>
          </div>

          {/* Tecnologías */}
          <div>
            <h4 className="text-white font-semibold mb-3">Tecnologías Utilizadas</h4>
            <div className="flex flex-wrap gap-2">
              {client.project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-gray-700 text-gray-300 px-3 py-1 rounded-lg text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Resultados */}
          <div>
            <h4 className="text-white font-semibold mb-3">Resultados Obtenidos</h4>
            <div className="space-y-3">
              {client.results.map((result, index) => (
                <div key={index} className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-100">{result}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-6">
            <h4 className="text-white font-semibold mb-3">Testimonial del Cliente</h4>
            <blockquote className="text-gray-300 italic leading-relaxed">
              "{client.testimonial}"
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};
