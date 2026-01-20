import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { MovieCard } from '../components/movie/MovieCard.tsx'; // Твій компонент
import PageTransition from '../components/PageTransition';

const GENRES = ["Усі", "Екшн", "Драма", "Комедія", "Фантастика", "Жахи", "Трилер"];

function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState("Усі");

  // Тимчасовий масив фільмів для прикладу
  const movies = [
    { id: 1, title: "Інтерстеллар", year: 2014, genre: "Фантастика", rating: 8.7, image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=500" },
    { id: 2, title: "Початок", year: 2010, genre: "Екшн", rating: 8.8, image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=500" },
    { id: 3, title: "Дюна", year: 2021, genre: "Фантастика", rating: 8.1, image: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?q=80&w=500" },
    // Додай більше фільмів тут...
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white p-6 md:p-12 pt-24">

        {/* Header розділу */}
        <div className="max-w-7xl mx-auto mb-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
                Каталог <span className="text-red-600">фільмів</span>
              </h1>
              <p className="text-zinc-500 mt-2 font-medium">Знайди щось цікаве для вечора</p>
            </div>

            {/* Пошук */}
            <div className="relative group w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-600 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Пошук за назвою..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-red-600/50 focus:ring-4 focus:ring-red-600/10 transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Жанри */}
          <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
            <div className="p-3 bg-zinc-900 rounded-xl text-zinc-400 border border-white/5">
              <SlidersHorizontal size={20} />
            </div>
            {GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border ${activeGenre === genre
                  ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/20"
                  : "bg-zinc-900 border-white/5 text-zinc-500 hover:border-white/20 hover:text-white"
                  }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Сітка фільмів */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {movies.map((movie) => (

              <MovieCard
                key={movie.id}
                  //@ts-ignore
                movie={movie}
                onClick={() => console.log('Open movie', movie.id)}
              />
            ))}
          </div>

          {/* Пустий стан */}
          {movies.length === 0 && (
            <div className="text-center py-20">
              <p className="text-zinc-500 font-bold uppercase tracking-widest">Нічого не знайдено</p>
            </div>
          )}
        </div>

      </div>
    </PageTransition>
  );
}

export default CatalogPage;
