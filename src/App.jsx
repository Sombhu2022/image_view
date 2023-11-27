
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home'

import Option from './pages/options/Option.jsx'
import { Toaster } from "react-hot-toast";
import Login from './pages/auth/login/Login.jsx';
import Register from './pages/auth/register/register.jsx'
import ForgotPass from './pages/auth/pass/ForgotPass';
import Otp from './pages/auth/pass/Otp.jsx';
import NewPass from './pages/auth/pass/NewPass.jsx';
import Header from './pages/lauout/header/Header.jsx';

function App() {


  return (
    <Router>
      <Header/>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/:id' element={<Option/>}/>
        <Route path='/auth/registretion' element={<Register/>}/>
        <Route path='/auth/login' element={<Login/>}/>
        <Route path='/auth/forgotPassword' element={<ForgotPass/>}/>
        <Route path='/auth/forgotPassword/otp' element={<Otp/>}/>
        <Route path='/auth/forgotPassword/newpass' element={<NewPass/>}/>
        
      </Routes>
    </Router>
  )
}

export default App
