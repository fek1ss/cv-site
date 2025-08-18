import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from './page/Admin/Admin';
import Home from './page/Home/Home';
import Login from './page/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
