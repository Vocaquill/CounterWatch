import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      {/* Фоновий ефект: розмиті кольорові плями */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10 px-6"
      >
        {/* Логотип */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center font-black text-2xl shadow-2xl shadow-red-600/40 mb-4">
            CW
          </div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">
            Вітаємо у <span className="text-red-600">CounterWatch</span>
          </h1>
          <p className="text-zinc-500 text-sm mt-2">Введіть свої дані для доступу до кіно</p>
        </div>

        {/* Форма */}
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-600 transition-colors" size={20} />
              <input
                type="email"
                placeholder="example@mail.com"
                className="w-full bg-zinc-900/50 border border-white/5 focus:border-red-600 focus:ring-4 focus:ring-red-600/10 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all placeholder:text-zinc-700"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Пароль</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-600 transition-colors" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-zinc-900/50 border border-white/5 focus:border-red-600 focus:ring-4 focus:ring-red-600/10 rounded-2xl py-4 pl-12 pr-12 outline-none transition-all placeholder:text-zinc-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-xs font-bold text-red-600 hover:text-red-500 transition-colors uppercase tracking-widest">
              Забули пароль?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black uppercase py-4 rounded-2xl shadow-xl shadow-red-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
          >
            Увійти <ArrowRight size={20} />
          </button>
        </form>
        {/* Розділювач */}
        <div className="relative my-8 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <span className="relative px-4 bg-black text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
            Або продовжити з
          </span>
        </div>

        {/* Кнопка Google */}
        <button
          type="button"
          onClick={() => console.log('Google Login clicked')}
          className="w-full bg-white text-black hover:bg-zinc-200 font-black uppercase py-4 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-3"
        >
          <GoogleIcon /> Google
        </button>



        {/* Реєстрація */}
        <p className="text-center mt-8 text-zinc-500 text-sm font-medium">
          Немає акаунту? {' '}
          <button className="text-white font-black hover:text-red-600 transition-colors uppercase italic"
            onClick={() => navigate('/register')}
          >
            Створити зараз
          </button>
        </p>
      </motion.div>
    </div>
  );
}

export default LoginPage;
