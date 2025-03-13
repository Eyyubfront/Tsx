import React from "react";
import "./TimeOptions.scss";

interface TimeOption {
  id: number;
  name: string;
  minutes: number;
}

interface TimeOptionsProps {
  timeOptions: TimeOption[];
  selectedOption: number;
  onOptionSelect: (id: number) => void;
  errorMessage: string | undefined;
}

const TimeOptions: React.FC<TimeOptionsProps> = ({
  timeOptions,
  selectedOption,
  onOptionSelect,
  errorMessage,
}) => {
  return (
    <div className="pa-group">
      <div className="time_group">
        {timeOptions.map((option, index) => (
          <div>
            <p
              key={index}
              className={`time-option ${
                selectedOption === option.id ? "selectedtime" : ""
              }`}
              onClick={() => onOptionSelect(option.id)}
            >
              <p>{option.name}</p>
            </p>
          </div>
        ))}
      </div>
      <div className="erormesage">{errorMessage}</div>
    </div>
  );
};

export default TimeOptions;
