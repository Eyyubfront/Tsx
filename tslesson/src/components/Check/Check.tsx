import { useState } from 'react';
import { IoCheckmark } from "react-icons/io5";
import Paragrafy from '../Paragrafy/Paragrafy';
import "./Check.scss";

const Check = () => {
  const [check, setCheck] = useState<boolean>(false);
  
  const handleCheck = () => {
    setCheck((prevCheck) => !prevCheck);
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
