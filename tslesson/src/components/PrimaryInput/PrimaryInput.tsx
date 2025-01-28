import { FC, useEffect, useState } from "react";
import Paragrafy from "../Paragrafy/Paragrafy";
import { FaCircleCheck } from "react-icons/fa6";
import { RxEyeOpen } from "react-icons/rx";
import { FaRegEyeSlash } from "react-icons/fa";
import { useFormContext } from "react-hook-form";

interface CustomInputProps {
  type?: "text" | "email" | "password";
  label?: string;
  isEyeicon?: boolean;
  handleEye?: () => void;
  iseye?: boolean;
  name: string;
  errorMessage?: string; 
}

const Input: FC<CustomInputProps> = ({
  type = "text",
  label,
  isEyeicon,
  iseye,
  handleEye,
  name,
}) => {
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const { register, watch, formState: { errors } } = useFormContext();
  const email = watch(name); 

  useEffect(() => {
    const validateEmail = (email: string | undefined) => {
      if (!email) return false;
      // Genel e-posta doğrulama düzeni
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(email);
    };
    setIsEmailValid(validateEmail(email));
  }, [email]);

  return (
    <div className="input_div">
      <Paragrafy text={label} />
      <div className="input_wrapper">
        <input
          {...register(name)} 
          type={type} 
          placeholder={label} 
          className={`input_primary ${errors[name] ? 'error' : ''}`} 
        />
        {isEmailValid && (
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
      {errors[name] && (
        <span className="error_message">{String(errors[name]?.message)}</span>
      )}
    </div>
  );
};

export default Input;