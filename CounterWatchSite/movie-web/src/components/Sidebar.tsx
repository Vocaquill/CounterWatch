import { NavLink } from 'react-router-dom';
// Якщо використовуєте іконки (наприклад, lucide-react)
import { Home, Film, Star } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

function Sidebar({ isOpen }: SidebarProps) {
  const menuItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Movies', path: '/movies', icon: <Film size={20} /> },
    { name: 'Favorites', path: '/favorites', icon: <Star size={20} /> },
  ];

  return (
    <aside className={`bg-zinc-950 border-r border-zinc-800 p-4 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}
     sticky top-0 h-screen flex flex-col
    `}>
      <div className="h-16 flex items-center mb-4 overflow-hidden">
        {/* Червоний квадрат з літерою або іконкою */}
        <div className="min-w-[48px] h-12 bg-red-600 rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-red-900/20">
          CW
        </div>

        {/* Текст назви, який плавно з'являється/зникає */}
        <h2 className={`
            ml-3 text-xl font-bold transition-all duration-300 whitespace-nowrap
            ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'}`}>
          CounterWatch
        </h2>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center p-3 rounded-lg transition-all
              ${isActive
                ? 'bg-red-600 text-white' // Стилі для активної сторінки
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white' // Стилі для звичайного стану
              }
            `}
          >
            <span className="min-w-[24px]">{item.icon}</span>
            <span className={`ml-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
              {item.name}
            </span>

          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
