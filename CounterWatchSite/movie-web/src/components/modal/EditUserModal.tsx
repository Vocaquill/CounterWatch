import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, User, Mail, Shield, ShieldCheck } from 'lucide-react';

interface UserItem {
  id: number;
  fullName: string;
  email: string;
  roles: string[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: UserItem | null;
}

function EditUserModal({ isOpen, onClose, user }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    role: 'User'
  });

  // Синхронізація стейту форми з вибраним користувачем
  useEffect(() => {
    if (user && isOpen) {
      setForm({
        fullName: user.fullName,
        email: user.email,
        role: user.roles.includes('Admin') ? 'Admin' : 'User'
      });
    }
  }, [user, isOpen]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Імітація запиту до бекенду
    setTimeout(() => {
      console.log("Оновлені дані користувача:", { id: user?.id, ...form });
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative z-10 w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/20">
              <div>
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                  Редагувати <span className="text-red-600 font-outline-1 text-transparent">профіль</span>
                </h3>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">
                  ID Користувача: #{user.id}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-full text-zinc-500 hover:text-white transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-5">

              {/* ПІБ */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Повне ім'я</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-red-600 transition-colors" size={18} />
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={form.fullName}
                    onChange={handleChange}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20 transition-all placeholder:text-zinc-700"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Email адреса</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-red-600 transition-colors" size={18} />
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20 transition-all placeholder:text-zinc-700"
                  />
                </div>
              </div>

              {/* Роль (Toggle) */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Права доступу</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, role: 'User' }))}
                    className={`py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border transition-all flex items-center justify-center gap-2 ${form.role === 'User'
                        ? "bg-zinc-800 border-zinc-700 text-white shadow-lg"
                        : "bg-zinc-900/30 border-zinc-800 text-zinc-600 hover:text-zinc-400"
                      }`}
                  >
                    <Shield size={14} />
                    Користувач
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, role: 'Admin' }))}
                    className={`py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border transition-all flex items-center justify-center gap-2 ${form.role === 'Admin'
                        ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/20"
                        : "bg-zinc-900/30 border-zinc-800 text-zinc-600 hover:text-red-500/50"
                      }`}
                  >
                    <ShieldCheck size={14} />
                    Адміністратор
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 flex gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 rounded-2xl bg-zinc-900 text-zinc-400 font-bold hover:bg-zinc-800 hover:text-white transition-all uppercase text-xs tracking-widest"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-[2] py-4 rounded-2xl bg-white text-black font-black hover:bg-red-600 hover:text-white transition-all uppercase text-xs tracking-widest disabled:opacity-50 flex items-center justify-center shadow-xl"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    'Зберегти зміни'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default EditUserModal;
