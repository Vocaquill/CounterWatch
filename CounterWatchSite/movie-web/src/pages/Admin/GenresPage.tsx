import { useState } from 'react';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  // Calendar,
  Link2,
  X,
  Loader2,
} from 'lucide-react';

import AddGenreModal from '../../components/AddGenreModal';
import EditGenreModal from '../../components/EditGenreModal';
import DeleteGenreModal from '../../components/DeleteGenreModal';

import type { IGenreItem, IGenreSearch } from '../../types/genre';
import {
  useSearchGenresQuery,
} from '../../services/api/apiGenres';

import { Pagination } from '../../components/Pagination';
import {APP_ENV} from "../../env";

function GenresPage() {
  const [searchParams, setSearchParams] = useState<IGenreSearch>({
    name: '',
    slug: '',
    page: 1,
    itemPerPage: 1,
  });

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedGenre, setSelectedGenre] = useState<IGenreItem | null>(null);

  const { data, isFetching, isError } = useSearchGenresQuery(searchParams);

  const handleSearchChange = <K extends keyof IGenreSearch>(
      key: K,
      value: IGenreSearch[K]
  ) => {
    setSearchParams((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  const resetFilters = () => {
    setSearchParams({
      name: '',
      slug: '',
      page: 1,
      itemPerPage: searchParams.itemPerPage,
    });
  };

  return (
      <div className="space-y-6 animate-in fade-in duration-500">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Жанри</h1>
            <p className="text-zinc-500 text-sm">
              Керування категоріями фільмів та URL
            </p>
          </div>

          <button
              onClick={() => setIsAddOpen(true)}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg active:scale-95"
          >
            <Plus size={20} />
            Додати жанр
          </button>
        </div>

        <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 flex flex-wrap items-center gap-4">
          <div className="relative flex-[2] min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input
                value={searchParams.name || ''}
                onChange={(e) => handleSearchChange('name', e.target.value)}
                placeholder="Пошук за назвою..."
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-zinc-200"
            />
          </div>

          <div className="relative flex-1 min-w-[180px]">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
            <input
                value={searchParams.slug || ''}
                onChange={(e) => handleSearchChange('slug', e.target.value)}
                placeholder="Фільтр по slug..."
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl py-2.5 pl-10 pr-4 text-xs text-zinc-400 font-mono italic"
            />
          </div>

          {(searchParams.name || searchParams.slug) && (
              <button
                  onClick={resetFilters}
                  className="p-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-xl"
              >
                <X size={20} />
              </button>
          )}
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl relative">
          {isFetching && (
              <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm z-10 flex items-center justify-center">
                <Loader2 className="animate-spin text-red-600" size={40} />
              </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-zinc-800/50 text-zinc-500 text-[11px] uppercase font-bold">
              <tr>
                <th className="p-4 w-20 text-center">ID</th>
                <th className="p-4 w-24">Фото</th>
                <th className="p-4">Назва</th>
                <th className="p-4">Slug</th>
                {/*<th className="p-4">Створено</th>*/}
                <th className="p-4 text-right">Дії</th>
              </tr>
              </thead>

              <tbody className="divide-y divide-zinc-800">
              {isError ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-red-500">
                      Помилка завантаження
                    </td>
                  </tr>
              ) : data?.items.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-zinc-400 italic">
                      Нічого не знайдено
                    </td>
                  </tr>
              ) : (
                  data?.items.map((genre : IGenreItem) => (
                      <tr key={genre.id} className="hover:bg-zinc-800/20 group">
                        <td className="p-4 text-center text-xs font-mono text-zinc-500">
                          #{genre.id}
                        </td>

                        <td className="p-4">
                          <div className="w-12 h-12 rounded-lg bg-zinc-800 border border-zinc-700 overflow-hidden">
                            {genre.image && (
                                <img src={APP_ENV.IMAGES_400_URL + genre.image} alt={genre.name} className="w-full h-full object-cover" />
                            )}
                          </div>
                        </td>

                        <td className="p-4 font-semibold text-zinc-200 group-hover:text-red-500">
                          {genre.name}
                        </td>

                        <td className="p-4">
                      <span className="font-mono text-xs text-zinc-500">
                        {genre.slug}
                      </span>
                        </td>

                        {/*<td className="p-4 text-xs text-zinc-400">*/}
                        {/*  <Calendar size={14} className="inline mr-1 text-zinc-600" />*/}
                        {/*  {genre.dateCreate*/}
                        {/*      ? new Date(genre.dateCreate).toLocaleDateString('uk-UA')*/}
                        {/*      : '—'}*/}
                        {/*</td>*/}

                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-1">
                            <button
                                onClick={() => {
                                  setSelectedGenre(genre);
                                  setIsEditOpen(true);
                                }}
                                className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-white"
                            >
                              <Edit2 size={16} />
                            </button>

                            <button
                                onClick={() => {
                                  setSelectedGenre(genre);
                                  setIsDeleteOpen(true);
                                }}
                                className="p-2 hover:bg-red-950/30 rounded-lg text-zinc-500 hover:text-red-500"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                  ))
              )}
              </tbody>
            </table>
          </div>

          {data && (
              <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
                <Pagination
                    currentPage={data.pagination.currentPage}
                    totalPages={data.pagination.totalPages}
                    onChange={(page) =>
                        setSearchParams((prev) => ({ ...prev, page }))
                    }
                />
              </div>
          )}
        </div>

        <AddGenreModal
            isOpen={isAddOpen}
            onClose={() => setIsAddOpen(false)}
        />

        <EditGenreModal
            isOpen={isEditOpen}
            genre={selectedGenre}
            onClose={() => setIsEditOpen(false)}
        />

        <DeleteGenreModal
            isOpen={isDeleteOpen}
            genreId={selectedGenre?.id ?? null}
            genreName={selectedGenre?.name ?? ''}
            onClose={() => setIsDeleteOpen(false)}
        />

      </div>
  );
}

export default GenresPage;
