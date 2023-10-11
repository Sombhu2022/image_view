import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home'
import Upload from './pages/upload/Upload'

function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/upload' element={<Upload />}/>
      </Routes>
    </Router>
  )
}

export default App
