import star from "../../assets/images/verify/star.png";
import "./VerifyEmailLeft.scss";
import BackIcon from "../BacIcon/BackIcon";

interface VerifyProps{
  TitleText:string,
  DescriptionText:string
}
const VerifyEmailLeft :React.FC<VerifyProps> = ({TitleText,DescriptionText}) => {
  return (
    <div
      className="verify-email-container"
    >
      <div className="verify-email-stars">
        <BackIcon className="my-icon" />
        <img className="verify-email-star-image" src={star} alt="Star Icon" />
      </div>
      <div className="verify-email-content">
        <div className="verify-email-header">
          <h2>{TitleText}</h2>
        </div>
       <p>{DescriptionText}</p>
      </div>
    </div>
  );
};

export default VerifyEmailLeft;
