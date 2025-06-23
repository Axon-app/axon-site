import React, { useState } from "react";
import { ClientCard } from "../ui/ClientCard";
import { clientsData, clientsStats } from "../../data/clientsData";

/**
 * Sección completa de clientes con estadísticas y filtros
 * Muestra casos de éxito y testimoniales de clientes
 */
export const ClientsSection = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("Todos");
  const [viewMode, setViewMode] = useState("grid"); // grid o list

  // Obtener industrias únicas para filtros
  const industries = ["Todos", ...new Set(clientsData.map(client => client.industry))];

  // Filtrar clientes por industria
  const filteredClients = selectedIndustry === "Todos" 
    ? clientsData 
    : clientsData.filter(client => client.industry === selectedIndustry);

  return (    <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header de la sección */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-300 text-sm font-medium">Casos de Éxito</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Clientes</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transformamos ideas en soluciones digitales exitosas. Conoce algunos de los proyectos 
            que han revolucionado industrias y generado resultados excepcionales.
          </p>
        </div>        {/* Estadísticas destacadas */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-12">
          <div className="glass-card rounded-xl p-4 text-center group hover:scale-105 transition-all duration-300">
            <div className="text-2xl font-bold text-blue-300 animate-stats-counter group-hover:scale-110 transition-transform duration-300">{clientsStats.totalClients}+</div>
            <div className="text-sm text-gray-400">Clientes</div>
          </div>
          <div className="glass-card rounded-xl p-4 text-center group hover:scale-105 transition-all duration-300">
            <div className="text-2xl font-bold text-green-300 animate-stats-counter group-hover:scale-110 transition-transform duration-300" style={{ animationDelay: '0.1s' }}>{clientsStats.projectsCompleted}+</div>
            <div className="text-sm text-gray-400">Proyectos</div>
          </div>
          <div className="glass-card rounded-xl p-4 text-center group hover:scale-105 transition-all duration-300">
            <div className="text-2xl font-bold text-purple-300 animate-stats-counter group-hover:scale-110 transition-transform duration-300" style={{ animationDelay: '0.2s' }}>{clientsStats.industriesCovered}+</div>
            <div className="text-sm text-gray-400">Industrias</div>
          </div>
          <div className="glass-card rounded-xl p-4 text-center group hover:scale-105 transition-all duration-300">
            <div className="text-2xl font-bold text-yellow-300 animate-stats-counter group-hover:scale-110 transition-transform duration-300" style={{ animationDelay: '0.3s' }}>{clientsStats.satisfactionRate}%</div>
            <div className="text-sm text-gray-400">Satisfacción</div>
          </div>
          <div className="glass-card rounded-xl p-4 text-center group hover:scale-105 transition-all duration-300">
            <div className="text-2xl font-bold text-red-300 animate-stats-counter group-hover:scale-110 transition-transform duration-300" style={{ animationDelay: '0.4s' }}>{clientsStats.averageProjectDuration}</div>
            <div className="text-sm text-gray-400">Duración Promedio</div>
          </div>
          <div className="glass-card rounded-xl p-4 text-center group hover:scale-105 transition-all duration-300">
            <div className="text-2xl font-bold text-teal-300 animate-stats-counter group-hover:scale-110 transition-transform duration-300" style={{ animationDelay: '0.5s' }}>{clientsStats.technologiesUsed}+</div>
            <div className="text-sm text-gray-400">Tecnologías</div>
          </div>
        </div>

        {/* Controles de filtro y vista */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0">
          {/* Filtros por industria */}
          <div className="flex flex-wrap gap-2">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setSelectedIndustry(industry)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedIndustry === industry
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                    : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white"
                }`}
              >
                {industry}
              </button>
            ))}
          </div>

          {/* Selector de vista */}
          <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-blue-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-all duration-300 ${
                viewMode === "list"
                  ? "bg-blue-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Grid de clientes */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1"
        }`}>
          {filteredClients.map((client, index) => (
            <ClientCard 
              key={client.id} 
              client={client} 
              index={index}
            />
          ))}
        </div>

        {/* Mensaje si no hay resultados */}
        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">No hay clientes en esta industria</h3>
            <p className="text-gray-400">Intenta seleccionar otra categoría o "Todos"</p>
          </div>
        )}

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Listo para ser nuestro próximo caso de éxito?
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Únete a más de {clientsStats.totalClients} empresas que han transformado sus negocios con nuestras soluciones digitales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
                Solicitar Propuesta
              </button>
              <button className="border border-gray-600 text-white px-8 py-3 rounded-xl font-semibold hover:border-gray-500 hover:bg-gray-800/50 transition-all duration-300">
                Ver Más Casos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
