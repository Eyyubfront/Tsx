import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import LeftVerifyEmail from "../../components/LeftVerifyEmail/LeftVerifyEmail";
import Heading from "../../components/Heading";
import Paragrafy from "../../components/Paragrafy/Paragrafy";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { confirmEmail, confirmPasswordResetCode, resendConfirmationToken } from "../../store/actions/verifyemailActions/emailVerificationActions";
import { useForm, FormProvider } from "react-hook-form";
import UseFormInput from "../../components/PrimaryInput/UseFormInput";
import { RootState, useAppDispatch, useAppSelector } from "../../store/index";

const VerifyEmailPage = () => {
  const [counter, setCounter] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const methods = useForm();
  const { handleSubmit } = methods;

  const { error, isLoading } = useAppSelector((state: RootState) => state.emailVerification);
  const { userId, veriyuse } = useAppSelector((state: RootState) => state.Auth);
  console.log("userid", userId);

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
      console.error("User ID bulunamadı.");
    }
  };

  const onSubmit = (data: any) => {
    const enteredCode = Object.values(data).join("");


      if (enteredCode.length === 4) {
        if (veriyuse) {
          dispatch(confirmEmail({ code: enteredCode, userId: String(userId) })).then((action: any) => {
            if (action.meta.requestStatus === "fulfilled") {
              navigate("/languageselector");
            }
          });
        }
        else {
          dispatch(confirmPasswordResetCode({ code: enteredCode, userId: String(userId) })).then((action: any) => {
            if (action.meta.requestStatus === "fulfilled") {
              navigate("/resetpasswordpage");

            }
          });
        }

      }
    } 
  


  return (
    <Container>
      <div className="main-div">
        <LeftVerifyEmail
          titleText="Hi, Welcome!"
          descriptionText="Create your vocabulary, get reminders, and test your memory with quick quizzes!"
        />
        <Button className="btn" onClick={() => navigate("/forgotpasswordpage")}>
          <KeyboardArrowLeftIcon />
        </Button>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="verify-email">
              <div className="verify-content">
                <Heading text="Verify E-mail address" />
                <Paragrafy text="We’ve sent an activation code to your email" />
                <div className="inputs">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <UseFormInput
                      key={index}
                      name={`code-${index}`}
                      label=""
                      rules={{ required: "This field is required" }}
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
                    <Button onClick={handleResend} className="btn2">
                      Send code again
                    </Button>
                  ) : (
                    <p>Send code again in {counter} seconds</p>
                  )}
                </div>
                <PrimaryButton disabled={isLoading} type="submit" label="Verify Code" />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </Container>
  );
};

export default VerifyEmailPage;