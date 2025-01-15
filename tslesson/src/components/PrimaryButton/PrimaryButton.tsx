import { FC } from "react";
import "./PrimaryButton.scss"

interface CustomButtonProps{
  label:string;
  onClick?:(e:any)=>void;
type?:"button"|"submit"|"reset";
disabled:boolean
}

const PrimaryButton:FC<CustomButtonProps> = ({label,onClick,type="button",disabled}) => {
  return (

      <button  className="button_primary" disabled={disabled} onClick={onClick} type={type} >
        {label}
      </button>
     
  )
}

export default PrimaryButton
