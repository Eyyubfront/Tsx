import { Route, Routes } from "react-router-dom";
import ChangedPasswordPage from "../pages/ChangedPasswordPage/ChangedPasswordPage";
import CheckEmailPage from "../pages/CheckEmailPage/CheckEmailPage";
import ResetPasswordPage from "../pages/ResetPasswordPage/ResetPasswordPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPasswordPage";
import VerifyEmailPage from "../pages/VerifyEmailPage/VerifyEmailPage";
import Login from "../pages/Login/Login";
import ProtectedRouting from "./ProtectedRouting";
import PublicRouting from "./PublicRouting";
import Home from "../pages/Home/Home";
import LearnTime from "../pages/LearnTime/LearnTime";
import LanguageSelector from "../pages/LanguageSelector/LanguageSelector";
import ChooseLearnLanguage from "../pages/ChooseLanguage/ChooseLearnLanguage";
import VerifyRouting from "./VerifyRouting";
import SettingsLayout from "../layout/SettingsLayout/SettingsLayout";
import Languagesettings from "../pages/LanguageSettings/Languagesettings";
import TimeSettings from "../pages/Home/TimeSettings/TimeSettings";
import ChangedPasswordSettings from "../pages/ChangedPasswordSettings/ChangedPasswordSettings";
import LearningNow from "../pages/Home/Homesections/LearingNow/LearingNow";
import LatestWords from "../pages/Home/Homesections/LatestWords/LatestWords";
import LexiconCards from "../pages/Home/Homesections/LexiconCards/LexiconCards";
import LexionLayout from "../layout/LexionLayout/LexionLayout";
import Configurate from "../pages/Configurate/Configurate";
import Conditions from "../pages/Conditions/Conditions";


const Routing = () => {
  return (
    <Routes>

      <Route element={<PublicRouting />}>
        <Route path="/login" element={<Login />} />
        <Route path="/checkemailpage" element={<CheckEmailPage />} />
        <Route path="/forgotpasswordpage" element={<ForgotPasswordPage />} />
        <Route path="/verifyemailpage" element={<VerifyEmailPage />} />
        <Route path="/resetpasswordpage" element={<ResetPasswordPage />} />
        <Route path="/changedpasswordpage" element={<ChangedPasswordPage />} />
      </Route>
      <Route element={<VerifyRouting />}>
          <Route path="/languageselector" element={<LanguageSelector />} />
          <Route path="/chooselearnlanguage" element={<ChooseLearnLanguage />} />
          <Route path="/learntime" element={<LearnTime />} />
        </Route>


      <Route element={<ProtectedRouting />}>
        <Route path="/" element={<Home />} />

        <Route path="/lexioncards" element={<LexiconCards />} />
        <Route path="/lexioncards/:id" element={<LexionLayout />} />
        <Route path="settingspage" element={<SettingsLayout />}>
          <Route path="languagesettings" element={<Languagesettings />} />
          <Route path="timesettings" element={<TimeSettings />} />
          <Route path="passwordchecksettings" element={<ChangedPasswordSettings />} />
          <Route path="configurate" element={<Configurate />} />
          <Route path="terms-and-conditions" element={<Conditions />} />
        </Route>
        <Route path="/learingnow" element={<LearningNow />} />
        <Route path="/vocablarypage" element={<LatestWords />} />


      </Route>
    </Routes>
  );
};

export default Routing;