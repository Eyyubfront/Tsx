import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./ResetPasswordPage.scss";
import Heading from "../../components/Heading";
import Paragrafy from "../../components/Paragrafy/Paragrafy";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import UseFormInput from "../../components/PrimaryInput/UseFormInput";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { resetPassword } from "../../store/actions/resetPasswordActions/resetPasswordActions";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SidePanel from "../../layout/SidePanel/SidePanel";


const schema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long.")
    .matches(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter.")
    .required("Password is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], "Passwords must match.")
    .required("Confirm new password is required."),
});

  const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const { handleSubmit, formState } = methods;
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
      userId: userId,
      newPassword: data.password,
    };

    await dispatch(resetPassword(newPasswordData));
  };

  const handleEyePassword = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  const handleEyeConfirmPassword = () => {
    setIsConfirmPasswordVisible(prevState => !prevState);
  };

  return (

    <div className="resetpassword__all">
      <div className="resetpassword__left">

        <SidePanel
          titleText="Hi, Welcome!"
          descriptionText="Create your vocabulary, get reminders, and test your memory with quick quizzes!"
        />
      </div>
      <div className="resetpassword__right">
        <div className="reset-pass">
          <div className="resetLeft-side">
            <Heading text="Reset password" />
            <Paragrafy className="resettittle" text="Please type something you’ll remember" />
            {error && <p className="error-message">{error}</p>}
            <FormProvider {...methods}>
              <form className="formreset" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <UseFormInput
                    name='password'
                    label='New Password'
                    isEyeicon={true}
                    handleEye={handleEyePassword}
                    iseye={isPasswordVisible}
                    type={isPasswordVisible ? 'text' : 'password'}
                  />
                </div>
                <div className="form-groupconfirm">
                  <div className="useform">
                    <UseFormInput
                      name='confirmPassword'
                      label='Confirm New Password'
                      isEyeicon={true}
                      handleEye={handleEyeConfirmPassword}
                      iseye={isConfirmPasswordVisible}
                      type={isConfirmPasswordVisible ? 'text' : 'password'}
                    />
                  </div>
                  <div className="confirmpasswordlink">
                    <Link to="/forgotpasswordpage" className="forgot-password-link">
                      <Paragrafy fontfamily="Inter,sans-serif" text="Forgot Password?" fontWeight="400" fontsize="14px" />
                    </Link>
                  </div>
                </div>
                <PrimaryButton
                  label="Reset Password"
                  type="submit"
                  disabled={!formState.isValid || isLoading}
                />
              </form>
            </FormProvider>
          </div>
          <div className="Reset__bottom">
            <Paragrafy fontfamily="Inter,sans-serif" fontsize="14px" fontWeight="300" text={ "Already have an account? "} />
            <Link className="reset_bottomlinks" to="/">Sign up</Link>
          </div>
        </div>
      </div>
    </div>


  );
};

export default ResetPasswordPage;
