import LeftVerifyEmail from "../../components/LeftVerifyEmail/LeftVerifyEmail";
import "./ForgotPasswordPage.scss";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Button from "@mui/material/Button";
import CustomHeading from "../../components/CustomHeading";
import CustomText from "../../components/CustomText";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { Link } from "react-router-dom";
const ForgotPasswordPage = () => {
  return (
    <div className="container">
      <div className="main-div">

        <div className="left-side">
          <LeftVerifyEmail />
        </div>
        <div className="forgot-pass">
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
          <CustomHeading
            color="#1D1730"
            lineHeight="62.4px"
            fontSize="48px"
            text="Forgot password ?"
            fontWeight="400"
            className="fgHead"
          />
          <CustomText
            color="#000000B2"
            lineHeight="25.6px"
            fontSize="16px"
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
              /></Link>
          </form>


        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
