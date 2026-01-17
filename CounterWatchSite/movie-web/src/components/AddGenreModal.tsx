import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Link2, Type, Loader2 } from 'lucide-react';
import { slugify } from '../utils/slugify.ts';
import PageTransition from '../components/PageTransition';

// Імпорти для Redux
import type { AppDispatch } from '../store';
import { addGenre } from '../store/slices/genresSlice.ts';

interface Props {
  isOpen: boolean;
  onSave: () => void;
  onClose: () => void;
}

function AddGenreModal({ isOpen, onClose, onSave }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setSlug('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  useEffect(() => {
    setSlug(slugify(name));
  }, [name]);

  const handleSubmit = async () => {
    if (name.trim() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await dispatch(addGenre({ name, slug })).unwrap();

        onSave();
        onClose();
      } catch (error) {
        // Помилка вже обробляється в слайсі, але тут можна додати локальне сповіщення
        console.error("Failed to add genre:", error);
      } finally {
        setIsSubmitting(false);
      }
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
                <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-white">Новий жанр</h3>
                  <button
                    onClick={onClose}
                    className="text-zinc-500 hover:text-white transition-colors"
                    disabled={isSubmitting}
                  >
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
                      disabled={isSubmitting}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                      placeholder="Наприклад: Бойовик"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20 transition-all text-white disabled:opacity-50"
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
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-7 pr-4 outline-none text-zinc-400 font-mono text-sm cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 bg-zinc-950/50 border-t border-zinc-800 flex gap-3">
                  <button
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold transition-all active:scale-95 disabled:opacity-50"
                  >
                    Скасувати
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !name.trim()}
                    className="flex-2 px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/20 active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Save size={18} />
                    )}
                    {isSubmitting ? 'Збереження...' : 'Зберегти'}
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

export default AddGenreModal;
