import { useState, MouseEvent } from 'react';
import { Menu, MenuItem, ListItemText } from '@mui/material';
import "./NotifactionComponents.scss";

const NotifactionComponents = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

 
    const notifications = [
        { id: 1, text: "New Category Added" },
        { id: 2, text: "Let’s start learning now" },
        { id: 3, text: "New Category Added" },
        { id: 4, text: "Let’s start learning now" }
    ];

    return (
        <div className="header_notifaciton">
            <div onClick={handleClick} className="header_rinings">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9M15 17H18.5905C18.973 17 19.1652 17 19.3201 16.9478C19.616 16.848 19.8475 16.6156 19.9473 16.3198C19.9997 16.1643 19.9997 15.9715 19.9997 15.5859C19.9997 15.4172 19.9995 15.3329 19.9863 15.2524C19.9614 15.1004 19.9024 14.9563 19.8126 14.8312C19.7651 14.7651 19.7048 14.7048 19.5858 14.5858L19.1963 14.1963C19.0706 14.0706 19 13.9001 19 13.7224V10C19 6.134 15.866 2.99999 12 3C8.13401 3.00001 5 6.13401 5 10V13.7224C5 13.9002 4.92924 14.0706 4.80357 14.1963L4.41406 14.5858C4.29476 14.7051 4.23504 14.765 4.1875 14.8312C4.09766 14.9564 4.03815 15.1004 4.0132 15.2524C4 15.3329 4 15.4172 4 15.586C4 15.9715 4 16.1642 4.05245 16.3197C4.15225 16.6156 4.3848 16.848 4.68066 16.9478C4.83556 17 5.02701 17 5.40956 17H9" stroke="#8B6DE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                style={{ padding: "10px" }}
            >
                <div className="dialog-title">
                    <span>Notifications</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 12.0005L11.9497 16.9502L22.5572 6.34375M2.0498 12.0508L6.99955 17.0005M17.606 6.39404L12.3027 11.6973" stroke="#1D1730" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                {notifications.map(notification => (
                    <MenuItem key={notification.id} className='listhead' onClick={handleClose}>
                        <ListItemText primary={notification.text} />
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

export default NotifactionComponents;