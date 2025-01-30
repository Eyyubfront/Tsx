
import React from 'react';

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
          className={`time-option ${selectedOption === option.label ? "selected" : ""}`}
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