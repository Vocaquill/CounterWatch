import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MovieCard } from '../components/MovieCard';
import { useSearchMoviesQuery } from '../services/api/apiMovies';
import type { IMovieSearch } from '../types/movie';

function UserHomePage() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useState<IMovieSearch>({
    title: '',
    page: 1,
    itemPerPage: 12,
  });

  const { data, isLoading, isFetching } = useSearchMoviesQuery(searchParams);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(prev => ({
      ...prev,
      title: e.target.value,
      page: 1,
    }));
  };

  return (
      <div className="min-h-screen bg-zinc-950 text-white pb-20">

        <section className="w-full py-24 relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-full bg-red-600/10 blur-[120px] rounded-full -z-10" />

          <div className="max-w-4xl px-4 space-y-6">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">
              Watch movies <br />
              <span className="text-red-600">without limits</span>
            </h1>

            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
              Відкривайте для себе найпопулярніші новинки та улюблену класику
            </p>

            <div className="relative max-w-2xl mx-auto w-full">
              <input
                  value={searchParams.title}
                  onChange={onSearchChange}
                  type="text"
                  placeholder="Пошук фільмів..."
                  className="w-full px-8 py-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-white outline-none
                         focus:border-red-600 focus:ring-4 focus:ring-red-600/10 transition-all text-lg"
              />
            </div>
          </div>
        </section>

        <section className="px-6 md:px-12 max-w-[1800px] mx-auto mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-red-600 rounded-full" />
              <h2 className="text-2xl font-bold uppercase tracking-tight">
                {searchParams.title ? 'Результати пошуку' : 'Усі фільми'}
              </h2>
            </div>

            <span className="text-zinc-500 text-sm">
            {data?.totalCount ?? 0} фільмів
          </span>
          </div>

          {(isLoading || isFetching) && (
              <div className="text-center text-zinc-500 py-20">
                Завантаження...
              </div>
          )}

          {!isLoading && data?.items.length === 0 && (
              <div className="text-center text-zinc-500 py-20">
                Нічого не знайдено
              </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {data?.items.map(movie => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={() => navigate(`/movie/${movie.slug}`)}
                />
            ))}
          </div>
        </section>
      </div>
  );
}

export default UserHomePage;
