import { useState } from 'react';
import AuthLeftPanel from '../../layout/AuthLeftPanel/AuthLeftPanel';
import Heading from '../../components/Heading';
import Paragrafy from '../../components/Paragrafy/Paragrafy';
import Check from '../../components/Check/Check';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import CustomLink from '../../components/CustomLink/CustomLink';
import Toogle from './Toogle/Toogle';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../store';
import { login, register, sendIdToken } from '../../store/actions/authActions';
import { Link, useNavigate } from 'react-router-dom';
import { setVeryuse } from '../../store/slice/authSlice';
import { auth, provider, signInWithPopup } from './Firebase';
import UseFormInput from '../../components/PrimaryInput/UseFormInput';
import googleimg from '../../assets/images/home/Google__G__logo.svg.png';
import "./Login.scss"
import { setUserId } from '../../store/slice/timeSlice';
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Email is not valid.")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Use a valid email address (e.g. example@gmail.com).")
    .required("Email is required."),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long.")
    .matches(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter.")
    .required("Password is required."),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.Auth);
  const [signUp, setSignUp] = useState(false);
  const [iseye, setIseye] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "all"
  });

  const { handleSubmit, reset, formState } = methods;

  const handleLink = () => {
    setSignUp(prevState => !prevState);
    reset();
  };

  const handleEye = () => {
    setIseye(prevState => !prevState);
  };

  const handleToggle = () => {
    setIsOn(prevState => !prevState);
  };

  const onSubmit = (data: { email: string, password: string }) => {
    if (signUp) {
      dispatch(setVeryuse(true));
      dispatch(register(data))
        .unwrap()
        .then(() => {
          navigate("/verifyemailpage");
        })
    } else {
      dispatch(login(data))
        .unwrap()
        .then(() => {
          navigate('/');
        })
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken(true);
  
      dispatch(sendIdToken(idToken))
        .unwrap()
        .then((data) => {
          const { accessToken, refreshToken, userId, hasLanguage, hasNotificationSetting } = data;
  
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
  
          dispatch(setUserId(userId));
          localStorage.setItem('userId', userId)

          if (hasLanguage && hasNotificationSetting) {
            navigate("/");
          }else if(hasLanguage && !hasNotificationSetting){
            navigate("/learntime");
          }
          else {
            navigate("/languageselector");
          }
        });
  
    } catch (error) {
      console.error("Google login error: ", error);
    }
  };



  return (
    <div style={{ display: "flex" }} className='all_login'>
      <div className="sign_left">
        <AuthLeftPanel
          tittleText="Hi, Welcome!"
          descriptionText="Create your vocabulary, get reminders, and test your memory with quick quizzes!"
        />
      </div>
      <div className='sign_right'>
        <FormProvider {...methods}>
          <div className='login_headingtittle'>
            <Heading text={signUp ? "Create account" : "Sign in"} className="login_heading" />
          </div>
          <Paragrafy fontsize="16px" fontfamily="DM Sans, sans-serif" text={"Now your finances are in one place and always under control"} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="email-container">
              <UseFormInput name='email' label='Email address' type='email' />
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
                <Check onCheck={(checked) => setIsChecked(checked)} />
                <PrimaryButton
                  label={"Create account"}
                  type="submit"
                  disabled={!formState.isValid || loading || !isChecked}
                />
              </>
            ) : (
              <>
                <PrimaryButton
                  disabled={!formState.isValid || loading}
                  label={"Sign in"}
                  type="submit"
                />
                <Toogle isOn={isOn} handleToggle={handleToggle} />
              </>
            )}

            <div className="link_container">
              <Paragrafy fontfamily="Inter,sans-serif" fontsize="14px" fontWeight="300" text={signUp ? "Already have an account? " : "Don't have an account? "} />
              <CustomLink fontfamily="Inter,sans-serif" onChange={handleLink} element={signUp} />
            </div>
          </form>
          <div onClick={handleGoogleLogin} className='google_box'>
            <img className='img_google' src={googleimg} alt="" />
            Google Account
          </div>
        </FormProvider>


      </div>
    </div>
  );
};

export default Login;
