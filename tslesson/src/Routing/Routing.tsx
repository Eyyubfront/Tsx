import { Route, Routes } from "react-router-dom"; 
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
import { useAppDispatch } from "../store";
import { refreshToken } from '../store/actions/authActions';
import LearnTime from "../pages/LearnTime/LearnTime";
import LanguageSelector from "../pages/LanguageSelector/LanguageSelector";

const Routing = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
   dispatch(refreshToken())
  }, []);


  return (
    <Routes>
      <Route element={<PublicRouting />}>
        <Route path="/login" element={<Login />} />
        <Route path="/changedpasswordpage" element={<ChangedPasswordPage />} />
        <Route path="/checkemailpage" element={<CheckEmailPage />} />
        <Route path="/forgotpasswordpage" element={<ForgotPasswordPage />} />
        <Route path="/resetpasswordpage" element={<ResetPasswordPage />} />
        <Route path="/verifyemailpage" element={<VerifyEmailPage />} />
        <Route path="learntime" element={<LearnTime/>} />
        <Route path="languageselector" element={<LanguageSelector/>} />
      </Route>

      <Route element={<ProtectedRouting />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default Routing;