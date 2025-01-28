import cardImage from '../../assets/images/verify/card1.png';
import hand from '../../assets/images/verify/hand.png'
import star from '../../assets/images/verify/star.png'
import './LeftVerifyEmail.scss'
interface VerifyProps{
  titleText:string,
  descriptionText:string
}

const LeftVerifyEmail:React.FC<VerifyProps> = ({titleText,descriptionText})=> {
  return (
    <div  className="card" style={{backgroundImage: `url(${cardImage})` }} >
        <div className='stars'><img className='starimage' src={star}/></div>
      <div className="content">
        <div className="contentHead">
        <h2>{titleText}</h2> 
        <span><img src={hand} /></span>
        </div>
        <p>{descriptionText}</p>
      </div>
    </div>
  );
};

export default LeftVerifyEmail;
