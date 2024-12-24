import LeftVerifyEmail from "../../components/LeftVerifyEmail/LeftVerifyEmail";
import "./ChangedPasswordPage.scss";
import CustomHeading from "../../components/CustomHeading";
import CustomText from "../../components/CustomText";
import CustomButton from "../../components/CustomButton";
import Icon from "../../assets/images/verify/Icon.png";
import { Container } from "@mui/material";
const ChangedPasswordPage = () => {
  return (
    <Container>
      <div className="main-div">
        <LeftVerifyEmail />
        <div className="changed-pass">
          <div className="image">
            <img src={Icon} />
          </div>
          <CustomHeading text="Password changed" className="fgHead" />
          <CustomText
            text="Your password has been changed succesfully"
            className="fgtext"
          />
          <CustomButton text="Create account" className="custombtn" />
        </div>
      </div>
    </Container>
  );
};

export default ChangedPasswordPage;
