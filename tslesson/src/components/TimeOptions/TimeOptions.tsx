import React from 'react';
import "./TimeOptions.scss"

interface TimeOption {
  label: string;
  id: number;
}

interface TimeOptionsProps {
  timeOptions: TimeOption[];
  selectedOption: number; 
  onOptionSelect: (id: number) => void;  
  errorMessage: string | undefined;
}

const TimeOptions: React.FC<TimeOptionsProps> = ({ timeOptions, selectedOption, onOptionSelect, errorMessage }) => {
  return (
    <div className="pa-group">
      {timeOptions.map(option => (
        <p
          key={option.id} 
          className={`time-option ${selectedOption === option.id ? "selectedtime" : ""}`}  
          onClick={() => onOptionSelect(option.id)} 
        >
          {option.label}
        </p>
      ))}
      {errorMessage}
    </div>
  );
};

export default TimeOptions;
