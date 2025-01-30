
import { useFormContext } from 'react-hook-form';

interface UseFormInputProps {
  label: string;
  name: string;
}

const UseFormTimeInput: React.FC<UseFormInputProps> = ({ label, name }) => {
  const { register, formState: { errors } } = useFormContext();

  console.log(errors[name]?.message)
  return (
    <div className="use-form-input">
      <label>{label}</label>
      <input
        type="time"
        {...register(name, {
          required: "Zaman zorunludur", 
        })}
      />
     
     {errors[name] && (
        <span className="error_message">{String(errors[name]?.message)}</span>
      )}
    </div>
  );
};

export default UseFormTimeInput;