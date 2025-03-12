
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import DialogContentText from '@mui/material/DialogContentText';
import "./Alertdailog.scss"
interface ErrorAlertDialogProps {
  open: boolean;
  onClose: () => void; 
  error?: string | null | undefined; 
  title?: string;
  children?: React.ReactNode;
  className?:string
}

function AlertDialog({ open, onClose, error, title ,children,className }: ErrorAlertDialogProps) { 
  return (
    <Dialog
    className={`${className} alertalls`}
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="language_dialoqtop">
        <DialogTitle id="alert-dialog-title">
          {title} 
        </DialogTitle>
        <IconButton className='iconbutton' onClick={onClose}>
          <Close />
        </IconButton>
      </div>
      <DialogContent className='alert_content' >
      <div>
        {children}
      </div>
        <DialogContentText id="modal_message">
          {error && <p style={{ color: 'red',textAlign:"center" }}> {error}</p>}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default AlertDialog;