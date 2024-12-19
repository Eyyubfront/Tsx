import { Container } from '@mui/material';
import AuthLeftPanel from '../../layout/AuthLeftPanel/AuthLeftPanel';
import Heading from '../../components/Heading';
import { useState } from 'react';
import Paragrafy from '../../components/Paragrafy/Paragrafy';
import PrimaryInput from '../../components/PrimaryInput/PrimaryInput';
import Check from '../../components/Check/Check';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import CustomLink from '../../components/CustomLink/CustomLink';
import Toogle from '../../components/Toogle/Toogle';
import { Link } from 'react-router-dom';
import "./Login.scss";

const Login = () => {
  const [signUp, setSignUp] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [iseye, setIseye] = useState<boolean>(false);
  const [isOn, setIsOn] = useState<boolean>(false);

  const isValidEmail = email.includes('@') && email.includes(".");

  const handleLink = () => {
    setSignUp((prevState) => !prevState);
  };

  const handleEye = () => {
    setIseye((prevState) => !prevState);
  };

  const handleToggle = () => {
    setIsOn((prevState) => !prevState);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Container sx={{ display: "flex" }} className='all_login'>
      <div className="sign_left">
        <AuthLeftPanel />
      </div>
      <div className='sign_right'>
        <Heading fontsize="48px" text={signUp ? "Create account" : "Sign in"} />
        <Paragrafy fontsize="16px" fontfamily="DM Sans, sans-serif" text={"Now your finances are in one place and always under control"} />

        <PrimaryInput
          label='Email'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          isValid
          isValidEmail={isValidEmail}
        />

        <div className="password-container">
          <PrimaryInput
            label='Password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            isEyeicon
            iseye={iseye}
            handleEye={handleEye}
          />


          {!signUp && (
            <div className="forgot-password-container">
              <Link to="/forgot-password" className="forgot-password-link">
                <Paragrafy fontfamily='Inter,sans-serif' text="Forgot Password?" fontWeight="400" fontsize="14px" />
              </Link>
            </div>
          )}
        </div>

        {signUp && (
          <>
            <Check />
            <PrimaryButton label={"Create Account"} onClick={handleLogin} />
          </>
        )}
        {!signUp && (
          <>
            <PrimaryButton label={"Sign In"} onClick={handleLogin} />
            <Toogle isOn={isOn} handleToggle={handleToggle} />
          </>
        )}
        <div className="link_container">
          <Paragrafy fontfamily="Inter,sans-serif" fontsize="14px" fontWeight="300" text={signUp ? "Already have an account? " : "Don't have an account? "} />
          <CustomLink fontfamily="Inter,sans-serif" onChange={handleLink} element={signUp} />
        </div>
      </div>
    </Container>
  );
};
export default Login;
