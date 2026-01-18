import { useState } from 'react';
import { User, Mail, Shield, Settings, LogOut, Edit2, Camera } from 'lucide-react';
import { motion } from 'framer-motion';

function ProfilePage() {
  // Тимчасові дані користувача (потім прийдуть з API/Store)
  const [user, setUser] = useState({
    firstName: "Ivan",
    lastName: "Ivanov",
    email: "ivanov@example.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
  });

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">

        {/* --- HEADER PROFILE --- */}
        <section className="relative mb-12 flex flex-col md:flex-row items-center gap-8 bg-zinc-900/20 p-8 rounded-[3rem] border border-white/5 backdrop-blur-sm">
          <div className="relative group">
            <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-2 border-red-600 shadow-2xl shadow-red-600/20">
              <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <button className="absolute -bottom-2 -right-2 p-3 bg-red-600 rounded-2xl hover:bg-red-700 transition-all shadow-xl">
              <Camera size={18} />
            </button>
          </div>

          <div className="text-center md:text-left space-y-2">
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">
              {user.firstName} <span className="text-red-600">{user.lastName}</span>
            </h1>
            <p className="text-zinc-500 font-medium flex items-center justify-center md:justify-start gap-2">
              <Mail size={16} /> {user.email}
            </p>
            <div className="flex gap-2 pt-2 justify-center md:justify-start">
              <span className="px-3 py-1 bg-red-600/10 border border-red-600/20 rounded-full text-[10px] font-black uppercase text-red-500 tracking-widest">
                Premium Member
              </span>
            </div>
          </div>

          <button className="md:ml-auto flex items-center gap-2 bg-white text-black px-6 py-3 rounded-2xl font-black uppercase text-xs tracking-tighter hover:bg-red-600 hover:text-white transition-all">
            <Edit2 size={16} /> Редагувати
          </button>
        </section>

        {/* --- GRID SETTINGS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Особиста інформація */}
          <motion.div whileHover={{ y: -5 }} className="bg-zinc-900/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-600/20 rounded-lg text-red-500">
                <User size={20} />
              </div>
              <h2 className="text-lg font-black uppercase italic tracking-tight">Дані акаунту</h2>
            </div>

            <div className="space-y-4">
              <InfoRow label="Ім'я" value={user.firstName} />
              <InfoRow label="Прізвище" value={user.lastName} />
              <InfoRow label="Логін (Email)" value={user.email} />
            </div>
          </motion.div>

          {/* Безпека та швидкі дії */}
          <div className="space-y-6">
            <motion.div whileHover={{ y: -5 }} className="bg-zinc-900/40 p-8 rounded-[2.5rem] border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-600/20 rounded-lg text-red-500">
                  <Shield size={20} />
                </div>
                <h2 className="text-lg font-black uppercase italic tracking-tight">Безпека</h2>
              </div>
              <button className="w-full text-left p-4 rounded-2xl border border-white/5 hover:bg-white/5 transition-all flex items-center justify-between group">
                <span className="text-sm font-bold text-zinc-300">Змінити пароль</span>
                <Settings size={18} className="text-zinc-600 group-hover:text-red-500" />
              </button>
            </motion.div>

            <button className="w-full flex items-center justify-center gap-3 p-6 rounded-[2rem] border border-red-600/20 text-red-500 font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all group">
              <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
              Вийти з системи
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

// Допоміжний компонент для рядків інформації
function InfoRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="border-b border-white/5 pb-3">
      <p className="text-[10px] font-black uppercase text-zinc-600 tracking-widest mb-1">{label}</p>
      <p className="text-white font-bold">{value}</p>
    </div>
  );
}

export default ProfilePage;
