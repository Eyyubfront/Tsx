import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftVerifyEmail from "../../components/LeftVerifyEmail/LeftVerifyEmail";
import "./VerifyEmailPage.scss";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import Heading from "../../components/Heading";
import Paragrafy from "../../components/Paragrafy/Paragrafy";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { confirmEmail, resendConfirmationToken } from "../../store/slice/emailVerificationSlice";
import { useAppSelector } from "../../store/index";

const VerifyEmailPage = () => {
  const [counter, setCounter] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [inputCode, setInputCode] = useState(["", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error, success } = useAppSelector((state: any) => state.emailVerification);

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
    dispatch(resendConfirmationToken());
    setCounter(30);
    setCanResend(false);
  };

  const handleInputChange = (value: any, index: any) => {
    if (!/^\d*$/.test(value)) return;

    const newInputCode = [...inputCode];
    newInputCode[index] = value;
    setInputCode(newInputCode);
    setErrorMessage("");

    if (value && index < inputCode.length - 1) {
      const nextInput = document.getElementById(`input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmit = () => {
    const enteredCode = inputCode.join("");
    if (enteredCode.length === 5) {
      dispatch(confirmEmail(enteredCode)).then((action: any) => {
        if (action.meta.requestStatus === "fulfilled") {
          navigate("/resetpasswordpage"); 
        } else {
          setErrorMessage(error || "Wrong code, please try again.");
        }
      });
    } else {
      setErrorMessage("Please enter a valid code.");
    }
  };

  return (
    <Container>
      <div className="main-div">
        <LeftVerifyEmail TitleText="Hi, Welcome!" DescriptionText="Create your vocabulary, get reminders, and test your memory with quick quizzes!" />
        <Button className="btn" onClick={() => navigate("/forgotpasswordpage")}>
          <KeyboardArrowLeftIcon />
        </Button>
        <div className="verify-email">
          <div className="verify-content">
            <Heading text="Verify E-mail address" />
            <Paragrafy text="We’ve sent an activation code to your email" />
            <div className="inputs">
              {inputCode.map((digit, index) => (
                <input
                  key={index}
                  id={`input-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(e.target.value, index)}
                />
              ))}
            </div>
            {errorMessage && (
              <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
            )}

             <div className="resend-code">
              {canResend ? (
                <Button onClick={handleResend} className="btn2">
                  Send code again
                </Button>
              ) : (
                <p>Send code again in {counter} seconds</p>
              )}
            </div>
            <PrimaryButton onClick={handleSubmit} label="Verify Code" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default VerifyEmailPage;
