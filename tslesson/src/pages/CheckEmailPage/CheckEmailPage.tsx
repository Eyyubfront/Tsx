import { useState, useEffect } from "react";
import LeftVerifyEmail from "../../components/LeftVerifyEmail/LeftVerifyEmail";
import "./CheckEmailPage.scss";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Button from "@mui/material/Button";
import CustomHeading from "../../components/CustomHeading";
import CustomText from "../../components/CustomText";
import CustomButton from "../../components/CustomButton";

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
    <div className="container">
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
              color="#1D1730"
              lineHeight="62.4px"
              fontSize="48px"
              fontWeight="400"
              text="Please check your email"
              className="customhead"
            />
            <CustomText
              color="#000000B2"
              lineHeight="25.6px"
              fontSize="16px"
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
              backgroundColor="#8B6DE8"
              color="#ffff"
              background-color="blue"
              width="100%"
              padding="10px"
              className="custombtn"
              margin="20px"
              borderRadius="10px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckEmailPage;
