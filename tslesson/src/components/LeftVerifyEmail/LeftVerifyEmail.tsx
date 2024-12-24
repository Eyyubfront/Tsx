import cardImage from '../../assets/images/verify/card1.png';
import hand from '../../assets/images/verify/hand.png'
import star from '../../assets/images/verify/star.png'
import './LeftVerifyEmail.scss'

const LeftVerifyEmail = () => {
  return (
    <div  className="card" style={{backgroundImage: `url(${cardImage})` }} >
        <div className='stars'><img className='starimage' src={star}/></div>
      <div className="content">
        <div className="contentHead">
        <h2>Hi, Welcome! </h2> 
        <span><img src={hand} /></span>
        </div>
        <p>Create your vocabulary, get reminders, and test your <br /> memory with quick quizzes!</p>
      </div>
    </div>
  );
};

export default LeftVerifyEmail;
