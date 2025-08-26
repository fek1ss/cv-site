import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from './page/Admin/Admin';
import Home from './page/Home/Home';
import Login from './page/Login/Login';
import AboutAdmin from './page/Admin/AboutAdmin';
import HeroAdmin from './page/Admin/HeroAdmin';
import SkillsAdmin from './page/Admin/SkillsAdmin';
import ExperienceAdmin from './page/Admin/ExperienceAdmin';
import ArticlesAdmin from './page/Admin/ArticlesAdmin';
import ContactsAdmin from './page/Admin/ContactsAdmin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin/about' element={<AboutAdmin />} />
        <Route path='/admin/hero' element={<HeroAdmin />} />
        <Route path='/admin/skills' element={<SkillsAdmin />} />
        <Route path='/admin/experience' element={<ExperienceAdmin />} />
        <Route path='/admin/articles' element={<ArticlesAdmin />} />
        <Route path='/admin/contacts' element={<ContactsAdmin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
