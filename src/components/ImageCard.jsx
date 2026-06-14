import { useState } from 'react';

export default function ImageCard({ author, download_url, url, width, height }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:border-slate-700 hover:shadow-2xl">
      
      {/* Strict 3:2 Aspect Ratio Image Container */}
      <div className="relative w-full overflow-hidden bg-slate-950 aspect-[3/2]">
        {/* Shimmer Placeholder Loading State */}
        {!isLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />
        )}
        
        <img
          src={download_url}
          alt={`Shot by ${author}`}
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
        
        {/* Hover Information Backdrop Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end">
          <span className="text-xs font-medium tracking-wide text-slate-200 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
            {width} × {height} px
          </span>
        </div>
      </div>
      
      {/* Card Body Information Stack */}
      <div className="flex flex-grow flex-col justify-between p-6 gap-5">
        <div className="flex items-center gap-3">
          {/* Avatar Profile Component */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-base font-bold text-white shadow-md">
            {author.charAt(0)}
          </div>
          <div className="flex flex-col min-w-0">
            <h3 className="truncate text-base font-semibold text-white tracking-tight">
              {author}
            </h3>
            <p className="text-xs text-slate-500">via Lorem Picsum</p>
          </div>
        </div>
        
        {/* View Action Link Button */}
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-center gap-2 w-full rounded-xl border border-slate-700 bg-slate-800 py-2.5 px-4 text-sm font-medium text-indigo-200 transition-all duration-300 hover:bg-indigo-600 hover:text-white"
        >
          View Source
          <svg 
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>
      </div>
    </div>
  );
}