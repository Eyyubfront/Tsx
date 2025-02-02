
import React from 'react';
import "./TimeOptions.scss"
interface TimeOption {
  label: string;
  id: number;
}

interface TimeOptionsProps {
  timeOptions: TimeOption[];
  selectedOption: string;
  onOptionSelect: (label: string, id: number) => void;
  errorMessage: string | undefined;
}

const TimeOptions: React.FC<TimeOptionsProps> = ({ timeOptions, selectedOption, onOptionSelect, errorMessage }) => {
  return (
    <div className="pa-group">
      {timeOptions.map(option => (
        <p
          key={option.id} 
          className={`time-option ${selectedOption === option.label ? "selectedtime" : ""}`}
          onClick={() => onOptionSelect(option.label, option.id)}
        >
          {option.label}
        </p>
      ))}
      {errorMessage}
    </div>
  );
};

export default TimeOptions;