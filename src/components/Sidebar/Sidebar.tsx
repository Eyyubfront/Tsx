import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { deleteUser } from "../../store/actions/authActions";
import { logout } from "../../store/slice/authSlice";
import Paragrafy from "../Paragrafy/Paragrafy";
import { useEffect, useState } from "react";
import SideBarDeletModal from "./SideBarDeletModal/SideBarDeletModal";
import "./Sidebar.scss";
import { Skeleton } from "@mui/material";

const cards = [
    { name: "Languages", link: "languagesettings" },
    { name: "Timing", link: "timesettings" },
    { name: "Password", link: "passwordchecksettings" },
    { name: "Terms and Conditions", link: "terms-and-conditions" },
    { name: "Configuration", link: "configurate" },
    { name: "Statistics", link: "statistica" },
];

const accountManagement = [
    { name: "Delete account" },
    { name: "Log out" },
];

const Sidebar = () => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 300)
    }, [])
    let location = useLocation();
    const dispatch = useAppDispatch();
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [modalType, setModalType] = useState<"delete" | "logout" | null>(null);

    const handleLogout = () => {
        dispatch(logout());
        setOpenDialog(false);
    };

    const handleDeleteAccount = () => {
        dispatch(deleteUser());
     
        setOpenDialog(false);
    };

    const handleAccountAction = (action: string) => {
        if (action === "Log out") {
            setModalType("logout");
            setOpenDialog(true);
        } else if (action === "Delete account") {
            setModalType("delete");
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
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [location]);

    return (
        <>

            {
                loading ? <Skeleton style={{ height: "400px", width: "400px" }} /> :
                    <div className="sidebar_box desktop-bar" style={{ display: isSidebarVisible ? "block" : "none" }}>
                        <div className="sidebar_topcontainer">
                            {cards.map((card, index) => (
                                <NavLink className="sidebar_toplinks" to={card.link} style={{ textDecoration: "none" }} key={index}>
                                    <Paragrafy className="sidebar_topnames" text={card.name} />
                                </NavLink>
                            ))}
                            {accountManagement.map((card, index) => (
                                <div onClick={() => handleAccountAction(card.name)} className="sidebar_bottom" key={index}>
                                    <Paragrafy className="sidebar_botomnames" text={card.name} />
                                </div>
                            ))}
                        </div>
                        <SideBarDeletModal
                            open={openDialog}
                            onClose={handleCloseDialog}
                            onConfirm={modalType === "delete" ? handleDeleteAccount : handleLogout}
                            title={modalType === "delete" ? "Delete Account" : "Log Out"}
                            about={modalType === "delete" ? "We're sad to see you go" : "See you soon!"}
                            description={
                                modalType === "delete" ? "Are you sure you want to delete your account? This action cannot be undone." : "Once you log out, you'll need to sign in again to access your account?"
                            }
                            confirmText={modalType === "delete" ? "Delete" : "Log Out"}
                            cancelText="Cancel"
                        />
                    </div>

            }
        </>
    );
};

export default Sidebar;