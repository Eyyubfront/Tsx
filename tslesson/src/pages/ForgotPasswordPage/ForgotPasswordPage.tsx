import React from "react";
import { sendForgotPasswordEmail } from "../../store/actions/forgotPasswordActions/forgotPasswordActions";
import { RootState, useAppDispatch, useAppSelector } from "../../store/index";
import { useNavigate } from "react-router-dom";
import LeftVerifyEmail from "../../layout/SidePanel/SidePanel";
import "./ForgotPasswordPage.scss";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Button from "@mui/material/Button";
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import UseFormInput from "../../components/PrimaryInput/UseFormInput";
import Heading from "../../components/Heading";
import Paragrafy from "../../components/Paragrafy/Paragrafy";
import { setIsResetPassword } from "../../store/slice/emailVerificationSlice";
import { setVeryuse } from "../../store/slice/authSlice";

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
    <div className="forgot-div">
      <LeftVerifyEmail
        titleText="Hi, Welcome!"
        descriptionText="Create your vocabulary, get reminders, and test your memory with quick quizzes!"
      />
      <Button
        className="leftBt"
        sx={{
          border: "2px solid #D8DADC ",
          color: "black",
          borderRadius: "10px",
        }}
      >
        <KeyboardArrowLeftIcon />
      </Button>
      <div className="forgot-pass">
        <Heading text="Forgot password ?" />
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
  );
};

export default ForgotPasswordPage;