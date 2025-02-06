import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { FC } from "react";
import "./BackButton.scss"

interface BackButtonProps{
    onClick?:(e:any)=>void;
    className?:string
  }
const BackButton:FC<BackButtonProps> = ({onClick,className}) => {
  return (
    <div
    className={`LeftButton ${className}`}
    onClick={onClick}
  >
    <KeyboardArrowLeftIcon />
  </div>
  )
}

export default BackButton
