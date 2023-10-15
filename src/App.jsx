
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home'

import Option from './pages/options/Option'
import { Toaster } from "react-hot-toast";

function App() {


  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/:id' element={<Option/>}/>
      </Routes>
    </Router>
  )
}

export default App
