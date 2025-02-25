import star from "../../assets/images/verify/star.png";
import "./VerifyEmailLeft.scss";
import BackIcon from "../BackButton/BackButton";

interface VerifyProps{
  titleText:string,
  descriptionText:string
}
const VerifyEmailLeft :React.FC<VerifyProps> = ({titleText,descriptionText}) => {
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
          <h2>{titleText}</h2>
        </div>
       <p>{descriptionText}</p>
      </div>
    </div>
  );
};

export default VerifyEmailLeft;
