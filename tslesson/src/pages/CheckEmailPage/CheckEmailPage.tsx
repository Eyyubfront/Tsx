import { useState, useEffect } from "react";
import LeftVerifyEmail from "../../components/LeftVerifyEmail/LeftVerifyEmail";
import "./CheckEmailPage.scss";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Button from "@mui/material/Button";
import CustomHeading from "../../components/CustomHeading";
import CustomText from "../../components/CustomText";
import CustomButton from "../../components/CustomButton";
import { Container } from "@mui/material";

const CheckEmailPage = () => {
  const [counter, setCounter] = useState(30);
  const [canResend, setCanResend] = useState(false);

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

  return (
      <Container>
      <div className="main-div">
        <LeftVerifyEmail />

        <div className="check-email">
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
              text="Please check your email"
              className="customhead"
            />
            <CustomText
              className="csttext"
              text="We’ve sent a code to helloworld@gmail.com"
            />
            <div className="inputs">
              <input type="text" maxLength={1} />
              <input type="text" maxLength={1} />
              <input type="text" maxLength={1} />
              <input type="text" maxLength={1} />
              <input type="text" maxLength={1} />
            </div>
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
            <CustomButton
              text="Verify Code"
              className="custombtn"
            />
          </div>
        </div>
      </div>
      </Container>
  );
};

export default CheckEmailPage;
