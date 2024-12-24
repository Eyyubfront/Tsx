import { useState, useEffect } from "react";
import LeftVerifyEmail from "../../components/LeftVerifyEmail/LeftVerifyEmail";
import "./VerifyEmailPage.scss";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Button from "@mui/material/Button";
import CustomHeading from "../../components/CustomHeading";
import CustomText from "../../components/CustomText";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";

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
            <CustomHeading text="Verify E-mail address" className="vrfhead" />
            <CustomText
              text="We’ve sent an activation code to your email"
              className="vrftext"
            />
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
                <CustomButton
                  onClick={handleResend}
                  className="resend-button"
                  text="Send code again"
                />
              ) : (
                <p>Send code again in {counter} seconds</p>
              )}
            </div>
            <Link to={"/resetpasswordpage"}>
              <CustomButton
                onClick={handleSubmit}
                className="verify-button"
                text="Verify Code"
                backgroundColor="#8B6DE8"
                color="#fff"
                width="100%"
                padding="15px"
                borderRadius="7px"
                outline="none"
                margin="10px"
              />
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default VerifyEmailPage;
