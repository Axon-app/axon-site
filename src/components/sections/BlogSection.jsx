import React from "react";
import { blogPosts, getFeaturedPosts } from "../../data/blogData";

export const BlogSection = ({ onOpenBlogModal }) => {
  const featuredPosts = getFeaturedPosts();
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header de la sección */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Blog & Insights
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Mantente al día con las últimas tendencias en tecnología, desarrollo web y mejores prácticas de la industria
          </p>
        </div>

        {/* Posts destacados */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-blue-300 text-center">
              📌 Posts Destacados
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onOpenModal={onOpenBlogModal}
                  featured={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* Posts recientes */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-blue-300 text-center">
            🕒 Últimas Publicaciones
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                onOpenModal={onOpenBlogModal}
                featured={false}
              />
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/30">
            <h3 className="text-2xl font-bold mb-4 text-white">
              ¿Quieres estar al día?
            </h3>
            <p className="text-gray-300 mb-6">
              Suscríbete a nuestro newsletter y recibe las últimas novedades directamente en tu correo
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 font-semibold">
              📧 Suscribirse al Newsletter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Componente de tarjeta de blog
const BlogCard = React.memo(({ post, onOpenModal, featured }) => {
  const handleReadMore = () => {
    onOpenModal(post);
  };

  return (
    <article
      className={`bg-slate-800/60 backdrop-blur-sm rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-blue-500/30 hover:-translate-y-2 shadow-xl border border-blue-500/30 group ${featured ? 'md:col-span-1' : ''}`}
    >
      {/* Imagen del post */}
      <div className="h-48 bg-gradient-to-br from-blue-600/50 to-purple-600/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-800/80 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          {featured && (
            <span className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
              ⭐ Destacado
            </span>
          )}
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-blue-600/80 text-white px-3 py-1 rounded-full text-sm">
            {post.readTime}
          </span>
        </div>
      </div>

      {/* Contenido del post */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Título */}
        <h3 className="text-xl font-semibold mb-3 text-blue-300 group-hover:text-blue-200 transition-colors">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-300 mb-4 leading-relaxed text-sm">
          {post.excerpt}
        </p>

        {/* Footer de la tarjeta */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">
            <span>✍️ {post.author}</span>
            <span className="mx-2">•</span>
            <span>📅 {new Date(post.date).toLocaleDateString('es-ES')}</span>
          </div>
          <button
            onClick={handleReadMore}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 text-sm font-semibold"
          >
            Leer más →
          </button>
        </div>
      </div>
    </article>
  );
});

BlogCard.displayName = "BlogCard";

export default BlogSection;
