import { Container } from "@mui/material";
import "./LearnLayout.scss";
import BackIcon from "../../components/BacIcon/BackIcon";
import VerifyEmailLeft from "../../components/VerifyEmailLeft/VerifyEmailLeft";

interface IProps {
  children: React.ReactNode;
  TitleText:string,
  DescriptionText:string 
}

const LearnLayout = ({ children, DescriptionText, TitleText  }: IProps) => {
  return (
    <Container className="container">
      <div className="learn-div">
        <div className="left">
          <VerifyEmailLeft
            DescriptionText={DescriptionText}
            TitleText={TitleText}
          />
        </div>
        <div className="right">
          <BackIcon className="my-custom-class" />
          <div className="content">{children}</div>
        </div>
      </div>
    </Container>
  );
};

export default LearnLayout;
