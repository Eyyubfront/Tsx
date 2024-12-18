
import { Route, Routes } from 'react-router-dom'

import Login from '../pages/Login'


const Routing = () => {
  return (
    <Routes>

      <Route path="/login" element={< Login />} />
    </Routes>
  )
}

export default Routing
