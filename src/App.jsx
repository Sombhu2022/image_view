
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home'

import Option from './pages/options/Option.jsx'
import { Toaster } from "react-hot-toast";
import Login from './pages/auth/login/Login.jsx';
import Register from './pages/auth/register/register.jsx'

function App() {


  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/:id' element={<Option/>}/>
        <Route path='/auth/registretion' element={<Register/>}/>
        <Route path='/auth/login' element={<Login/>}/>
        
      </Routes>
    </Router>
  )
}

export default App
