import { useState } from 'react';
import { Container } from '@mui/material';
import AuthLeftPanel from '../../layout/AuthLeftPanel/AuthLeftPanel';
import Heading from '../../components/Heading';
import Paragrafy from '../../components/Paragrafy/Paragrafy';
import Check from '../../components/Check/Check';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import CustomLink from '../../components/CustomLink/CustomLink';
import Toogle from '../../components/Toogle/Toogle';
import { Link } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import "./Login.scss";
import UseFormInput from '../../components/PrimaryInput/UseFormInput';

const schema = Yup.object().shape({
  email: Yup.string().email("Email is not valid.").required("Email is required."),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long.")
    .matches(/^(?=.*[A-Z])/, "Password must contain at least one uppercase letter.")
    .required("Password is required."),
});

const Login = () => {
  const [signUp, setSignUp] = useState(true);
  const [iseye, setIseye] = useState(false);
  const [isOn, setIsOn] = useState(false);

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = methods

  const handleLink = () => {
    setSignUp((prevState) => !prevState);
  };

  const handleEye = () => {
    setIseye((prevState) => !prevState);
  };

  const handleToggle = () => {
    setIsOn((prevState) => !prevState);
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Container sx={{ display: "flex" }} className='all_login'>
      <div className="sign_left">
        <AuthLeftPanel />
      </div>
      <div className='sign_right'>
        <FormProvider {...methods}>
          <Heading fontsize="48px" text={signUp ? "Create account" : "Sign in"} />
          <Paragrafy fontsize="16px" fontfamily="DM Sans, sans-serif" text={"Now your finances are in one place and always under control"} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="email-container">
              <UseFormInput
                name='email'
                label='Email address'
                type='email'
              />
              </div>
            <div className="password-container">
              <UseFormInput
                name='password'
                label='Password'
                type={iseye ? 'text' : 'password'}
                isEyeicon
                iseye={iseye}
                handleEye={handleEye}
              />
              {!signUp && (
                <div className="forgot-password-container">
                  <Link to="/forgotpasswordpage" className="forgot-password-link">
                    <Paragrafy fontfamily="Inter,sans-serif" text="Forgot Password?" fontWeight="400" fontsize="14px" />
                  </Link>
                </div>
              )}
            </div>
            {signUp ? (
              <>
                <Check />
                <PrimaryButton label={"Create account"} type="submit" />
              </>
            ) : (
              <>
                <PrimaryButton label={"Sign in"} type="submit" />
                <Toogle isOn={isOn} handleToggle={handleToggle} />
              </>
            )}
            <div className="link_container">
              <Paragrafy fontfamily="Inter,sans-serif" fontsize="14px" fontWeight="300" text={signUp ? "Already have an account? " : "Already have an account? "} />
              <CustomLink fontfamily="Inter,sans-serif" onChange={handleLink} element={signUp} />
            </div>
          </form>
        </FormProvider>
      </div>
    </Container>
  );
};

export default Login;