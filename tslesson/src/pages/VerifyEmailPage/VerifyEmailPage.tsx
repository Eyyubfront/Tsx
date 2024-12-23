import { useState, useEffect } from "react";
import LeftVerifyEmail from "../../components/LeftVerifyEmail/LeftVerifyEmail";
import "./VerifyEmailPage.scss";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Button from "@mui/material/Button";
import CustomHeading from "../../components/CustomHeading";
import CustomText from "../../components/CustomText";
import CustomButton from "../../components/CustomButton";

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

  const handleInputChange = (value:any, index:any) => {
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
    if (enteredCode === validCode) {
      console.log("Correct code! Verification successful.");
      setErrorMessage("");
    } else {
      setErrorMessage("Wrong code, please try again");
    }
  };

  return (
    <div className="container">
      <div className="main-div">
        <LeftVerifyEmail />
      

        <div className="verify-email">
        <Button
            className="btn"
            sx={{
              border: "2px solid #D8DADC ",
              color: "black",
              borderRadius: "10px",
            }}
          >
            <KeyboardArrowLeftIcon />
          </Button>
          <div className="verify-content">
            <CustomHeading
              color="#1D1730"
              lineHeight="62.4px"
              fontSize="48px"
              fontWeight="400"
              text="Verify E-mail address"
              className="customhead"
            />
            <CustomText
              color="#000000B2"
              lineHeight="25.6px"
              fontSize="16px"
              text="We’ve sent an activation code to your email"
              className="customtext"
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
            <CustomButton
              onClick={handleSubmit}
              className="verify-button"
              text="Verify Code"
              backgroundColor="#F83030"
              color="#fff"
              padding="10px"
              borderRadius="7px"
              outline="none"
              margin="10px"
            />

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
