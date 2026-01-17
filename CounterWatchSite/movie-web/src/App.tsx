//Program
import { Routes, Route } from 'react-router-dom'
//user
import UserHomePage from './pages/UserHomePage.tsx'
import MoviePage from './pages/MoviePage';
import LoginPage from './pages/LoginPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import CatalogPage from './pages/CatalogPage.tsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.tsx';
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account" element={<ProfilePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
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
