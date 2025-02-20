import { Link, useNavigate } from "react-router-dom";
import "./ChangedPasswordPage.scss";
import Icon from "../../assets/images/verify/Icon.png";
import Heading from "../../components/Heading";
import Paragrafy from "../../components/Paragrafy/Paragrafy";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { useState } from "react";
import SidePanel from "../../layout/SidePanel/SidePanel";

const ChangedPasswordPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();


  const handleButtonClick = async () => {
    setIsLoading(true);


    setTimeout(() => {
      setIsLoading(false);
      navigate("/login");
    }, 2000);
  };

  return (

    <div className="changedpassword__all">
      <div className="changedpassword__left">
        <SidePanel
          titleText="Hi, Welcome!"
          descriptionText="Create your vocabulary, get reminders, and test your memory with quick quizzes!"
        />
      </div>
      <div className="changedpassword__right">
        <div className="changed-pass">
          <div className="image">
            <img src={Icon} alt="success icon" />
          </div>
          <Heading text="Password changed" />
          <Paragrafy text="Your password has been changed successfully" />
          <PrimaryButton
            label={isLoading ? "Loading..." : "Back to login"}
            type="button"
            onClick={handleButtonClick}
            disabled={isLoading}
          />
             <div className="Reset__bottom">
            <Paragrafy fontfamily="Inter,sans-serif" fontsize="14px" fontWeight="300" text={ "Already have an account? "} />
            <Link className="reset_bottomlinks" to="/">Sign up</Link>
          </div>
        </div>
      </div>
    </div>



  );
};

export default ChangedPasswordPage;
