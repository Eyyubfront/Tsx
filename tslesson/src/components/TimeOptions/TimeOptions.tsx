import React from 'react';
import "./TimeOptions.scss"

interface TimeOption {
  label: string;
  id: number;
}

interface TimeOptionsProps {
  timeOptions: TimeOption[];
  selectedOption: number;  // selectedOption'ı number olarak değiştiriyoruz
  onOptionSelect: (id: number) => void;  // sadece id parametresi alacak
  errorMessage: string | undefined;
}

const TimeOptions: React.FC<TimeOptionsProps> = ({ timeOptions, selectedOption, onOptionSelect, errorMessage }) => {
  return (
    <div className="pa-group">
      {timeOptions.map(option => (
        <p
          key={option.id} 
          className={`time-option ${selectedOption === option.id ? "selectedtime" : ""}`}  // selectedOption ve option.id karşılaştırılıyor
          onClick={() => onOptionSelect(option.id)}  // sadece id'yi gönderiyoruz
        >
          {option.label}
        </p>
      ))}
      {errorMessage}
    </div>
  );
};

export default TimeOptions;
