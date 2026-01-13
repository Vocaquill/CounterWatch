//Program
import { Routes, Route } from 'react-router-dom'
//user
import UserHomePage from './pages/UserHomePage.tsx'
//admin

//For all 
import AppLayout from './layouts/AppLayout.tsx'
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<UserHomePage />} />
        <Route path="/movie/:id" element={<h1>Movie page</h1>} />
        <Route path="search" element={<SearchPage />} />
      </Route>
    </Routes>
  )
}

export default App
