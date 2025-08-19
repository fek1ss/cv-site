import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from './page/Admin/Admin';
import Home from './page/Home/Home';
import Login from './page/Login/Login';
import AdminAbout from './page/Admin/AdminAbout';
import AdminHero from './page/Admin/AdminHero';
import AdminSkills from './page/Admin/AdminSKills';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin/about' element={<AdminAbout />} />
        <Route path='/admin/hero' element={<AdminHero />} />
        <Route path='/admin/skills' element={<AdminSkills />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
