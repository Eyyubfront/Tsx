
import { Route, Routes } from 'react-router-dom'
import SignupPage from '../pages/SignupPage/SignupPage'
import SigninPage from '../pages/SigninPage/SigninPage'


const Routing = () => {
  return (
      <Routes>
        <Route path="/" element={< SignupPage/>} />
        <Route path="/signin" element={< SigninPage/>} />
      </Routes>
  )
}

export default Routing
