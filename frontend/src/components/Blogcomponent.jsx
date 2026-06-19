import React from 'react';
import { Clock, BookOpen } from 'lucide-react';

export const Blogcomponent = ({ id, title, body, blog, fetchData }) => {
  const wordCount = blog ? blog.split(' ').length : 0;
  const readTime  = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="glass border border-white/8 rounded-2xl p-6 card-hover group flex flex-col gap-4">
      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <span className="tag mb-2 inline-block">Article</span>
          <h2
            className="text-white font-bold text-xl leading-snug group-hover:text-orange-400 transition-colors duration-200 line-clamp-2"
            style={{fontFamily:'Space Grotesk,sans-serif'}}
          >
            {title}
          </h2>
        </div>
      </div>

      {/* Subject / subtitle */}
      {body && (
        <div className="flex items-start gap-2">
          <BookOpen size={14} className="text-orange-400 mt-0.5 flex-shrink-0" />
          <p className="text-orange-400/80 text-sm font-medium">{body}</p>
        </div>
      )}

      {/* Blog content preview */}
      {blog && (
        <p className="text-white/50 text-sm leading-relaxed line-clamp-4">
          {blog}
        </p>
      )}

      {/* Footer */}
      <div className="pt-3 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-white/30 text-xs">
          <Clock size={12} />
          <span>{readTime} min read</span>
        </div>
        <span className="text-xs text-white/20">{wordCount} words</span>
      </div>
    </article>
  );
};

export default Blogcomponent;
