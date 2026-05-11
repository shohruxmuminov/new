'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Film, Play, Clock, Search, X
} from 'lucide-react';
import { Movie } from '@/types/movie';
import Link from 'next/link';

const MOVIES_KEY = 'cdi-movies';
const CATEGORIES = ['All', 'Film', 'Cartoon', 'Tv Series', 'Anime', 'Tv shows'];

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const savedMovies = localStorage.getItem(MOVIES_KEY);
    if (savedMovies) setMovies(JSON.parse(savedMovies));
  }, []);

  const filteredMovies = movies.filter(movie => {
    const matchesCategory = activeCategory === 'All' || movie.category === activeCategory;
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="relative h-[400px] rounded-[32px] overflow-hidden border-4 border-black mb-12 shadow-[12px_12px_0px_0px_rgba(139,92,241,1)] bg-black">
           <img 
             src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop" 
             className="w-full h-full object-cover opacity-60" 
             alt="Movies Background"
           />
           <div className="absolute inset-0 flex flex-col justify-center p-12 text-white">
              <motion.div 
                initial={{ opacity: 0, x: -30 }} 
                animate={{ opacity: 1, x: 0 }}
                className="max-w-2xl"
              >
                 <div className="inline-block px-4 py-1 bg-yellow-300 text-black font-black text-xs uppercase tracking-widest mb-6 border-2 border-black">
                    Now Streaming
                 </div>
                 <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
                    English <span className="text-purple-400">Cinema</span>
                 </h1>
                 <p className="text-xl font-bold uppercase opacity-90 max-w-xl leading-tight">
                    Improve your listening skills with our curated collection of films, series, and shows with English subtitles.
                 </p>
              </motion.div>
           </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
           <div className="flex flex-wrap items-center gap-3">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 border-2 border-black font-black text-xs uppercase tracking-widest transition-all
                    ${activeCategory === cat ? 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(139,92,241,1)]' : 'bg-white text-black hover:bg-gray-100'}`}
                >
                   {cat}
                </button>
              ))}
           </div>
           
           <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search movies..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-4 border-black font-bold uppercase text-xs outline-none focus:bg-purple-50"
              />
           </div>
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {filteredMovies.map((movie, i) => (
             <motion.div
               key={movie.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="group cursor-pointer"
               onClick={() => setSelectedMovie(movie)}
             >
                <div className="relative aspect-[2/3] border-4 border-black rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
                   {movie.thumbnailUrl ? (
                     <img src={movie.thumbnailUrl} alt={movie.title} className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                        <Film size={48} />
                     </div>
                   )}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white border-2 border-white mb-4">
                         <Play size={24} fill="currentColor" />
                      </div>
                      <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-tight">{movie.title}</h3>
                   </div>
                </div>
                <div className="mt-4 flex items-center justify-between px-1">
                   <span className="text-[10px] font-black uppercase tracking-widest text-purple-600">{movie.category}</span>
                   <div className="flex items-center gap-1 text-[10px] font-black text-gray-400 uppercase">
                      <Clock size={12} /> HD
                   </div>
                </div>
             </motion.div>
           ))}
           
           {filteredMovies.length === 0 && (
             <div className="col-span-full py-20 text-center">
                <div className="w-20 h-20 bg-gray-100 border-4 border-black flex items-center justify-center mx-auto mb-6">
                   <X size={32} />
                </div>
                <h3 className="text-2xl font-black uppercase">No movies found</h3>
                <p className="text-gray-500 font-bold uppercase mt-2">Try adjusting your filters or search terms.</p>
             </div>
           )}
        </div>
      </div>

      {/* Video Player Modal */}
      <AnimatePresence>
         {selectedMovie && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/95 backdrop-blur-md"
                onClick={() => setSelectedMovie(null)}
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-full max-w-6xl aspect-video bg-black border-4 border-white shadow-[20px_20px_0px_0px_rgba(139,92,241,1)] overflow-hidden"
              >
                 <video 
                   ref={videoRef}
                   controls
                   className="w-full h-full"
                   poster={selectedMovie.thumbnailUrl}
                   crossOrigin="anonymous"
                 >
                    <source src={selectedMovie.videoUrl} type="video/mp4" />
                    {selectedMovie.subtitleUrl && (
                      <track 
                        label="English" 
                        kind="subtitles" 
                        srcLang="en" 
                        src={selectedMovie.subtitleUrl} 
                        default 
                      />
                    )}
                    Your browser does not support the video tag.
                 </video>
                 
                 <button 
                   onClick={() => setSelectedMovie(null)}
                   className="absolute top-4 right-4 p-2 bg-white text-black border-2 border-black hover:bg-gray-100 transition-all z-50"
                 >
                    <X size={24} />
                 </button>
                 
                 <div className="absolute bottom-16 left-8 z-50 pointer-events-none">
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter drop-shadow-lg">{selectedMovie.title}</h2>
                 </div>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  );
}
