import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Heading from "../../components/Heading";
import Paragrafy from "../../components/Paragrafy/Paragrafy";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { confirmEmail, confirmPasswordResetCode, resendConfirmationToken } from "../../store/actions/verifyemailActions/emailVerificationActions";
import { useForm, FormProvider } from "react-hook-form";
import UseFormInput from "../../components/PrimaryInput/UseFormInput";
import { RootState, useAppDispatch, useAppSelector } from "../../store/index";
import SidePanel from "../../layout/SidePanel/SidePanel";

const VerifyEmailPage = () => {
  const [counter, setCounter] = useState(30);
  const [canResend, setCanResend] = useState(false);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const methods = useForm();
  const { handleSubmit,formState } = methods;

  const {title, error, isLoading } = useAppSelector((state: RootState) => state.emailVerification);
  const { userId, veriyuse } = useAppSelector((state: RootState) => state.Auth);



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


  const handleResend = () => {
    if (userId) {
      dispatch(resendConfirmationToken(userId));
      setCounter(30);
      setCanResend(false);
    } else {
      console.error("User ID not found.");
    }
  };

  const onSubmit = (data: any) => {
    const enteredCode = Object.values(data).join("");

    if (enteredCode.length === 4) {
      if (veriyuse) {
        dispatch(confirmEmail({ code: enteredCode, userId: String(userId) })).then((action: any) => {
          if (action.meta.requestStatus === "fulfilled") {
            navigate("/languageselector");
          } else {
            console.error("Email confirmation failed.");
          }
        });
      } else {
        dispatch(confirmPasswordResetCode({ code: enteredCode, userId: String(userId) })).then((action: any) => {
          if (action.meta.requestStatus === "fulfilled") {
            navigate("/resetpasswordpage");
          } else {
            console.error("Password reset code confirmation failed.");
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
             <Button className="LeftButton" onClick={() => navigate("/forgotpasswordpage")}>
          <KeyboardArrowLeftIcon />
        </Button>
      </div>
      <div className="veriyfemail_right">
        <FormProvider {...methods}>
          <form className="formverify" onSubmit={handleSubmit(onSubmit)}>
            <div className="verify-email">
              <div className="verify-content">
                <Heading text={title || "Verify E-mail address"} />
                <Paragrafy className="verify_aboutmail" text="We’ve sent an activation code to your email" />
                <div style={{flexDirection:"row"}} className="inputs">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <UseFormInput
                      key={index}
                      name={`code-${index}`}
                      label=""
                      rules={{ required: "This" }}
                      type="text"
                      maxLength={1}
                      isEyeicon={false}
                      iseye={false}
                      handleEye={() => { }}
                    />
                  ))}
                </div>
                {error && <div className="error">{error}</div>}
                <div className="resend-code">
                  {canResend ? (
                    <p onClick={handleResend} className="sendcodes">
                      Send code again
                    </p>
                  ) : (
                    <p>Send code again in {counter} seconds</p>
                  )}
                </div>
                <PrimaryButton   disabled={!formState.isValid || isLoading} type="submit" label="Verify Code" />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>

  );
};

export default VerifyEmailPage;