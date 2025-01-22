import LeftVerifyEmail from "../../components/LeftVerifyEmail/LeftVerifyEmail";
import "./ForgotPasswordPage.scss";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Button from "@mui/material/Button";
import CustomInput from "../../components/CustomInput";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import Heading from "../../components/Heading";
import Paragrafy from "../../components/Paragrafy/Paragrafy";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
const ForgotPasswordPage = () => {
  return (
    <Container className="container">
      <div className="forgot-div">
        <LeftVerifyEmail TitleText="Hi, Welcome!" DescriptionText="Create your vocabulary, get reminders, and test your memory with quick quizzes!" />
        <Button
          className="leftBt"
          sx={{
            border: "2px solid #D8DADC ",
            color: "black",
            borderRadius: "10px",
          }}
        >
          <KeyboardArrowLeftIcon />
        </Button>
        <div className="forgot-pass">
          <Heading text="Forgot password ?" />
          <Paragrafy text="Don’t worry! It happens. Please enter the email associated with your account." />

          <form>
            <CustomInput
              label="Email Address"
              placeholder="Enter your email"
              type="email"
              fontSize="16px"
              border="1px solid #ccc"
              borderRadius="7px"
              outline="none"
              className="forgot-input"
            />
            <Link to="/verifyemailpage">
            <PrimaryButton
                label="Verify Code"
                type="button"
              />
            </Link>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default ForgotPasswordPage;
