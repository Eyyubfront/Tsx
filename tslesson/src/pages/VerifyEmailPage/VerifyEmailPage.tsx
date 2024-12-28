import { useState, useEffect } from "react";
import LeftVerifyEmail from "../../components/LeftVerifyEmail/LeftVerifyEmail";
import "./VerifyEmailPage.scss";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import Heading from "../../components/Heading";
import Paragrafy from "../../components/Paragrafy/Paragrafy";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

const VerifyEmailPage = () => {
  const [counter, setCounter] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [inputCode, setInputCode] = useState(["", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const validCode = "12345";

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
    setCounter(30);
    setCanResend(false);
    console.log("Code resent!");
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

  const navigate = useNavigate();

  const handleSubmit = () => {
    const enteredCode = inputCode.join("");
    if (enteredCode === validCode) {
      console.log("Correct code! Verification successful.");
      setErrorMessage("");
    } else {
      setErrorMessage("Wrong code, please try again");
    }
  };

  return (
    <Container>
      <div className="main-div">
        <LeftVerifyEmail />
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
                <Button
                  onClick={handleResend}
                  className="btn2"
                >Send code again</Button>
              ) : (
                <p>Send code again in {counter} seconds</p>
              )}
            </div>
            <Link to={"/resetpasswordpage"}>
              <PrimaryButton
                onClick={handleSubmit}
                label="Verify Code"
              />
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default VerifyEmailPage;
