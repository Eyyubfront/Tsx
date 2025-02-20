import hand from '../../assets/images/verify/hand.png';
import star from '../../assets/images/verify/star.png';
import Paragrafy from '../../components/Paragrafy/Paragrafy';
import './SidePanel.scss';

interface VerifyProps {
  titleText: string;
  descriptionText: string;
}

const SidePanel: React.FC<VerifyProps> = ({ titleText, descriptionText }) => {
  return (
    <div className="side-panel main-container">
      <div className="icon-container star-icon-wrap">
        <img className='star-icon' src={star} alt="Star Icon" />
      </div>
      <div className="text-container bottom-text-wrap">
        <div className="name-container title-wrap">
          <Paragrafy className='welcome-text' fontsize='30px' fontfamily='DM Serif Display' text={titleText} />
          <img className='hand-image' src={hand} alt="Hand Icon" />
        </div>
        <div className="description-container bottom-text">
          <Paragrafy className='description-text' fontsize='18px' fontfamily='DM Sans' text={descriptionText} />
        </div>
      </div>
    </div>
  );
};

export default SidePanel;