import './AuthLeftPanel.scss'
import star from "../../assets/images/AuthImages/star/starimg.png"
import hand from "../../assets/images/AuthImages/hand/hand.png"
import Paragrafy from '../../components/Paragrafy/Paragrafy'

const AuthLeftPanel = () => {
  return (
    <div className="leftpanel_container">
      <div className="leftpanel_staricon">
        <img className='starimg' src={star} alt="" />
      </div>
      <div className="leftpanel_bottomtext">
        <div className="leftpanel_botomname">
          <Paragrafy className='leftpanel_bottomwelcome' fontsize='30px' fontfamily='DM Serif Display'  text={"Hi, Welcome!"}/>
          <img src={hand} alt="" />
        </div>
        <div className="leftpanel_bottom">
        <Paragrafy className='leftpanel_bottomabouttext' fontsize='18px' fontfamily='DM Sans'  text={"Create your vocabulary, get reminders, and test your memory with quick quizzes!"}/>
        </div>
      </div>
    </div>
  )
}

export default AuthLeftPanel
