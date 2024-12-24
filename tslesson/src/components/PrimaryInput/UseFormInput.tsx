
import React from 'react';
import { Controller, Control, useFormContext } from 'react-hook-form';
import PrimaryInput from './PrimaryInput';

interface UseFormInputProps {
  name: string;
  rules?: any;
  label: string;
  type?: "text" | "email" | "password";
  isEyeicon?: boolean; 
  iseye?: boolean;
  handleEye?: () => void;
}

const UseFormInput: React.FC<UseFormInputProps> = ({
  name,
  rules,
  label,
  type,
  isEyeicon,
  iseye,
  handleEye,

}) => {
    const { control} = useFormContext(); 
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
        />
      )}
     
    />
  );
};

export default UseFormInput;