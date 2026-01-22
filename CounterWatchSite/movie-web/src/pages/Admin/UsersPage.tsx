import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Search, UserPlus, Edit2, Trash2, Mail, Shield, ShieldAlert, X, Chrome, Key } from 'lucide-react';

// Імпортуємо ваші нові автономні компоненти
import AddUserModal from '../../components/modal/AddUserModal';
import EditUserModal from '../../components/modal/EditUserModal';
import DeleteUserModal from '../../components/modal/DeleteUserModal';

import type { AppDispatch } from '../../store';

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

  // Стейт для модалок
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<UserAdmin | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Пошук
  const [searchTerm, setSearchTerm] = useState('');

  // Тимчасові дані
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

  // --- ОБРОБНИКИ ПОДІЙ ---

  const handleAdd = () => {
    setIsAddOpen(true);
  };

  const handleEdit = (user: UserAdmin) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const handleDeleteClick = (user: UserAdmin) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const onConfirmDelete = async () => {
    if (!selectedUser) return;
    setIsDeleting(true);

    // Імітація видалення
    setTimeout(() => {
      console.log("Видалено користувача:", selectedUser.id);
      setIsDeleting(false);
      setIsDeleteOpen(false);
    }, 1000);
  };

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
          <h1 className="text-2xl font-bold text-white tracking-tight italic uppercase font-black">Користувачі</h1>
          <p className="text-zinc-500 text-sm font-medium">Управління обліковими записами та правами доступу</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl font-black uppercase text-xs tracking-widest transition-all active:scale-95 shadow-lg shadow-red-900/20"
        >
          <UserPlus size={18} />
          Додати користувача
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-zinc-900/50 p-4 rounded-[2rem] border border-zinc-800 backdrop-blur-sm flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input
            type="text"
            value={searchTerm}
            placeholder="Пошук за ім'ям, email або ID..."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-red-600 transition-all text-sm text-zinc-200"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {searchTerm && (
          <button onClick={() => setSearchTerm('')} className="p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-xl transition-colors">
            <X size={20} />
          </button>
        )}
      </div>

      {/* TABLE */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-800/30 text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-black">
              <tr>
                <th className="p-6 border-b border-zinc-800 text-center w-20">ID</th>
                <th className="p-6 border-b border-zinc-800 w-24">Аватар</th>
                <th className="p-6 border-b border-zinc-800">Користувач</th>
                <th className="p-6 border-b border-zinc-800">Ролі</th>
                <th className="p-6 border-b border-zinc-800">Метод входу</th>
                <th className="p-6 border-b border-zinc-800 text-right">Дії</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-6 text-center">
                    <span className="text-[10px] font-mono font-bold text-zinc-600 group-hover:text-zinc-400 transition-colors">#{user.id}</span>
                  </td>
                  <td className="p-6">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 overflow-hidden shadow-inner flex items-center justify-center group-hover:border-red-600/50 transition-all">
                      {user.image ? (
                        <img src={user.image} alt={user.fullName} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      ) : (
                        <span className="text-lg font-black text-zinc-600 uppercase italic">{user.fullName.charAt(0)}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-zinc-200 group-hover:text-white transition-colors">
                        {user.fullName}
                      </span>
                      <div className="flex items-center gap-1.5 text-zinc-500 text-xs mt-0.5">
                        <Mail size={12} className="text-zinc-600" />
                        {user.email}
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex gap-2 flex-wrap">
                      {user.roles.map((role) => (
                        <span key={role} className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm ${role === 'Admin'
                          ? 'bg-red-600/10 text-red-500 border border-red-600/20'
                          : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                          }`}>
                          {role === 'Admin' ? <Shield size={10} strokeWidth={3} /> : <ShieldAlert size={10} strokeWidth={3} />}
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      {user.isLoginGoogle && (
                        <div title="Google Login" className="text-zinc-500 hover:text-white transition-all transform hover:scale-110">
                          <Chrome size={18} />
                        </div>
                      )}
                      {user.isLoginPassword && (
                        <div title="Password Login" className="text-zinc-500 hover:text-white transition-all transform hover:scale-110">
                          <Key size={18} />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                      <button
                        onClick={() => handleEdit(user)}
                        className="p-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-zinc-400 hover:text-white transition-all shadow-lg"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user)}
                        className="p-2.5 bg-zinc-800 hover:bg-red-600/20 rounded-xl text-zinc-400 hover:text-red-500 transition-all shadow-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-zinc-800 flex items-center justify-between bg-zinc-900/30">
          <span className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em]">
            Database Records: <span className="text-zinc-400">{filteredUsers.length}</span>
          </span>
        </div>
      </div>

      {/* --- МОДАЛКИ --- */}

      {/* Модалка створення */}
      <AddUserModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
      />

      {/* Модалка редагування */}
      <EditUserModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        user={selectedUser}
      />

      {/* Універсальна модалка видалення */}
      {/* Універсальна модалка видалення */}
      <DeleteUserModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={onConfirmDelete}
        isLoading={isDeleting}
        title="Видалити акаунт?"
        description={
          selectedUser
            ? `Ви збираєтеся назавжди видалити користувача ${selectedUser.fullName}. Всі дані будуть втрачені.`
            : ""
        }
      />

    </div>
  );
}

export default UsersPage;
