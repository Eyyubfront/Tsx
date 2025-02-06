import {NavLink } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { deleteUser } from "../../store/actions/authActions";
import { logout } from "../../store/slice/authSlice";
import Paragrafy from "../Paragrafy/Paragrafy";
import "./Sidebar.scss"

const cards = [
    { name: 'Languages', link: 'languagesettings' },
    { name: 'Timing', link: 'timesettings' },
    { name: 'Password', link: 'passwordsettings'},
    { name: 'Terms and Conditions', link: 'terms-and-conditions' },
];
const accountManagement = [
    { name: 'Delete account' },
    { name: 'Log out' }
];
const Sidebar = () => {
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        dispatch(logout());
    };
    const handleDeleteAccount = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if (confirmDelete) {
            dispatch(deleteUser());
        }
    };
    const handleAccountAction = (action: string) => {
        if (action === 'Log out') {
            handleLogout();
        } else if (action === 'Delete account') {
            handleDeleteAccount();
        }
    };
    return (
        <div className="sidebar_box">
            <div className="sidebar_topcontainer">
                {cards.map((card, index) => (
                    <NavLink className="sidebar_toplinks" to={card.link} style={{ textDecoration: 'none' }} key={index}>
                        <Paragrafy className="sidebar_topnames" text={card.name} />
                    </NavLink>
                ))}
            
                {accountManagement.map((card, index) => (
                    <div onClick={() => handleAccountAction(card.name)} className="sidebar_bottom" key={index}>
                        <Paragrafy className="sidebar_botomnames" text={card.name} />
                    </div>
                ))}
          
            </div>
        </div>
    )
}

export default Sidebar
