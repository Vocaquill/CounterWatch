import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Plus, Edit2, Trash2, Calendar, Link2, X, Loader2 } from 'lucide-react';

import AddGenreModal from '../../components/AddGenreModal.tsx';
import EditGenreModal from '../../components/EditGenreModal.tsx';
import DeleteGenreModal from '../../components/DeleteGenreModal.tsx';

// Імпорти з нашого стору
import type { RootState, AppDispatch } from '../../store';
import { fetchGenres } from '../../store/slices/genresSlice.ts';
import type { GenreMovieAdmin } from '../../types/genre.ts';

function GenresPage() {
  const dispatch = useDispatch<AppDispatch>();

  // 1. Отримуємо дані з Redux
  const { items: genres, status, error } = useSelector((state: RootState) => state.genres);

  // 2. Стейт для пошуку та модалок
  const [searchTerm, setSearchTerm] = useState('');
  const [slugSearch, setSlugSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<GenreMovieAdmin | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [genreToDelete, setGenreToDelete] = useState<GenreMovieAdmin | null>(null);

  // 3. Завантаження даних при старті сторінки
  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  // 4. Логіка фільтрації (працює з даними з Redux)
  const filteredGenres = genres.filter(genre => {
    const matchesMain =
        genre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        genre.id.toString().includes(searchTerm);

    const matchesSlug =
        genre.slug.toLowerCase().includes(slugSearch.toLowerCase());

    return matchesMain && matchesSlug;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setSlugSearch('');
  };

  const handleEditClick = (genre: GenreMovieAdmin) => {
    setSelectedGenre(genre);
    setIsEditModalOpen(true);
  };

  // --- ОНОВЛЕНІ ФУНКЦІЇ ЛОГІКИ ЧЕРЕЗ DISPATCH ---

  const handleDeleteSuccess = () => {
    setGenreToDelete(null); // Очищаємо стейт
  };

  const handleAddSuccess = () => {
    setIsModalOpen(false);
  };

  const handleUpdateSuccess = () => {
    setIsEditModalOpen(false);
  };

  return (
      <div className="space-y-6 animate-in fade-in duration-500">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Жанри</h1>
            <p className="text-zinc-500 text-sm">Керування категоріями фільмів та їх URL-адресами</p>
          </div>
          <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-red-900/20 active:scale-95">
            <Plus size={20} />
            Додати жанр
          </button>
        </div>

        {/* TOOLS: Пошук */}
        <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 backdrop-blur-sm flex flex-wrap items-center gap-4">
          <div className="relative flex-[2] min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input
                type="text"
                value={searchTerm}
                placeholder="Пошук за назвою або ID..."
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-red-600 transition-all text-sm text-zinc-200"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative flex-1 min-w-[180px]">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
            <input
                type="text"
                value={slugSearch}
                placeholder="Фільтр по slug..."
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-zinc-500 transition-all text-xs text-zinc-400 font-mono italic"
                onChange={(e) => setSlugSearch(e.target.value)}
            />
          </div>

          {(searchTerm || slugSearch) && (
              <button onClick={resetFilters} className="p-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-xl transition-colors">
                <X size={20} />
              </button>
          )}
        </div>

        {/* TABLE */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl relative">
          {/* Loading Overlay */}
          {status === 'loading' && (
              <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
                <Loader2 className="text-red-600 animate-spin" size={40} />
              </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-zinc-800/50 text-zinc-500 text-[11px] uppercase tracking-[0.1em] font-bold">
              <tr>
                <th className="p-4 border-b border-zinc-800 text-center w-20">ID</th>
                <th className="p-4 border-b border-zinc-800">Назва жанру</th>
                <th className="p-4 border-b border-zinc-800">Slug (URL)</th>
                <th className="p-4 border-b border-zinc-800">Створено</th>
                <th className="p-4 border-b border-zinc-800 text-right">Дії</th>
              </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
              {status === 'failed' ? (
                  <tr><td colSpan={5} className="p-12 text-center text-red-500">{error}</td></tr>
              ) : filteredGenres.length > 0 ? (
                  filteredGenres.map((genre) => (
                      <tr key={genre.id} className="hover:bg-zinc-800/20 transition-colors group">
                        <td className="p-4 text-center">
                          <span className="text-[10px] font-mono text-zinc-600">#{genre.id}</span>
                        </td>
                        <td className="p-4">
                      <span className="font-semibold text-zinc-200 group-hover:text-red-500 transition-colors">
                        {genre.name}
                      </span>
                        </td>
                        <td className="p-4">
                      <span className="bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800 font-mono text-[11px] text-zinc-500">
                        {genre.slug}
                      </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-zinc-400 text-xs">
                            <Calendar size={14} className="text-zinc-600" />
                            {genre.dateCreate
                                ? new Date(genre.dateCreate).toLocaleDateString('uk-UA')
                                : 'Не вказано'}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-1">
                            <button onClick={() => handleEditClick(genre)} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-white transition-all">
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => { setGenreToDelete(genre); setIsDeleteModalOpen(true); }} className="p-2 hover:bg-red-950/30 rounded-lg text-zinc-500 hover:text-red-500 transition-all">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                  ))
              ) : (
                  <tr>
                    <td colSpan={5} className="p-12 text-center">
                      <div className="flex flex-col items-center gap-2 text-zinc-600 italic">
                        <Search size={40} className="opacity-20 mb-2" />
                        <span>{status === 'loading' ? 'Завантаження...' : 'Нічого не знайдено'}</span>
                      </div>
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="p-4 border-t border-zinc-800 flex items-center justify-between bg-zinc-900/50">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
            Всього елементів: {filteredGenres.length}
          </span>
          </div>
        </div>

        {/* Модалки */}
        <AddGenreModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleAddSuccess}
        />

        <EditGenreModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            genre={selectedGenre}
            onSave={handleUpdateSuccess}
        />

        <DeleteGenreModal
            isOpen={isDeleteModalOpen}
            genreId={genreToDelete?.id || null} // Передаємо ID
            genreName={genreToDelete?.name || ''}
            onClose={() => setIsDeleteModalOpen(false)}
            onSuccess={handleDeleteSuccess}
        />
      </div>
  );
}

export default GenresPage;