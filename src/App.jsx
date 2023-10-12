import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home'
import Upload from './pages/upload/Upload'
import Option from './pages/options/Option'

function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/upload' element={<Upload />}/>
        <Route path='/:id' element={<Option/>}/>
      </Routes>
    </Router>
  )
}

export default App
