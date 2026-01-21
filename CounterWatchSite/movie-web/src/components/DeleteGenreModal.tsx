import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Loader2 } from 'lucide-react';
import PageTransition from '../components/PageTransition';

import { useDeleteGenreMutation } from '../services/api/apiGenres';

interface Props {
  isOpen: boolean;
  genreId: number | null;
  genreName: string;
  onClose: () => void;
}

function DeleteGenreModal({ isOpen, genreId, genreName, onClose }: Props) {
  const [deleteGenre, { isLoading }] = useDeleteGenreMutation();

  const handleDelete = async () => {
    if (!genreId) return;

    try {
      await deleteGenre({ id: genreId }).unwrap();
      onClose();
    } catch (e) {
      console.error('Failed to delete genre', e);
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
                  onClick={!isLoading ? onClose : undefined}
                  className="absolute inset-0 bg-black/90 backdrop-blur-md"
              />

              <div className="relative z-10 w-full max-w-sm">
                <PageTransition>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl">

                    <div className="p-6 text-center">
                      <div className="icon-danger">
                        {isLoading ? <Loader2 className="animate-spin" /> : <AlertTriangle />}
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2">
                        Видалити жанр?
                      </h3>
                      <p className="text-zinc-500">
                        Ви збираєтеся видалити жанр <b>"{genreName}"</b>
                      </p>
                    </div>

                    <div className="p-4 border-t border-zinc-800 flex gap-3">
                      <button
                          onClick={onClose}
                          disabled={isLoading}
                          className="btn-secondary"
                      >
                        Скасувати
                      </button>
                      <button
                          onClick={handleDelete}
                          disabled={isLoading}
                          className="btn-danger"
                      >
                        {isLoading ? 'Видалення...' : 'Видалити'}
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
