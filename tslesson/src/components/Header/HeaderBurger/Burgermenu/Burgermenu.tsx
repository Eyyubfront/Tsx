import React, { useState } from "react";
import { Box, Dialog, IconButton, Stack, Card, CardContent, Typography } from "@mui/material";
import { Close, Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Lock from "../../../../assets/images/header/burgermenuicons/Lock.svg";
import Globe from "../../../../assets/images/header/burgermenuicons/Globe.svg";
import ExternalLink from "../../../../assets/images/header/burgermenuicons/External_Link.svg";
import BookOpen from "../../../../assets/images/header/burgermenuicons/Book_Open.svg";
import Alarm from "../../../../assets/images/header/burgermenuicons/Alarm.svg";
import LogoutIcon from "../../../../assets/images/header/burgermenuicons/Logout.svg";
import Deleteaccount from "../../../../assets/images/header/burgermenuicons/Trash_Full.svg";
import { logout } from "../../../../store/slice/authSlice";
import "./Burgermenu.scss";
import {useAppDispatch } from "../../../../store";
import { deleteUser } from "../../../../store/actions/authActions";

interface NameProps {
    className: string;
}

const cards = [
    { name: 'Languages', img: Globe, link: '/languageselector' },
    { name: 'Timing', img: Alarm, link: '/learntime' },
    { name: 'Password', img: Lock, link: '/resetpasswordpage' },
    {
        name: 'Terms and Conditions',
        img: BookOpen,
        img2: ExternalLink,
        link: '/terms-and-conditions',
        link2: '/',
    },
];

const accountManagement = [
    { name: 'Delete account', img: Deleteaccount },
    { name: 'Log out', img: LogoutIcon } 
];

const BurgerMenu: React.FC<NameProps> = ({ className }) => {
   
    const [open, setOpen] = useState<boolean>(false);
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

    return (
        <>
            <Box className={className}>
                <IconButton style={{ color: "#8B6DE8", zIndex: 9999999 }} onClick={() => setOpen(!open)}>
                    {open ? <Close /> : <MenuIcon />}
                </IconButton>
                <Dialog fullScreen open={open} onClose={() => setOpen(false)}>
                    <Box className="burger_alls">
                        <Stack className="burger_topcontainer">
                            {cards.map((card, index) => (
                                <Link className="burgermenu_topcards" to={card.link} style={{ textDecoration: 'none' }} key={index}>
                                    <Card className="burgermenu_top">
                                        <img src={card.img} alt={card.name} className="cardsicons" />
                                        <CardContent>
                                            <Typography className="burgermenu_topname" variant="h6">{card.name}</Typography>
                                        </CardContent>
                                        <div className="extralinks">
                                            {card.img2 && (
                                                <a href={card.link2}>
                                                    <img src={card.img2} alt={card.name} className="cardsicons" />
                                                </a>
                                            )}
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </Stack>
                        <Stack className="burger_bottomcontainer">
                            {accountManagement.map((card, index) => (
                                <Box className="burgermenu_bottom" key={index}>
                                    <Card className="burgermenu_bottomcards"  onClick={card.name === 'Log out' ? handleLogout : card.name === 'Delete account' ? handleDeleteAccount : undefined}>
                                        <CardContent>
                                            <Typography className="burgermenubottom_name" variant="h6">{card.name}</Typography>
                                        </CardContent>
                                        <img src={card.img} alt={card.name} className="accountManagementicons" />
                                    </Card>
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                </Dialog>
            </Box>
        </>
    );
};

export default BurgerMenu;