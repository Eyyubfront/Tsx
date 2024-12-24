import LeftVerifyEmail from "../../components/LeftVerifyEmail/LeftVerifyEmail";
import "./ForgotPasswordPage.scss";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Button from "@mui/material/Button";
import CustomHeading from "../../components/CustomHeading";
import CustomText from "../../components/CustomText";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
const ForgotPasswordPage = () => {
  return (

    <Container>
      <div className="main-div">
        <LeftVerifyEmail />
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
      
          <CustomHeading
            text="Forgot password ?"
            className="fgHead"
          />
          <CustomText
            text="Don’t worry! It happens. Please enter the email associated with your account."
            className="fgtext"
          />

          <form>
            <CustomInput
              label="Email Address"
              placeholder="Enter your email"
              type="email"
              fontSize="16px"
              border="1px solid #ccc"
              borderRadius="7px"
              outline="none"
            />
            <Link to="/verifyemailpage">
              <CustomButton
                text="Verify Code"
                backgroundColor="#8B6DE8"
                color="#ffff"
                className="custombtn"
              />
            </Link>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default ForgotPasswordPage;
