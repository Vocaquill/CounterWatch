import { useState, useEffect } from 'react';
import { X, Save, Link2, Type } from 'lucide-react';
import { slugify } from '../utils/slugify.ts'
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function AddGenreModal({ isOpen, onClose }: Props) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  // Автоматично оновлюємо slug при зміні назви
  useEffect(() => {
    setSlug(slugify(name));
  }, [name]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">Новий жанр</h3>
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
              placeholder="Наприклад: Бойовик"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20 transition-all text-white"
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
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-7 pr-4 outline-none focus:border-zinc-500 transition-all text-zinc-400 font-mono text-sm"
              />
            </div>
            <p className="mt-2 text-[10px] text-zinc-600 italic">
              * Створюється автоматично, використовується для URL-адреси.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-zinc-950/50 border-t border-zinc-800 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold transition-all active:scale-95"
          >
            Скасувати
          </button>
          <button
            className="flex-2 px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/20 active:scale-95"
          >
            <Save size={18} /> Зберегти
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddGenreModal;


