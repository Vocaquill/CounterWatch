import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { Menu, X } from 'lucide-react' // Рекомендую встановити lucide-react для іконок

function AppLayout() {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <div className="flex min-h-screen bg-zinc-900 text-white overflow-x-hidden">
      {/* Sidebar з пропсами */}
      <Sidebar isOpen={isOpen} />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Хедер або просто кнопка перемикання */}
        <header className="p-4 border-b border-zinc-800 flex items-center bg-zinc-900/50 backdrop-blur-md sticky top-0 z-10">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <span className="ml-4 font-semibold text-zinc-400">Меню</span>
        </header>

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AppLayout
