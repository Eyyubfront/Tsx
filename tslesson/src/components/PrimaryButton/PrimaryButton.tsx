import { FC } from "react";
import "./PrimaryButton.scss"

interface CustomButtonProps{
  label:string;
  onClick:(e:any)=>void;
type?:"button"|"submit"|"reset"
}

const PrimaryButton:FC<CustomButtonProps> = ({label,onClick,type="button"}) => {
  return (
    <div>
      <button  className="button_primary" onClick={onClick} type={type} >
        {label}
      </button>
      
    </div>
  )
}

export default PrimaryButton
