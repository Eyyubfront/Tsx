import { useFormContext } from 'react-hook-form';
import './UseFormTimeInput.scss';

interface UseFormTimeInputProps {
  label: string;
  name: string;
}

const UseFormTimeInput: React.FC<UseFormTimeInputProps> = ({ label, name }) => {
  const { register, formState: { errors } } = useFormContext();

  // Error mesajını doğru şekilde kontrol ediyoruz
  const errorMessage = errors[name]?.message;

  return (
    <div className="use-form-input">
      <label className="labelinputtime">{label}</label>
      <input
        type="time"
        {...register(name, {
          required: "Zaman zorunludur", // Burada zaman zorunluluğu var
        })}
        className={`inputtime ${errorMessage ? 'input-error' : ''}`} // Hata varsa input'a özel bir sınıf ekliyoruz
      />
      {/* Error mesajını görüntüle */}
      {errorMessage && <span className="error_message">{String(errorMessage)}</span>}
    </div>
  );
};

export default UseFormTimeInput;
