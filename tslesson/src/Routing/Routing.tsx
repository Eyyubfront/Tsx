import { Route, Routes } from "react-router-dom";
import ChangedPasswordPage from "../pages/ChangedPasswordPage/ChangedPasswordPage";
import CheckEmailPage from "../pages/CheckEmailPage/CheckEmailPage";
import ResetPasswordPage from "../pages/ResetPasswordPage/ResetPasswordPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPasswordPage";
import VerifyEmailPage from "../pages/VerifyEmailPage/VerifyEmailPage";

import Login from "../pages/Login/Login";
import LearnTime from "../pages/LearnTime/LearnTime";
import LanguageSelector from "../pages/LanguageSelector/LanguageSelector";

const Routing = () => {
  return (
    <Routes>
      <Route path="/changedpasswordpage" element={<ChangedPasswordPage />} />
      <Route path="/checkemailpage" element={<CheckEmailPage />} />
      <Route path="/forgotpasswordpage" element={<ForgotPasswordPage />} />
      <Route path="/resetpasswordpage" element={<ResetPasswordPage />} />
      <Route path="/verifyemailpage" element={<VerifyEmailPage />} />
      <Route path="learntime" element={<LearnTime/>} />
      <Route path="languageselector" element={<LanguageSelector/>} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default Routing;
