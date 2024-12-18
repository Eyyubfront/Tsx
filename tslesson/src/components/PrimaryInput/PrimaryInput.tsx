import { FC, useState } from "react";
import "./PrimaryInput.scss"
import Paragrafy from "../Paragrafy/Paragrafy";
import { FaCircleCheck } from "react-icons/fa6";
import { RxEyeOpen } from "react-icons/rx";
import { FaRegEyeSlash } from "react-icons/fa";
interface CustomInputPros {
  type?: "text" | "email" | "password"
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string,
  label?: string;
  isValid?: boolean;
  isValidEmail?: boolean;
  isEyeicon?: boolean;
  handleEye?: () => void;
  iseye?: boolean;
}

const PrimaryInput: FC<CustomInputPros> = ({ type, value, onChange, placeholder, label, isValid, isValidEmail, isEyeicon, iseye, handleEye }) => {

  console.log("++++", iseye)

  return (
    <div className="input_div">
      <Paragrafy text={label} />
      <input type={iseye ? "text" : "password"} name="" id=""
        value={value}
        className="input_primary"
        onChange={onChange}

        placeholder={placeholder}
      />
      {isValid && isValidEmail && (<div style={{ position: "relative" }}>
        <FaCircleCheck className='circle_icon' />
      </div>)
      }
      {isEyeicon && <div className='eyesonof' onClick={handleEye}>
        {iseye ? <RxEyeOpen className='eye_icon' /> : <FaRegEyeSlash className='eye_icon' />}
      </div>}
    </div>

  )
}

export default PrimaryInput
