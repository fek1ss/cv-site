import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from './page/Admin/Admin';
import Home from './page/Public/Home';
import Login from './page/Login/Login';
import Hero from './components/features/Hero/Hero';
import Aboutme from './components/features/Aboutme/Aboutme';
import Skills from './components/features/SkillsExperience/Skills/Skills';
import Articles from './components/features/Articles/Articles';
import Experience from './components/features/SkillsExperience/Experience/Experience';
import Contacts from './components/layout/Contacts/Contacts';
import Education from './components/features/Education/Education';
import Books from './components/features/Books/Books';
import Project from './components/features/Projects/Projects';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin/about' element={<Aboutme isAdmin={true} />} />
        <Route path='/admin/education' element={<Education isAdmin={true} />} />
        <Route path='/admin/hero' element={<Hero isAdmin={true} />} />
        <Route path='/admin/skills' element={<Skills isAdmin={true} />} />
        <Route path='/admin/experience' element={<Experience isAdmin={true} />} />
        <Route path='/admin/projects' element={<Project isAdmin={true} />} />
        <Route path='/admin/articles' element={<Articles isAdmin={true} />} />
        <Route path='/admin/books' element={<Books isAdmin={true} />} />
        <Route path='/admin/contacts' element={<Contacts isAdmin={true} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
