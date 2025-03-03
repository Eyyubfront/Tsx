import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../../components/Heading";
import Paragrafy from "../../components/Paragrafy/Paragrafy";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { confirmEmail, confirmPasswordResetCode, resendConfirmationToken } from "../../store/actions/verifyemailActions/emailVerificationActions";
import { useForm, FormProvider } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/index";
import SidePanel from "../../layout/SidePanel/SidePanel";
import BackButton from "../../components/BackButton/BackButton";
import { MuiOtpInput } from 'mui-one-time-password-input';
import "./VerifyEmailPage.scss"
const VerifyEmailPage = () => {
  const [counter, setCounter] = useState(30 * 2);
  const [canResend, setCanResend] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpIncorrect, setIsOtpIncorrect] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const methods = useForm();
  const { handleSubmit } = methods;

  const { title, isLoading } = useAppSelector((state) => state.emailVerification);
  const { userId, veriyuse } = useAppSelector((state) => state.Auth);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId, navigate]);

  useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [counter]);
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleResend = () => {
    if (userId) {
      dispatch(resendConfirmationToken(userId));
      setCounter(30 * 2);
      setCanResend(false);
    } else {
      console.error("User ID not found.");
    }
  };

  const onSubmit = () => {
    if (otp.length === 4) {
      if (veriyuse) {
        dispatch(confirmEmail({ code: otp, userId: String(userId) })).then((action: any) => {
          if (action.meta.requestStatus === "fulfilled") {
            navigate("/languageselector");
          } else {
            setIsOtpIncorrect(true);
          }
        });
      } else {
        dispatch(confirmPasswordResetCode({ code: otp, userId: String(userId) })).then((action: any) => {
          if (action.meta.requestStatus === "fulfilled") {
            navigate("/resetpasswordpage");
          } else {
            setIsOtpIncorrect(true);
          }
        });
      }
    } else {
      console.error("Invalid code length.");
    }
  };

  return (
    <div className="verify__email">
      <div className="verifyemail__left">
        <SidePanel
          titleText="Hi, Welcome!"
          descriptionText="Create your vocabulary, get reminders, and test your memory with quick quizzes!"
        />
        <BackButton className="verify_back" onClick={() => navigate("/login")} />
      </div>
      <div className="veriyfemail_right">
        <FormProvider {...methods}>
          <form className="formverify" onSubmit={handleSubmit(onSubmit)}>
            <div className="verify-email">
              <div className="verify-content">
                <Heading text={title || "Verify E-mail address"} />
                <Paragrafy className="verify_aboutmail" text="We’ve sent an activation code to your email" />
                <div className={`otp-input`}>
                  <MuiOtpInput
                    className={isOtpIncorrect ? "input-error" : ""}
                    value={otp}
                    onChange={setOtp}
                  />
                </div>
                <div className="resend-code">
                  {canResend ? (
                    <p onClick={handleResend} className="sendcodes">
                      Send code again
                    </p>
                  ) : (
                    <p>Send code again in  {formatTime(counter)}seconds</p>
                  )}
                </div>
                <PrimaryButton disabled={otp.length < 4 || isLoading} type="submit" label="Verify Code" />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
