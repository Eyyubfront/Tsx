import './AuthLeftPanel.scss'
import star from "../../assets/images/AuthImages/star/starimg.png"
import hand from "../../assets/images/AuthImages/hand/hand.png"

const AuthLeftPanel = () => {
  return (
    <div className="leftpanel_container">
      <div className="leftpanel_staricon">
        <img className='starimg' src={star} alt="" />
      </div>
      <div className="leftpanel_bottomtext">
        <div className="leftpanel_botomname">
          <h2 className='leftpanelWelcome_text'>Hi, Welcome!</h2>
          <img src={hand} alt="" />
        </div>
        <div className="leftpanel_bottom">
          <p >Create your vocabulary, get reminders, and test your memory with quick quizzes!</p>
        </div>
      </div>
    </div>
  )
}

export default AuthLeftPanel
