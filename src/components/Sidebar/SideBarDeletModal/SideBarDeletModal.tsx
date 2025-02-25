import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from "@mui/material";
import Button from "@mui/material/Button";
import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Paragrafy from "../../Paragrafy/Paragrafy";
import "./SideBarDeletModal.scss";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;  
  description: string; 
  confirmText: string; 
  cancelText: string; 
  about: string; 
}

const SideBarDeletModal: React.FC<ConfirmDialogProps> = ({ open, onClose, onConfirm, title, description, confirmText,about, cancelText }) => {
  return (
    <Dialog className="dialoq" open={open} onClose={onClose}>
      <DialogTitle className="dialoqtitte_tops">
        <Paragrafy className="tittledialoq" text={title} />
        <IconButton className="iconbutton" onClick={onClose} style={{ position: "absolute", right: 8, top: 8 }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent className="dialoq_abouttext">
      <DialogContentText className="abouttextdialoqone">{about}</DialogContentText>
        <DialogContentText className="abouttextdialoqtwo">{description}</DialogContentText>
      </DialogContent>
      <DialogActions className="button_dialoq">
        <Button className="buttonone" onClick={onClose} color="primary">
          {cancelText}
        </Button>
        <Button className="buttontwo" onClick={onConfirm} color="primary">
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SideBarDeletModal;