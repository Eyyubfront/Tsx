import { Button } from "@mui/material"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { FC } from "react";
import "./BackButton.scss"

interface BackButtonProps{
    onClick?:(e:any)=>void;
  }
const BackButton:FC<BackButtonProps> = ({onClick}) => {
  return (
    <Button
    onClick={onClick}
    className="LeftButton"
  >
    <KeyboardArrowLeftIcon />
  </Button>
  )
}

export default BackButton
