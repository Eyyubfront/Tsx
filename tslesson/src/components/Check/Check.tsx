import React, { useState } from 'react';
import { IoCheckmark } from "react-icons/io5";
import Paragrafy from '../Paragrafy/Paragrafy';
import "./Check.scss";

interface CheckProps {
  onCheck: (checked: boolean) => void; 
}

const Check: React.FC<CheckProps> = ({ onCheck }) => {
  const [check, setCheck] = useState<boolean>(false);

  const handleCheck = () => {
    setCheck((prevCheck) => {
      const newCheck = !prevCheck;
      onCheck(newCheck); 
      return newCheck;
    });
  };

  return (
    <div className='checkbox_container'>
      <div onClick={handleCheck} className="checkbox">
        {check && <IoCheckmark size={18} className='checkmark' />}
      </div>
      <Paragrafy fontsize="16px" text="I accept the terms and privacy policy" />
    </div>
  );
};

export default Check;