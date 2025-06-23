import React from "react";

export const BlogModal = ({ isOpen, onClose, post }) => {
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
  const renderContent = (content) => {
    if (!content) return '';
    
    const sanitizedContent = content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');

    return sanitizedContent
      .replace(/# (.*)/g, '<h1 class="text-3xl font-bold mb-6 text-blue-300">$1</h1>')
      .replace(/## (.*)/g, '<h2 class="text-2xl font-semibold mb-4 text-blue-400 mt-8">$2</h2>')
      .replace(/### (.*)/g, '<h3 class="text-xl font-semibold mb-3 text-blue-500 mt-6">$3</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-gray-300">$1</em>')
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-900 border border-gray-700 rounded-lg p-4 my-4 overflow-x-auto"><code class="text-green-400 text-sm">$2</code></pre>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-800 text-cyan-400 px-2 py-1 rounded text-sm">$1</code>')
      .replace(/^- (.*)/gm, '<li class="ml-4 mb-2 text-gray-300">• $1</li>')
      .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed text-gray-300">')
      .replace(/^\n/, '<p class="mb-4 leading-relaxed text-gray-300">')
      .replace(/\n$/, '</p>');
  };

  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-y-auto border border-gray-700/50 shadow-2xl">        <div className="sticky top-0 z-10 bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-md p-6 border-b border-gray-700/50 rounded-t-3xl">
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags && post.tags.length > 0 && post.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {post.title || 'Sin título'}
              </h1>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                {post.author && (
                  <span className="flex items-center">
                    <span className="mr-1">✍️</span>
                    {post.author}
                  </span>
                )}
                {post.date && (
                  <span className="flex items-center">
                    <span className="mr-1">📅</span>
                    {new Date(post.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                )}
                {post.readTime && (
                  <span className="flex items-center">
                    <span className="mr-1">⏱️</span>
                    {post.readTime}
                  </span>
                )}
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-xl transition-all duration-300 group flex-shrink-0"
              aria-label="Cerrar modal"
            >
              <svg
                className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>        <div className="p-6 md:p-8">
          {post.image && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-blue-600/50 to-purple-600/50 rounded-xl flex items-center justify-center">
                <span className="text-4xl">📖</span>
              </div>
            </div>
          )}

          {post.excerpt && (
            <div className="bg-blue-600/10 border-l-4 border-blue-500 p-4 mb-8 rounded-r-lg">
              <p className="text-lg text-blue-200 italic">
                {post.excerpt}
              </p>
            </div>
          )}

          {post.content && (
            <div 
              className="prose prose-invert prose-blue max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: renderContent(post.content) 
              }}
            />
          )}

          <div className="mt-12 p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-500/30">
            <h3 className="text-xl font-bold mb-3 text-white">
              ¿Te gustó este artículo?
            </h3>
            <p className="text-gray-300 mb-4">
              En Axon.App estamos siempre explorando las últimas tecnologías. 
              ¿Quieres implementar estas soluciones en tu proyecto?
            </p>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={onClose}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                💬 Hablemos de tu proyecto
              </button>
              <button 
                onClick={onClose}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 font-semibold"
              >
                📧 Suscribirse al blog
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
