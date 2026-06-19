import { ExternalLink, Eye } from 'lucide-react';
import React from 'react';

export const Procomponent = ({ id, title, description, coverlink, previewlink, fetchData, category }) => {
  return (
    <div className="glass border border-white/8 rounded-2xl overflow-hidden card-hover group flex flex-col">
      {/* Cover image */}
      <div className="relative overflow-hidden h-48 bg-gradient-to-br from-slate-800 to-slate-900">
        {coverlink ? (
          <img
            src={coverlink}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/10 text-5xl font-black" style={{fontFamily:'Space Grotesk,sans-serif'}}>
            {title?.[0] ?? 'P'}
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Preview badge */}
        {previewlink && (
          <a
            href={previewlink}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 glass border border-white/20 rounded-lg px-2.5 py-1 text-xs font-medium text-white flex items-center gap-1 hover:border-orange-400/50 hover:text-orange-400 transition-all"
          >
            <Eye size={11} /> Live
          </a>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <span className="tag self-start mb-2 capitalize">{category || 'Project'}</span>
        <h3 className="text-white font-bold text-lg leading-tight mb-1" style={{fontFamily:'Space Grotesk,sans-serif'}}>
          {title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed flex-1 line-clamp-3">
          {description}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/5">
          {previewlink ? (
            <a
              href={previewlink}
              target="_blank"
              rel="noopener noreferrer"
              id={`project-preview-${id}`}
              className="btn-glow flex-1 text-xs flex items-center justify-center gap-1.5 py-2.5"
            >
              <ExternalLink size={14} />
              <span>Live Demonstration</span>
            </a>
          ) : (
            <span className="text-white/20 text-[10px] uppercase font-bold tracking-widest py-2.5">
              Live Preview Soon
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Procomponent;