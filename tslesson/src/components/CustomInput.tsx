import React from "react";

interface CustomInputProps {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  label?: string;
  placeholder?: string;
  border?: string;
  borderRadius?: string;
  outline?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: any; 
}

function CustomInput({
  fontSize,
  fontWeight,
  color,
  label,
  placeholder,
  border,
  borderRadius,
  outline,
  type,
  value,
  onChange,
  register, 
}: CustomInputProps) {
  return (
    <div style={{ marginBottom: "20px" }}>
      {label && (
        <label
          style={{
            fontSize: fontSize,
            fontWeight: fontWeight,
            color: color,
            display: "block",
            marginBottom: "5px",
          }}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...register ? register() : {}}
        style={{
          fontSize: fontSize,
          border: border,
          borderRadius: borderRadius,
          outline: outline,
          width: "100%",
          padding: "20px",
        }}
      />
    </div>
  );
}

export default CustomInput;
