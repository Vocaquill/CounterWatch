import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Loader2 } from 'lucide-react';
import PageTransition from '../components/PageTransition';

// Імпорти для Redux
import type { AppDispatch } from '../store';
import { deleteGenre } from '../store/slices/genresSlice.ts';

interface Props {
  isOpen: boolean;
  genreId: number | null; // Додаємо це
  genreName: string;
  onClose: () => void;
  onSuccess: () => void;  // Замінюємо onConfirm на onSuccess
}

function DeleteGenreModal({ isOpen, genreId, genreName, onClose, onSuccess }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (genreId && !isDeleting) {
      setIsDeleting(true);
      try {
        // Викликаємо видалення в Redux
        await dispatch(deleteGenre(genreId)).unwrap();

        onSuccess(); // Очищаємо вибраний жанр у GenresPage
        onClose();   // Закриваємо модалку
      } catch (error) {
        console.error("Помилка при видаленні жанру:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
      <AnimatePresence>
        {isOpen && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={!isDeleting ? onClose : undefined}
                  className="absolute inset-0 bg-black/90 backdrop-blur-md"
              />

              <div className="relative z-10 w-full max-w-sm">
                <PageTransition>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="p-6 text-center">
                      <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                        {isDeleting ? (
                            <Loader2 size={32} className="animate-spin" />
                        ) : (
                            <AlertTriangle size={32} />
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2">Видалити жанр?</h3>
                      <p className="text-zinc-500 text-sm">
                        Ви збираєтеся видалити жанр <span className="text-zinc-200 font-bold">"{genreName}"</span>.
                        Цю дію неможливо буде скасувати.
                      </p>
                    </div>

                    <div className="p-4 bg-zinc-950/50 border-t border-zinc-800 flex gap-3">
                      <button
                          onClick={onClose}
                          disabled={isDeleting}
                          className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl transition-all disabled:opacity-50"
                      >
                        Скасувати
                      </button>
                      <button
                          onClick={handleDelete}
                          disabled={isDeleting}
                          className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-900/20 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isDeleting ? 'Видалення...' : 'Видалити'}
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

export default DeleteGenreModal;