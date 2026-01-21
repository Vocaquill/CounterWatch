import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Link2, Type, Loader2 } from 'lucide-react';
import { slugify } from '../utils/slugify';
import PageTransition from '../components/PageTransition';

import { useEditGenreMutation } from '../services/api/apiGenres';
import type { IGenreItem } from '../types/genre';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  genre: IGenreItem | null;
}

function EditGenreModal({ isOpen, onClose, genre }: Props) {
  const [editGenre, { isLoading }] = useEditGenreMutation();

  // 🔑 ініціалізуємо state ОДИН раз з props
  const [name, setName] = useState(() => genre?.name ?? '');

  // 🔥 slug — похідне значення
  const slug = slugify(name);

  // 🔄 якщо відкрили модалку з ІНШИМ жанром
  if (isOpen && genre && name !== genre.name) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    setName(genre.name);
  }

  const handleSave = async () => {
    if (!genre || !name.trim()) return;

    try {
      await editGenre({
        id: genre.id,
        name,
        slug,
      }).unwrap();
      onClose();
    } catch (e) {
      console.error('Failed to update genre', e);
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
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl">

                    <div className="p-6 border-b border-zinc-800 flex justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white">Редагувати жанр</h3>
                        <p className="text-xs text-zinc-500">ID: #{genre?.id}</p>
                      </div>
                      <button onClick={onClose} disabled={isLoading}>
                        <X size={24} />
                      </button>
                    </div>

                    <div className="p-6 space-y-5">
                      <div>
                        <label className="label">
                          <Type size={14} /> Назва жанру
                        </label>
                        <input
                            value={name}
                            disabled={isLoading}
                            onChange={(e) => setName(e.target.value)}
                            className="input"
                        />
                      </div>

                      <div>
                        <label className="label">
                          <Link2 size={14} /> Slug
                        </label>
                        <input
                            readOnly
                            value={slug}
                            className="input font-mono opacity-60"
                        />
                      </div>
                    </div>

                    <div className="p-6 border-t border-zinc-800 flex gap-3">
                      <button onClick={onClose} className="btn-secondary">
                        Скасувати
                      </button>
                      <button
                          onClick={handleSave}
                          disabled={isLoading || !name.trim()}
                          className="btn-primary"
                      >
                        {isLoading ? <Loader2 className="animate-spin" /> : <Save />}
                        {isLoading ? 'Оновлення...' : 'Оновити'}
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
