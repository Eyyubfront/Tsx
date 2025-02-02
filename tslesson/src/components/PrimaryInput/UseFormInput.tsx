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
  maxLength?: number;
}

const UseFormInput: React.FC<UseFormInputProps> = ({
  name,
  rules,
  label,
  type,
  isEyeicon,
  iseye,
  handleEye,
  maxLength, 
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
          maxLength={maxLength} 
        />
      )}
    />
  );
};

export default UseFormInput;