import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import PrimaryInput from './PrimaryInput';

interface UseFormInputProps {
  name: string;
  rules?: any;
  label: string;
  type: "text" | "email" | "password";
  isEyeicon?: boolean; 
  iseye?: boolean;
  handleEye?: () => void;
  maxLength?: number; // Buraya maxLength ekliyoruz
}

const UseFormInput: React.FC<UseFormInputProps> = ({
  name,
  rules,
  label,
  type,
  isEyeicon,
  iseye,
  handleEye,
  maxLength, // maxLength'i destructure ediyoruz
}) => {
  const { control } = useFormContext(); 
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <PrimaryInput
          {...field}
          label={label}
          type={type}
          isEyeicon={isEyeicon}
          iseye={iseye}
          handleEye={handleEye}
          maxLength={maxLength} // ve burada PrimaryInput'a maxLength'i iletiyoruz
        />
      )}
    />
  );
};

export default UseFormInput;