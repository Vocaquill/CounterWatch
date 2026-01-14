import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Link2, Type } from 'lucide-react';
import { slugify } from '../utils/slugify.ts';
import PageTransition from '../components/PageTransition';
import type { GenreMovieAdmin } from '../types/genre.ts'; // Імпортуй інтерфейс

interface Props {
  isOpen: boolean;
  onClose: () => void;
  genre: GenreMovieAdmin | null; // Жанр, який редагуємо
  onSave: (updatedGenre: GenreMovieAdmin) => void;
}

function EditGenreModal({ isOpen, onClose, genre, onSave }: Props) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  // Коли відкриваємо модалку, підтягуємо дані вибраного жанру
  useEffect(() => {
    if (genre) {
      setName(genre.name);
      setSlug(genre.slug);
    }
  }, [genre, isOpen]);

  // Авто-генерація slug (якщо ти хочеш дозволити змінювати його при редагуванні)
  useEffect(() => {
    if (name && genre && name !== genre.name) {
      setSlug(slugify(name));
    }
  }, [name]);

  const handleSave = () => {
    if (genre) {
      onSave({ ...genre, name, slug });
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <div className="relative z-10 w-full max-w-md">
            <PageTransition>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
                  <div>
                    <h3 className="text-xl font-bold text-white">Редагувати жанр</h3>
                    <p className="text-zinc-500 text-xs mt-1">ID: #{genre?.id}</p>
                  </div>
                  <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                    <X size={24} />
                  </button>
                </div>

                {/* Form */}
                <div className="p-6 space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Type size={14} /> Назва жанру
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 outline-none focus:border-blue-600 transition-all text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Link2 size={14} /> Технічний Slug
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 text-sm">/</span>
                      <input
                        readOnly
                        type="text"
                        value={slug}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-7 pr-4 text-zinc-500 font-mono text-sm cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 bg-zinc-950/50 border-t border-zinc-800 flex gap-3">
                  <button onClick={onClose} className="flex-1 px-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold transition-all">
                    Скасувати
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 active:scale-95"
                  >
                    <Save size={18} /> Оновити
                  </button>
                </div>
              </div>
            </PageTransition>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default EditGenreModal;
