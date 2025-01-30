import LeftVerifyEmail from "../../layout/SidePanel/SidePanel";
import "./ChangedPasswordPage.scss";
import Icon from "../../assets/images/verify/Icon.png";
import { Container } from "@mui/material";
import Heading from "../../components/Heading";
import Paragrafy from "../../components/Paragrafy/Paragrafy";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
const ChangedPasswordPage = () => {
  return (
    <Container>
      <div className="changed-div">
        <LeftVerifyEmail titleText="Hi, Welcome!" descriptionText="Create your vocabulary, get reminders, and test your memory with quick quizzes!" />
        <div className="changed-pass">
          <div className="image">
            <img src={Icon} />
          </div>
          <Heading text="Password changed" />
          <Paragrafy
            text="Your password has been changed succesfully"
          />
         <PrimaryButton
                label="Create Account"
                type="button"
              />
        </div>
      </div>
    </Container>
  );
};

export default ChangedPasswordPage;
