import { useState, useEffect } from "react";
import LeftVerifyEmail from "../../layout/SidePanel/SidePanel";
import "./CheckEmailPage.scss";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import Heading from "../../components/Heading";
import Paragrafy from "../../components/Paragrafy/Paragrafy";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

const CheckEmailPage = () => {
  const [counter, setCounter] = useState(30);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleButtonClick = async () => {
    setIsLoading(true);
  };

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
     
    };

    return (
      <Container>
        <div className="check-div">
          <LeftVerifyEmail
            titleText="Hi, Welcome!"
            descriptionText="Create your vocabulary, get reminders, and test your memory with quick quizzes!"
          />

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
              <Heading text="Please check your email" />
              <Paragrafy text="We’ve sent a code to helloworld@gmail.com" />
              <div className="inputs">
                <input type="text" maxLength={1} />
                <input type="text" maxLength={1} />
                <input type="text" maxLength={1} />
                <input type="text" maxLength={1} />
                <input type="text" maxLength={1} />
              </div>
              <div className="resend-code">
                {canResend ? (
                  <Button
                    onClick={handleResend}
                    className="resend-button"
                    variant="outlined"
                    sx={{
                      border: "2px solid #D8DADC",
                      color: "black",
                      borderRadius: "10px",
                    }}
                  >
                    Send code again
                  </Button>
                ) : (
                  <p>Send code again in {counter} seconds</p>
                )}
              </div>
              <PrimaryButton
                onClick={handleButtonClick}
                disabled={isLoading}
                label="Verify Code"
                type="button"
              />
            </div>
          </div>
        </div>
      </Container>
    );

}

  export default CheckEmailPage