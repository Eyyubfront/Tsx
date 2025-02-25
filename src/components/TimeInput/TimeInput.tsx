import React from "react";

interface TimeInputProps {
  label: string; 
  value: string; 
  onChange: (value: string) => void; 
}

const TimeInput: React.FC<TimeInputProps> = ({label, value, onChange }) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
        {label}
      </label>
      <input
   
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          width:"100%",
        }}
      />
    </div>
  );
};

export default TimeInput;
