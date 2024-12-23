import { Route, Routes } from "react-router-dom";
import SignupPage from "../pages/SignupPage/SignupPage";
import SigninPage from "../pages/SigninPage/SigninPage";
import ChangedPasswordPage from "../pages/ChangedPasswordPage/ChangedPasswordPage";
import CheckEmailPage from "../pages/CheckEmailPage/CheckEmailPage";
import ResetPasswordPage from "../pages/ResetPasswordPage/ResetPasswordPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPasswordPage";
import VerifyEmailPage from "../pages/VerifyEmailPage/VerifyEmailPage";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/changedpasswordpage" element={<ChangedPasswordPage />} />
      <Route path="/checkemailpage" element={<CheckEmailPage />} />
      <Route path="/forgotpasswordpage" element={<ForgotPasswordPage />} />
      <Route path="/resetpasswordpage" element={<ResetPasswordPage success={false} />}/>
      <Route path="/verifyemailpage" element={<VerifyEmailPage />} />
    </Routes>
  );
};

export default Routing;
