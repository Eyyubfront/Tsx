import { Link, Outlet, useNavigate } from "react-router-dom"
import BackButton from "../../components/BackButton/BackButton"
import Header from "../../components/Header/Header"
import Paragrafy from "../../components/Paragrafy/Paragrafy"
import Sidebar from "../../components/Sidebar/Sidebar"
import "./SettingsLayout.scss"
const SettingsLayout = () => {
  const navigate = useNavigate();
  return (
    <div className="setigns_allscontainer">
      <div className="settings__page">
        <Header />
        <div className="settings__sidebar">
          <div className="settingssidebar__top">
            <BackButton className="settingsbackicon" onClick={() => navigate("")} />
            <Paragrafy className="Settignsbackname" text="Settings" />
          </div>
          <div className="settingssidebar__bottom">
            <Sidebar />
            <Outlet />
          </div>
        </div>
      </div>
      <div className="homepage_quiz">
        <Link style={{ textDecoration: "none", color: 'black' }} to="">
          <Paragrafy className='quiz_center' fontsize='24px' fontfamily='DM Serif Display' text='Let’s start quiz' />
        </Link>
      </div>
    </div>
  )
}

export default SettingsLayout