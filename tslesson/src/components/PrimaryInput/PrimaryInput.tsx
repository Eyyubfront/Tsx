import { FC } from "react";
import "./PrimaryInput.scss";
import Paragrafy from "../Paragrafy/Paragrafy";
import { FaCircleCheck } from "react-icons/fa6";
import { RxEyeOpen } from "react-icons/rx";
import { FaRegEyeSlash } from "react-icons/fa";

interface CustomInputProps {
  type?: "text" | "email" | "password";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  isValidEmail?: boolean;
  isEyeicon?: boolean;
  handleEye?: () => void;
  iseye?: boolean;

}
const PrimaryInput: FC<CustomInputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  label,
  isValidEmail,
  isEyeicon,
  iseye,
  handleEye,
  
}) => {
  const inputType = type === "password" && iseye ? "text" : type;

  return (
    <div className="input_div">
      <Paragrafy text={label} />
      <div className="input_wrapper">
        <input
          type={inputType}
          value={value}
          className="input_primary"
          onChange={onChange}
          placeholder={placeholder}
        />
        {isValidEmail && value && (
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
      </div>
    </div>
  );
};


export default PrimaryInput;
