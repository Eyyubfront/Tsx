import { Controller, useFormContext } from 'react-hook-form';
import "./UseFormModalInput.scss"

interface UseFormTimeInputProps {
    label: string;
    name: string;
    className?: string; 
    type: "select";
}

const UseFormModalInput: React.FC<UseFormTimeInputProps> = ({ label, name, className }) => {
    const {register, control, formState: { errors } } = useFormContext();

    const errorMessage = errors[name]?.message;

    return (
        <div className="use-form-input">
            <label className="labelinputtime">{label}</label>
            <Controller
                name={name}
                control={control}
                rules={{
                    required: "language required",
                }}
                render={({ field }) => (
                    <>
                        <input
                          {...register(name)} 
                            {...field}
                            className={`${className} inputmodals ${errorMessage ? 'input-error' : ''}`} 
                        />
                        {errorMessage && <span className="error_message">{String(errorMessage)}</span>}
                    </>
                )}
            />
        </div>
    );
};

export default UseFormModalInput;