import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header' // Імпортуємо хедер
import PageTransition from '../components/PageTransition';
function AppLayout() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)
  const location = useLocation();
  return (
    <div className="flex min-h-screen bg-zinc-900 text-white">
      <Sidebar isOpen={isOpen} />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Передаємо стан і функцію в Header */}
        <Header isOpen={isOpen} toggleSidebar={toggleSidebar} />

        <div className="p-6">
          {/* Анімація спрацьовуватиме при кожній зміні path */}
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </div>
      </main>
    </div>
  )
}

export default AppLayout
