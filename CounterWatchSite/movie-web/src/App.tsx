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
import AdminMoviesPage from "./pages/Admin/AdminMoviesPage.tsx";
import CreateMoviePage from "./pages/Admin/CreateMoviePage.tsx";
import EditMoviePage from "./pages/Admin/EditMoviePage.tsx";
//For all 
import AppLayout from './layouts/AppLayout.tsx'
import SearchPage from './pages/SearchPage'
import NotFoundPage from "./pages/NotFoundPage.tsx";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<UserHomePage />} />
        <Route path="/movie/:slug" element={<MoviePage />} />
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
        <Route path="movies">
            <Route index element={<AdminMoviesPage />} />
            <Route path="add" element={<CreateMoviePage />} />
            <Route path="edit/:slug" element={<EditMoviePage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes >
  )
}
export default App
