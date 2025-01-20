import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ChangedPasswordPage from "../pages/ChangedPasswordPage/ChangedPasswordPage";
import CheckEmailPage from "../pages/CheckEmailPage/CheckEmailPage";
import ResetPasswordPage from "../pages/ResetPasswordPage/ResetPasswordPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPasswordPage";
import VerifyEmailPage from "../pages/VerifyEmailPage/VerifyEmailPage";
import Login from "../pages/Login/Login";
import ProtectedRouting from "./ProtectedRouting";
import PublicRouting from "./PublicRouting";
import Home from "../pages/Home/Home";
import { useAppSelector } from "../store";


const Routing = () => {
  const navigate = useNavigate();


  const { isAuth } = useAppSelector((state) => state.Auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!isAuth && !token) {
      navigate("/login");
    }
  }, [isAuth, navigate]);  


  return (
    <Routes>
      <Route element={<PublicRouting />}>
        <Route path="/login" element={<Login />} />
        <Route path="/changedpasswordpage" element={<ChangedPasswordPage />} />
        <Route path="/checkemailpage" element={<CheckEmailPage />} />
        <Route path="/forgotpasswordpage" element={<ForgotPasswordPage />} />
        <Route path="/resetpasswordpage" element={<ResetPasswordPage />} />
        <Route path="/verifyemailpage" element={<VerifyEmailPage />} />
      </Route>

      <Route element={<ProtectedRouting />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Routing;
