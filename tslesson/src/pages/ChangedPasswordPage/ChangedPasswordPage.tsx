import LeftVerifyEmail from "../../components/LeftVerifyEmail/LeftVerifyEmail";
import "./ChangedPasswordPage.scss";
import CustomHeading from "../../components/CustomHeading";
import CustomText from "../../components/CustomText";
import CustomButton from "../../components/CustomButton";
import Icon from '../../assets/images/verify/Icon.png'
const ChangedPasswordPage = () => {
  return (
    <div className="container">
      <div className="main-div">
        <div className="left-side">
          <LeftVerifyEmail />
        </div>
        <div className="changed-pass">
          <img src={Icon} />
          <CustomHeading
            color="#1D1730"
            lineHeight="62.4px"
            fontSize="48px"
            text="Password changed"
            fontWeight="400"
            className="fgHead"
          />
          <CustomText
            color="#000000B2"
            lineHeight="25.6px"
            fontSize="16px"
            text="Your password has been changed succesfully"
            className="fgtext"
          />

            <CustomButton
            text="Create account"
            backgroundColor="#8B6DE8"
            color="#ffff"
            className="custombtn"
          />
        </div>
      </div>
    </div>
  );
};

export default ChangedPasswordPage;
