import { Controller, useFormContext } from 'react-hook-form';
import './UseFormTimeInput.scss';

interface UseFormTimeInputProps {
  label: string;
  name: string;
}

const UseFormTimeInput: React.FC<UseFormTimeInputProps> = ({ label, name }) => {
  const { control, formState: { errors } } = useFormContext();

  const errorMessage = errors[name]?.message;

  return (
    <div className="use-form-input">
      <label className="labelinputtime">{label}</label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: "Time required",
        }}
        render={({ field }) => (
          <>
            <input
              type="time"
              {...field}
              className={`inputtime ${errorMessage ? 'input-error' : ''}`}
            />
            {errorMessage && <span className="error_message">{String(errorMessage)}</span>}
          </>
        )}
      />
    </div>
  );
};

export default UseFormTimeInput;
