import { useNavigate } from 'react-router-dom';
import { Play, Star, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

import { MovieCard } from '../components/MovieCard';

// Тимчасові дані для популярних фільмів
const POPULAR_MOVIES = [
  { id: 102, title: "Початок", year: 2010, genre: "Action", rating: 8.8, image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=500" },
  { id: 101, title: "Інтерстеллар", year: 2014, genre: "Sci-Fi", rating: 8.7, image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=500" },
  { id: 101, title: "Інтерстеллар", year: 2014, genre: "Sci-Fi", rating: 8.7, image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=500" },
  { id: 101, title: "Інтерстеллар", year: 2014, genre: "Sci-Fi", rating: 8.7, image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=500" },
  { id: 101, title: "Інтерстеллар", year: 2014, genre: "Sci-Fi", rating: 8.7, image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=500" },
  { id: 101, title: "Інтерстеллар", year: 2014, genre: "Sci-Fi", rating: 8.7, image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=500" },
  { id: 101, title: "Інтерстеллар", year: 2014, genre: "Sci-Fi", rating: 8.7, image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=500" },
  { id: 101, title: "Інтерстеллар", year: 2014, genre: "Sci-Fi", rating: 8.7, image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=500" },
  { id: 103, title: "Дюна", year: 2021, genre: "Sci-Fi", rating: 8.0, image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=500" },
  { id: 104, title: "Бетмен", year: 2022, genre: "Action", rating: 7.8, image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=500" },
  { id: 105, title: "Джокер", year: 2019, genre: "Drama", rating: 8.4, image: "https://images.unsplash.com/photo-1531259683007-016a7b328131?q=80&w=500" },
  { id: 106, title: "Тенет", year: 2020, genre: "Sci-Fi", rating: 7.3, image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=500" },
];

// Дані для жанрів
const GENRES_DATA = [
  { name: "Бойовики", slug: "action" },
  { name: "Жахи", slug: "horror" },
  { name: "Фантастика", slug: "sci-fi" }
];

function UserHomePage() {
  const navigate = useNavigate();

  const onMainSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`/search?q=${e.currentTarget.value}`);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20">

      {/* --- HERO SECTION --- */}
      <section className="w-full py-24 relative overflow-hidden flex flex-col items-center text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-full bg-red-600/10 blur-[120px] rounded-full -z-10" />

        <div className="max-w-4xl px-4 space-y-6">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">
            Watch movies <br />
            <span className="text-red-600">without limits</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Відкривайте для себе найпопулярніші новинки та улюблену класику в найкращій якості.
          </p>
          <div className="relative group max-w-2xl mx-auto w-full">
            <input
              onKeyDown={onMainSearch}
              type="text"
              placeholder="Пошук фільмів..."
              className="w-full px-8 py-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-white outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/10 transition-all text-lg backdrop-blur-sm"
            />
          </div>
        </div>
      </section>

      {/* --- POPULAR MOVIES SECTION --- */}
      <section className="px-6 md:px-12 max-w-[1800px] mx-auto mb-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-red-600 rounded-full" />
            <h2 className="text-2xl font-bold uppercase tracking-tight">Популярне зараз</h2>
          </div>
          <button className="flex items-center gap-1 text-zinc-500 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest">
            Дивитись всі <ChevronRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {POPULAR_MOVIES.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={() => navigate(`/movie/${movie.id}`)} />
          ))}
        </div>
      </section>

      {/* --- GENRES SECTIONS --- */}
      <section className="px-6 md:px-12 max-w-[1800px] mx-auto space-y-16">
        {GENRES_DATA.map((genre) => (
          <div key={genre.slug} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold uppercase tracking-widest text-zinc-400">{genre.name}</h2>
              <button className="text-xs font-black text-red-600 hover:text-red-500 transition-colors uppercase tracking-widest">
                Більше
              </button>
            </div>

            {/* Horizontal Scroll Area */}
            <div className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide">
              {/* Тут ми просто повторюємо POPULAR_MOVIES для прикладу */}
              {POPULAR_MOVIES.slice(0, 8).map((movie, idx) => (
                <div key={`${genre.slug}-${idx}`} className="min-w-[180px] md:min-w-[220px]">
                  <MovieCard
                    movie={movie}
                    compact
                    onClick={() => navigate(`/movie/${movie.id}`)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default UserHomePage;
