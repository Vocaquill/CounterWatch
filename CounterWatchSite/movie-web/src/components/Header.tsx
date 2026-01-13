import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Додали useLocation
import { Search, Menu, X } from 'lucide-react';

interface HeaderProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

function Header({ isOpen, toggleSidebar }: HeaderProps) {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Отримуємо поточний шлях

  // Перевіряємо, чи ми на головній сторінці
  const isHomePage = location.pathname === '/';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-10 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-zinc-400 font-medium hidden sm:block">Меню</h1>
      </div>

      {/* Пошук відображається ТІЛЬКИ якщо ми НЕ на головній сторінці */}
      {!isHomePage ? (
        <form
          onSubmit={handleSearch}
          className="relative max-w-md w-full mx-4 animate-in fade-in slide-in-from-top-2 duration-500 ease-out"
        >
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            size={18}
          />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Шукати фільми..."
            className="w-full bg-zinc-800 border border-transparent focus:border-red-600 rounded-full py-1.5 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-zinc-500"
          />
        </form>
      ) : (
        <div className="flex-1"></div>
      )}

      <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700"></div>
    </header>
  );
}

export default Header;
