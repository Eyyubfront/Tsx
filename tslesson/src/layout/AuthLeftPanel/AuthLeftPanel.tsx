import './AuthLeftPanel.scss';
import star from "../../assets/images/AuthImages/star/starimg.png";
import hand from "../../assets/images/AuthImages/hand/hand.png";
import Paragrafy from '../../components/Paragrafy/Paragrafy';

interface LeftPanelProps {
  TittleText: string;
  descriptionText: string;
}

const AuthLeftPanel: React.FC<LeftPanelProps> = ({ TittleText, descriptionText }) => {
  return (
    <div className="leftpanel_container">
      <div className="leftpanel_staricon">
        <img className='starimg' src={star} alt="" />
      </div>
      <div className="leftpanel_bottomtext">
        <div className="leftpanel_botomname">
          <Paragrafy className='leftpanel_bottomwelcome' fontsize='30px' fontfamily='DM Serif Display' text={TittleText} />
          <img src={hand} alt="" />
        </div>
        <div className="leftpanel_bottom">
          <Paragrafy className='leftpanel_bottomabouttext' fontsize='18px' fontfamily='DM Sans' text={descriptionText} />
        </div>
      </div>
    </div>
  );
}

export default AuthLeftPanel;