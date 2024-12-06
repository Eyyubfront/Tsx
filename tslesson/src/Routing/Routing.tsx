
import {  Route, Routes } from 'react-router-dom'
import About from '../pages/About/About'
import Home from '../pages/Home/Home'
import Contact from '../pages/Contact/Contact'
import Sidebar from '../components/Sidebar/Sidebars'

const Routing = () => {
  return (
    <div>
      
      <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
    </div>
  )
}

export default Routing
