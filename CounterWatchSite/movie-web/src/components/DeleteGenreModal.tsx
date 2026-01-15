import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import PageTransition from '../components/PageTransition';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  genreName: string;
}

function DeleteGenreModal({ isOpen, onClose, onConfirm, genreName }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Фон */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          <div className="relative z-10 w-full max-w-sm">
            <PageTransition>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-6 text-center">
                  {/* Іконка попередження */}
                  <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                    <AlertTriangle size={32} />
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
                    className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl transition-all"
                  >
                    Скасувати
                  </button>
                  <button
                    onClick={() => {
                      onConfirm();
                      onClose();
                    }}
                    className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-900/20 transition-all active:scale-95"
                  >
                    Видалити
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
