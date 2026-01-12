//Program
import { Routes, Route } from 'react-router-dom'
//user
import UserHomePage from './pages/UserHomePage.tsx'
//admin

//For all 
import AppLayout from './layouts/AppLayout.tsx'


function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<UserHomePage />} />
        <Route path="/movie/:id" element={<h1>Movie page</h1>} />
      </Route>
    </Routes>
  )
}

export default App
