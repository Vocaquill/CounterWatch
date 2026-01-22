import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, UserPlus, Edit2, Trash2, Mail, Shield, ShieldAlert, X, Loader2, Chrome, Key } from 'lucide-react';

import type { RootState, AppDispatch } from '../../store';

// Тимчасовий інтерфейс на основі твоїх даних
interface UserAdmin {
  id: number;
  fullName: string;
  email: string;
  image: string;
  isLoginGoogle: boolean;
  isLoginPassword: boolean;
  roles: string[];
  loginTypes: string[];
}

function UsersPage() {
  const dispatch = useDispatch<AppDispatch>();

  // Заміни на реальний useSelector для користувачів
  // const { items: users, status, error } = useSelector((state: RootState) => state.users);

  // Тимчасові дані для демонстрації, поки не підключиш Redux
  const [users] = useState<UserAdmin[]>([
    {
      id: 1,
      fullName: "Адмін Системний",
      email: "admin@example.com",
      image: "https://ui-avatars.com/api/?name=Admin&background=random",
      isLoginGoogle: false,
      isLoginPassword: true,
      roles: ["Admin"],
      loginTypes: ["Password"]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const status = 'idle'; // заглушка

  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toString().includes(searchTerm)
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Користувачі</h1>
          <p className="text-zinc-500 text-sm">Управління обліковими записами та правами доступу</p>
        </div>
        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-red-900/20">
          <UserPlus size={20} />
          Додати користувача
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 backdrop-blur-sm flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input
            type="text"
            value={searchTerm}
            placeholder="Пошук за ім'ям, email або ID..."
            className="w-full bg-zinc-950 border border-zinc-700 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-red-600 transition-all text-sm text-zinc-200"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {searchTerm && (
          <button onClick={() => setSearchTerm('')} className="p-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-xl">
            <X size={20} />
          </button>
        )}
      </div>

      {/* TABLE */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-800/50 text-zinc-500 text-[11px] uppercase tracking-[0.1em] font-bold">
              <tr>
                <th className="p-4 border-b border-zinc-800 text-center w-20">ID</th>
                <th className="p-4 border-b border-zinc-800 w-24">Аватар</th>
                <th className="p-4 border-b border-zinc-800">Користувач</th>
                <th className="p-4 border-b border-zinc-800">Ролі</th>
                <th className="p-4 border-b border-zinc-800">Метод входу</th>
                <th className="p-4 border-b border-zinc-800 text-right">Дії</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-zinc-800/20 transition-colors group">
                  <td className="p-4 text-center">
                    <span className="text-[10px] font-mono text-zinc-600">#{user.id}</span>
                  </td>
                  <td className="p-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden shadow-inner flex items-center justify-center">
                      {user.image ? (
                        <img src={user.image} alt={user.fullName} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs text-zinc-500 uppercase">{user.fullName.charAt(0)}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-zinc-200 group-hover:text-red-500 transition-colors">
                        {user.fullName}
                      </span>
                      <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                        <Mail size={12} />
                        {user.email}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1 flex-wrap">
                      {user.roles.map((role) => (
                        <span key={role} className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase flex items-center gap-1 ${role === 'Admin' ? 'bg-red-600/10 text-red-500 border border-red-600/20' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                          }`}>
                          {role === 'Admin' ? <Shield size={10} /> : <ShieldAlert size={10} />}
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {user.isLoginGoogle && (
                        <div title="Google Login" className="text-zinc-400 hover:text-white transition-colors">
                          <Chrome size={16} />
                        </div>
                      )}
                      {user.isLoginPassword && (
                        <div title="Password Login" className="text-zinc-400 hover:text-white transition-colors">
                          <Key size={16} />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-white transition-all">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 hover:bg-red-950/30 rounded-lg text-zinc-500 hover:text-red-500 transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-zinc-800 flex items-center justify-between bg-zinc-900/50">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
            Всього користувачів: {filteredUsers.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
