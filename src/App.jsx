import { useState, useEffect } from 'react';
import axios from 'axios';
import ImageCard from './components/ImageCard';

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=12`);
        setImages(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to sync structural asset data. Please check your connection.");
      } finally {
        setTimeout(() => setLoading(false), 400);
      }
    };

    fetchImages();
  }, [page]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-6 py-12 antialiased">
      
      {/* Glow Header Hero Interface */}
      <header className="text-center mb-16">
        <div className="flex items-center justify-center gap-2.5 mb-3">
          <span className="h-3 w-3 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Imago<span className="text-indigo-400">Glow</span>
          </h1>
        </div>
        <p className="text-slate-400 max-w-md mx-auto text-sm sm:text-base font-light">
          Curated high-fidelity computational photography interfaces powered by Tailwind CSS & Axios.
        </p>
      </header>

      {/* Grid Canvas Wrapper */}
      <main className="max-w-7xl mx-auto">
        {error && (
          <div className="mb-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-center text-red-300 max-w-xl mx-auto">
            <p className="text-sm font-medium">{error}</p>
            <button onClick={() => setPage(page)} className="mt-3 rounded-lg bg-red-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-red-500 transition-colors">
              Retry Synced Fetch
            </button>
          </div>
        )}

        {loading ? (
          /* Native Loading Skeletons Grid Layout */
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 12 }).map((_, idx) => (
              <div key={idx} className="flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                <div className="w-full aspect-[3/2] animate-pulse bg-slate-800" />
                <div className="p-6 space-y-3">
                  <div className="h-4 w-2/3 rounded bg-slate-800 animate-pulse" />
                  <div className="h-3 w-1/2 rounded bg-slate-800 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Live Fluid Photo Grid Stack calling our imported Component */
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 transition-opacity duration-500">
            {images.map((img) => (
              <ImageCard
                key={img.id}
                author={img.author}
                width={img.width}
                height={img.height}
                url={img.url}
                download_url={img.download_url}
              />
            ))}
          </div>
        )}

        {/* Core Navigation Pagination Dock */}
        <div className="flex items-center justify-center gap-6 mt-16">
          <button 
            disabled={page === 1 || loading} 
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-500 active:translate-y-0 disabled:pointer-events-none disabled:bg-slate-800 disabled:text-slate-600 disabled:shadow-none"
          >
            Previous Deck
          </button>
          <span className="text-sm font-semibold tracking-wider text-slate-400 uppercase">
            Deck Layer {page}
          </span>
          <button 
            disabled={loading} 
            onClick={() => setPage(prev => prev + 1)}
            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-500 active:translate-y-0 disabled:pointer-events-none disabled:bg-slate-800 disabled:text-slate-600 disabled:shadow-none"
          >
            Next Deck
          </button>
        </div>
      </main>
    </div>
  );
}