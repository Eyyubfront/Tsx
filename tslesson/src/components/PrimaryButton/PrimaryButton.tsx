import { FC } from "react";
import "./PrimaryButton.scss";
import { MouseEventHandler } from "react";

interface CustomButtonProps {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>; 
  type?: "button" | "submit" | "reset";
  disabled: boolean;
}

const PrimaryButton: FC<CustomButtonProps> = ({ label, onClick, type = "button", disabled }) => {
  return (
    <button className="button_primary" disabled={disabled} onClick={onClick} type={type}>
      {label}
    </button>
  );
};

export default PrimaryButton;
