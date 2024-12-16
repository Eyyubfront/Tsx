import { FC } from "react";
import "./PrimaryInput.scss"

interface CustomInputPros{
  type?:"text"|"email"|"password"
  value:string;
 onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
 placeholder?:string
}

const PrimaryInput:FC<CustomInputPros> = ({type,value,onChange,placeholder}) => {
  return (
    <div className="input_div">
      <input type={type} name="" id=""
      value={value}
      className="input_primary"
      onChange={onChange}
      placeholder={placeholder}
      />
    </div>
  )
}

export default PrimaryInput
