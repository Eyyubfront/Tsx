import React from "react";
import { sendForgotPasswordEmail } from "../../store/actions/forgotPasswordActions/forgotPasswordActions";
import { RootState, useAppDispatch, useAppSelector } from "../../store/index";
import { useNavigate } from "react-router-dom";
import "./ForgotPasswordPage.scss";
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import UseFormInput from "../../components/PrimaryInput/UseFormInput";
import Heading from "../../components/Heading";
import Paragrafy from "../../components/Paragrafy/Paragrafy";
import { setIsResetPassword, setTitle } from "../../store/slice/emailVerificationSlice";
import { setVeryuse } from "../../store/slice/authSlice";
import SidePanel from "../../layout/SidePanel/SidePanel";
import BackButton from "../../components/BackButton/BackButton";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Email is not valid.")
    .required("Email is required."),
});

const ForgotPasswordPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "all"
  });

  const { loading, success } = useAppSelector(
    (state: RootState) => state.Auth
  );

  const { handleSubmit } = methods;
  const onSubmit = (data: { email: string }) => {
    dispatch(setVeryuse(false))
    dispatch(setTitle("Please check your email"));
    dispatch(sendForgotPasswordEmail(data))
      .unwrap()
      .then(() => {
        dispatch(setIsResetPassword(true));
        navigate('/verifyemailpage');
      })
      .catch(err => {
        console.error("Error:", err);

      });
  };

  return (

    <div className="forgotpasswordpage__all">
          <p>eyyub</p>
      <div className="forgotpassword__left">
        <SidePanel
          titleText="Hi, Welcome!"
          descriptionText="Create your vocabulary, get reminders, and test your memory with quick quizzes!"
        />
        <BackButton onClick={() => navigate("/login")} />
      </div>
      <div className="forgotpassword__right">

 <div className="forgot-pass">
          <Heading className="forgot_rightname" text="Forgot password ?" />
          <Paragrafy text="Don’t worry! It happens. Please enter the email associated with your account." />
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <UseFormInput
                name='email'
                label='Email address'
                type='email'
              />

              {success && <p className="success">Code sent successfully!</p>}

              <PrimaryButton
                label={loading ? "Sending..." : "Verify Code"}
                type="submit"
                disabled={loading}
              />
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;