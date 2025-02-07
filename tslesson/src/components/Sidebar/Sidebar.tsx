import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { deleteUser } from "../../store/actions/authActions";
import { logout } from "../../store/slice/authSlice";
import Paragrafy from "../Paragrafy/Paragrafy";
import { useEffect, useState } from "react";
import SideBarDeletModal from "./SideBarDeletModal/SideBarDeletModal";
import "./Sidebar.scss";

const cards = [
    { name: 'Languages', link: 'languagesettings' },
    { name: 'Timing', link: 'timesettings' },
    { name: 'Password', link: 'passwordchecksettings' },
    { name: 'Terms and Conditions', link: 'terms-and-conditions' },
];
const accountManagement = [
    { name: 'Delete account' },
    { name: 'Log out' }
];

const Sidebar = () => {
    let location = useLocation();
    const dispatch = useAppDispatch();
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleDeleteAccount = () => {

        dispatch(deleteUser());
        setOpenDialog(false);
    };

    const handleAccountAction = (action: string) => {
        if (action === 'Log out') {
            handleLogout();
        } else if (action === 'Delete account') {
            setOpenDialog(true);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    useEffect(() => {
        const handleResize = () => {
            if (location.pathname === "/settingspage" || window.innerWidth > 600) {
                setIsSidebarVisible(true);
            } else {
                setIsSidebarVisible(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [location]);

    return (
        <>
            <div className="sidebar_box" style={{ display: isSidebarVisible ? "block" : "none" }}>
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

            <SideBarDeletModal
                open={openDialog}
                onClose={handleCloseDialog}
                onConfirm={handleDeleteAccount}
            />
        </>
    );
}

export default Sidebar;