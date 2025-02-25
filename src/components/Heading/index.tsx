import { FC } from 'react';
import "./Heading.scss";

interface HeadingProps {
  text: string;
  fontsize?: string; 
  className?: string; 
}

const Heading: FC<HeadingProps> = ({ text, fontsize, className }) => {
  return (
    <h2 className={`signin_name ${className}`} style={{ fontSize: fontsize }}> 
      {text}
    </h2>
  );
}

export default Heading;