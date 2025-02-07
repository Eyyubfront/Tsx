import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import Button from '@mui/material/Button';
import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Paragrafy from '../../Paragrafy/Paragrafy';
import "./SideBarDeletModal.scss"
interface ConfirmDeletionDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const SideBarDeletModal: React.FC<ConfirmDeletionDialogProps> = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog className='dialoq' open={open} onClose={onClose}>
            <DialogTitle  className='dialoqtitte_tops'>
                <Paragrafy className='tittledialoq' text='Delete Account' />
                <IconButton className='iconbutton' onClick={onClose} style={{ position: 'absolute', right: 8, top: 8 }}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent className='dialoq_abouttext'>
                <DialogContentText className='abouttextdialoqone'>We're sad to see you go</DialogContentText>
                <DialogContentText className='abouttextdialoqtwo'>Are you sure you want to delete your account? This action cannot be undone.</DialogContentText>
            </DialogContent>
            <DialogActions className='button_dialoq'>
                <Button className='buttonone' onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button className='buttontwo' onClick={onConfirm} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SideBarDeletModal;