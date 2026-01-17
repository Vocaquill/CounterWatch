import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Camera, ArrowRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

function RegisterPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Створюємо FormData для відправки файлу та тексту
    const data = new FormData();
    data.append('FirstName', formData.firstName);
    data.append('LastName', formData.lastName);
    data.append('Email', formData.email);
    data.append('Password', formData.password);
    if (imageFile) {
      data.append('ImageFile', imageFile);
    }

    console.log('Sending data to API...');
    // Тут буде твій запит до API
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden py-12">
      {/* Background Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/20 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl z-10 px-6"
      >
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Назад до входу
        </button>

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">
            Створити <span className="text-red-600">акаунт</span>
          </h1>
          <p className="text-zinc-500 mt-2">Приєднуйся до спільноти CounterWatch</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900/30 p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-md">

          {/* Avatar Upload */}
          <div className="flex flex-col items-center mb-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative w-24 h-24 rounded-3xl bg-zinc-800 border-2 border-dashed border-zinc-700 flex items-center justify-center cursor-pointer overflow-hidden group hover:border-red-600 transition-all"
            >
              {imagePreview ? (
                <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <Camera className="text-zinc-500 group-hover:text-red-600 transition-colors" size={32} />
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-[10px] font-bold uppercase">Змінити</span>
              </div>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest mt-3 font-bold">Фото профілю</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Ім'я</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-red-600 transition-colors" size={18} />
                <input
                  type="text"
                  required
                  placeholder="Ivan"
                  className="w-full bg-black/40 border border-white/5 focus:border-red-600 focus:ring-4 focus:ring-red-600/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none transition-all"
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Прізвище</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-red-600 transition-colors" size={18} />
                <input
                  type="text"
                  required
                  placeholder="Ivanov"
                  className="w-full bg-black/40 border border-white/5 focus:border-red-600 focus:ring-4 focus:ring-red-600/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none transition-all"
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Електронна пошта</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-red-600 transition-colors" size={18} />
              <input
                type="email"
                required
                placeholder="ivan@example.com"
                className="w-full bg-black/40 border border-white/5 focus:border-red-600 focus:ring-4 focus:ring-red-600/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none transition-all"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Пароль</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-red-600 transition-colors" size={18} />
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-black/40 border border-white/5 focus:border-red-600 focus:ring-4 focus:ring-red-600/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none transition-all"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black uppercase py-4 rounded-2xl shadow-xl shadow-red-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
          >
            Створити акаунт <ArrowRight size={20} />
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default RegisterPage;
