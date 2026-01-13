import { useState } from 'react';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Link2,
  X
} from 'lucide-react';
import AddGenreModal from '../../components/AddGenreModal.tsx'
// 1. Інтерфейс даних (клас)
interface GenreMovieAdmin {
  id: number;           // bigint в БД
  name: string;
  slug: string;
  movieCount: number;
  dateCreate: Date;     // тип часу
  isDelete: boolean;
}

function GenresPage() {
  // 2. Стейт для пошуку
  const [searchTerm, setSearchTerm] = useState('');
  const [slugSearch, setSlugSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Стан для модалки
  // 3. Тимчасові дані (Mock Data)
  const [genres] = useState<GenreMovieAdmin[]>([
    {
      id: 10023456789,
      name: "Бойовик",
      slug: "action-movies",
      movieCount: 142,
      dateCreate: new Date('2024-01-10T12:00:00'),
      isDelete: false
    },
    {
      id: 10023456790,
      name: "Комедія",
      slug: "comedy",
      movieCount: 85,
      dateCreate: new Date('2024-02-15T15:30:00'),
      isDelete: false
    },
    {
      id: 10023456791,
      name: "Фантастика",
      slug: "sci-fi",
      movieCount: 210,
      dateCreate: new Date('2024-03-01T10:15:00'),
      isDelete: false
    }
  ]);

  // 4. Логіка фільтрації
  const filteredGenres = genres.filter(genre => {
    const matchesMain =
      genre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      genre.id.toString().includes(searchTerm);

    const matchesSlug =
      genre.slug.toLowerCase().includes(slugSearch.toLowerCase());

    return matchesMain && matchesSlug;
  });

  // Функція скидання фільтрів
  const resetFilters = () => {
    setSearchTerm('');
    setSlugSearch('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">

      {/* HEADER: Заголовок та кнопка створення */}
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

      {/* TOOLS: Подвійний пошук */}
      <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 backdrop-blur-sm flex flex-wrap items-center gap-4">

        {/* Пошук по назві або ID */}
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

        {/* Пошук по слагу (менший) */}
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

        {/* Кнопка скидання (якщо є що скидати) */}
        {(searchTerm || slugSearch) && (
          <button
            onClick={resetFilters}
            className="p-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-xl transition-colors"
            title="Очистити фільтри"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* TABLE: Список жанрів */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-800/50 text-zinc-500 text-[11px] uppercase tracking-[0.1em] font-bold">
              <tr>
                <th className="p-4 border-b border-zinc-800">ID</th>
                <th className="p-4 border-b border-zinc-800">Назва жанру</th>
                <th className="p-4 border-b border-zinc-800">Slug (URL)</th>
                <th className="p-4 border-b border-zinc-800">Створено</th>
                <th className="p-4 border-b border-zinc-800 text-right">Дії</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filteredGenres.length > 0 ? (
                filteredGenres.map((genre) => (
                  <tr key={genre.id} className="hover:bg-zinc-800/20 transition-colors group">
                    {/* ID */}
                    <td className="p-4 text-center w-20">
                      <span className="text-[10px] font-mono text-zinc-600">#{genre.id}</span>
                    </td>

                    {/* Name */}
                    <td className="p-4">
                      <span className="font-semibold text-zinc-200 group-hover:text-red-500 transition-colors">
                        {genre.name}
                      </span>
                    </td>

                    {/* Slug */}
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <span className="bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800 font-mono text-[11px] text-zinc-500">
                          {genre.slug}
                        </span>
                      </div>
                    </td>

                    {/* Date Create */}
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-zinc-400 text-xs">
                        <Calendar size={14} className="text-zinc-600" />
                        {genre.dateCreate.toLocaleDateString('uk-UA')}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-white transition-all">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-2 hover:bg-red-950/30 rounded-lg text-zinc-500 hover:text-red-500 transition-all">
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
                      <span>Нічого не знайдено за вашим запитом</span>
                      <button
                        onClick={resetFilters}
                        className="text-red-500 text-sm hover:underline mt-2 not-italic"
                      >
                        Скинути всі фільтри
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION: Керування сторінками */}
        <div className="p-4 border-t border-zinc-800 flex items-center justify-between bg-zinc-900/50">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
            Сторінка 1 з 1
          </span>
          <div className="flex gap-2">
            <button className="p-2 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-colors disabled:opacity-30" disabled>
              <ChevronLeft size={18} />
            </button>
            <button className="p-2 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-colors disabled:opacity-30" disabled>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
      <AddGenreModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default GenresPage;
