import { MouseEventHandler } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { FC } from "react";
import "./BackButton.scss";

interface BackButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const BackButton: FC<BackButtonProps> = ({ onClick, className }) => {
  return (
    <button className={`LeftButton ${className}`} onClick={onClick}>
      <KeyboardArrowLeftIcon />
    </button>
  );
};

export default BackButton;
