import  { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom"; 
import LeftVerifyEmail from "../../layout/SidePanel/SidePanel";
import "./ResetPasswordPage.scss";
import { Container } from "@mui/material";
import Heading from "../../components/Heading";
import Paragrafy from "../../components/Paragrafy/Paragrafy";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import UseFormInput from "../../components/PrimaryInput/UseFormInput";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { resetPassword } from "../../store/actions/resetPasswordActions/resetPasswordActions";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Yup validasyon şeması
const schema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long.")
    .matches(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter.")
    .required("Password is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords must match.")
    .required("Please confirm your password.")
});

const ResetPasswordPage = () => {
  const navigate = useNavigate(); 
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "all"  
  });

  const dispatch = useAppDispatch();
  const { handleSubmit } = methods;
  
  const { isLoading, error, success } = useAppSelector((state: RootState) => state.passwordReset);
  

  const { userId } = useAppSelector((state: RootState) => state.Auth);

  useEffect(() => {
    if (success) {
      navigate('/changedpasswordpage'); 
    }
  }, [success, navigate]);

  const onSubmit = async (data: { password: string; confirmPassword: string; }) => {
    if (!userId) {
      console.error("userId is not available!");
      return;
    }
    const newPasswordData = {
      userId, 
      newPassword: data.password, 
    };
    
    await dispatch(resetPassword(newPasswordData)); 
  };

  return (
    <Container>
      <div className="reset-div">
        <LeftVerifyEmail titleText="Hi, Welcome!" descriptionText="Create your vocabulary, get reminders, and test your memory with quick quizzes!" />
        <div className="reset-pass">
          <div className="resetLeft-side">
            <Heading text="Reset password" />
            <Paragrafy text="Don’t worry! It happens. Please enter the email associated with your account." />
            {error && <p className="error-message">{error}</p>} 
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <UseFormInput
                    name='password'
                    label='New Password'
                    type='password'
                  />
                </div>
                <div className="form-group">
                  <UseFormInput
                    name='confirmPassword'
                    label='Confirm Password'
                    type='password'
                  />
                </div>
                <PrimaryButton
                  label="Reset Password"
                  type="submit"
                  disabled={isLoading}
                />
              </form>
            </FormProvider>
          </div>
          <div className="resetRight-side">
            <p>
              Already have an account? <a href="/">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ResetPasswordPage;