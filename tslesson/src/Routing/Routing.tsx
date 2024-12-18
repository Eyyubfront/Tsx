
import { Route, Routes } from 'react-router-dom'
import SignupPage from '../pages/SignupPage/SignupPage'
import SigninPage from '../pages/SigninPage/SigninPage'
import Login from '../pages/Login'


const Routing = () => {
  return (
      <Routes>
        {/* <Route path="/" element={< SignupPage/>} />
        <Route path="/signin" element={< SigninPage/>} /> */}
        <Route path="/login" element={< Login />} />
      </Routes>
  )
}

export default Routing
