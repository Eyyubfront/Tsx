import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface CustomInputProps {
  label?: string;
  type?: string;
  value?: string;
  variant?: "outlined" | "filled" | "standard";
  fullWidth?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string; 
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type = "text",
  value,
  variant = "outlined",
  fullWidth = true,
  onChange = () => {},
  className, 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <TextField
      label={label}
      type={type === "password" ? (isVisible ? "text" : "password") : type}
      value={value}
      onChange={onChange}
      variant={variant}
      fullWidth={fullWidth}
      className={className} 
      InputProps={{
        endAdornment:
          type === "password" ? (
            <InputAdornment position="end">
              <IconButton onClick={toggleVisibility} edge="end">
                {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ) : null,
      }}
    />
  );
};

export default CustomInput;
