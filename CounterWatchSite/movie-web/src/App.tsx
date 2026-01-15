//Program
import { Routes, Route } from 'react-router-dom'
//user
import UserHomePage from './pages/UserHomePage.tsx'
import MoviePage from './pages/MoviePage';
//admin
import AdminLayout from './layouts/AdminLayout.tsx'
import GenresPage from './pages/Admin/GenresPage.tsx'
import Dashboard from './pages/Admin/Dashboard.tsx'
//For all 
import AppLayout from './layouts/AppLayout.tsx'
import SearchPage from './pages/SearchPage'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<UserHomePage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="search" element={<SearchPage />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="genres" element={<GenresPage />} />
      </Route>



    </Routes >
  )
}
//         <Route index element={<AdminDashboard />} />
//
//<Route index element={<Dashboard />} />
//<Route path="movies" element={<MoviesList />} />
//<Route path="add" element={<AddMovie />} />
//
//
//
//
//
export default App
