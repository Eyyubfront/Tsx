import { Container } from "@mui/material";
import "./LearnLayout.scss";
import BackIcon from "../../components/BacIcon/BackIcon";
import VerifyEmailLeft from "../../components/VerifyEmailLeft/VerifyEmailLeft";
import { useNavigate } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
  titleText: string;
  descriptionText: string;
}

const LearnLayout = ({ children, descriptionText, titleText }: IProps) => {
  const navigate = useNavigate(); 

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Container className="container">
      <div className="learn-div">
        <div className="left">
          <VerifyEmailLeft
            descriptionText={descriptionText}
            titleText={titleText}
          />
        </div>
        <div className="right">
          <BackIcon className="my-custom-class" onClick={handleBackClick} />
          <div className="content">{children}</div>
        </div>
      </div>
    </Container>
  );
};

export default LearnLayout;
