import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Link2, Type, Loader2 } from 'lucide-react';
import { slugify } from '../utils/slugify';
import PageTransition from '../components/PageTransition';

import { useCreateGenreMutation } from '../services/api/apiGenres';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function AddGenreModal({ isOpen, onClose }: Props) {
  const [createGenre, { isLoading }] = useCreateGenreMutation();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setSlug('');
    }
  }, [isOpen]);

  useEffect(() => {
    setSlug(slugify(name));
  }, [name]);

  const handleSubmit = async () => {
    if (!name.trim()) return;

    try {
      await createGenre({ name, slug }).unwrap();
      onClose();
    } catch (e) {
      console.error('Failed to create genre', e);
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
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">

                    <div className="p-6 border-b border-zinc-800 flex justify-between">
                      <h3 className="text-xl font-bold text-white">Новий жанр</h3>
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
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
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
                          onClick={handleSubmit}
                          disabled={isLoading || !name.trim()}
                          className="btn-primary"
                      >
                        {isLoading ? <Loader2 className="animate-spin" /> : <Save />}
                        {isLoading ? 'Збереження...' : 'Зберегти'}
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
