import { Button } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const BackIcon = (props) => {
  const { onClick = () => {}, className = "" } = props;

  return (
    <div>
      <Button
        onClick={onClick}
        className={`learn-btn ${className}`} 
        sx={{
          border: "2px solid #D8DADC",
          color: "black",
          borderRadius: "10px",
        }}
      >
        <KeyboardArrowLeftIcon /> 
      </Button>
    </div>
  );
};

export default BackIcon;
