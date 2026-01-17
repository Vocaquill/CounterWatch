import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, Bell, User } from 'lucide-react';

interface HeaderProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

function Header({ isOpen, toggleSidebar }: HeaderProps) {
  const [searchValue, setSearchValue] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  // Слідкуємо за скролом, щоб міняти прозорість хедера
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <header
      className={`h-16 sticky top-0 z-[40] px-6 flex items-center justify-between transition-all duration-500 border-b
  ${scrolled
          ? 'bg-zinc-950/30 backdrop-blur-2xl border-white/5 shadow-2xl shadow-black/40'
          : 'bg-transparent border-transparent'
        }`}
    >
      {/* Ліва частина */}
      <div className="flex items-center gap-6">
        <button
          onClick={toggleSidebar}
          className="p-2.5 hover:bg-zinc-800/50 rounded-xl text-zinc-400 hover:text-white transition-all group active:scale-95"
          title={isOpen ? "Закрити меню" : "Відкрити меню"}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Показуємо назву поточного розділу, якщо не на головній */}
        {!isHomePage && (
          <h2 className="text-sm font-black uppercase tracking-widest text-zinc-500 hidden md:block animate-in fade-in slide-in-from-left-4 duration-500">
            Результати <span className="text-red-600">пошуку</span>
          </h2>
        )}
      </div>

      {/* Центральна частина: Пошук (з'являється тільки не на Home) */}
      <div className="flex-1 flex justify-center max-w-xl px-4">
        {!isHomePage && (
          <form
            onSubmit={handleSearch}
            className="relative w-full group animate-in zoom-in-95 duration-500"
          >
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-600 transition-colors"
              size={18}
            />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Шукати фільми, акторів..."
              className="w-full bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 focus:border-red-600 focus:ring-4 focus:ring-red-600/10 rounded-2xl py-2.5 pl-12 pr-4 text-sm outline-none transition-all placeholder:text-zinc-600"
            />
          </form>
        )}
      </div>

      {/* Права частина: Повідомлення та Профіль */}
      <div className="flex items-center gap-4">
        <button className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-all relative">
          <Bell size={20} />
          {/* Індикатор нових повідомлень */}
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-600 rounded-full border-2 border-zinc-950"></span>
        </button>

        <button
          onClick={() => navigate('/login')}
          className="group flex items-center gap-2 p-1 pr-3 hover:bg-zinc-900 rounded-2xl transition-all border border-transparent hover:border-zinc-800"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-white shadow-lg shadow-red-900/20 group-hover:scale-105 transition-transform">
            <User size={18} fill="currentColor" />
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-black uppercase tracking-tighter leading-none">Користувач</p>
            <p className="text-[10px] text-zinc-500 font-bold uppercase leading-none mt-1">Premium</p>
          </div>
        </button>
      </div>
    </header>
  );
}

export default Header;
