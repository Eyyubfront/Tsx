import { FC } from "react";

import Paragrafy from "../Paragrafy/Paragrafy";
import { FaCircleCheck } from "react-icons/fa6";
import { RxEyeOpen } from "react-icons/rx";
import { FaRegEyeSlash } from "react-icons/fa";
import { useFormContext } from "react-hook-form";

interface CustomInputProps {
  type?: "text" | "email" | "password";
  label?: string;
  isValidEmail?: boolean;
  isEyeicon?: boolean;
  handleEye?: () => void;
  iseye?: boolean;
  name: string;
  errorMessage?: string; 
}

const Input: FC<CustomInputProps> = ({
  type = "text",
  label,
  isValidEmail,
  isEyeicon,
  iseye,
  handleEye,
  name,
}) => {
  const inputType = type === "password" && iseye ? "text" : type;
  const { register, formState: { errors } } = useFormContext(); 

  return (
    <div className="input_div">
      <Paragrafy text={label} />
      <div className="input_wrapper">
        <input
          {...register(name)} 
          type={inputType} 
          placeholder={label} 
          className={`input_primary ${errors[name] ? 'error' : ''}`} 
        />
        {isValidEmail && (
          <div style={{ position: "relative" }}>
            <FaCircleCheck className="circle_icon" />
          </div>
        )}
        {isEyeicon && (
          <div className="eyesonof" onClick={handleEye}>
            {iseye ? (
              <RxEyeOpen className="eye_icon" />
            ) : (
              <FaRegEyeSlash className="eye_icon" />
            )}
          </div>
        )}
        {errors[name] && (
          <span className="error_message">{String(errors[name]?.message)}</span>
        )}
      </div>
    </div>
  );
};

export default Input;