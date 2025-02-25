import { FC } from "react";
import "./Paragrafy.scss";

interface ParagrafyProps {
  text?: string;
  fontsize?: string;
  fontfamily?: string;
  fontWeight?: string; 
  className?: string; 
 
}

const Paragrafy: FC<ParagrafyProps> = ({ text,className, fontsize, fontfamily, fontWeight }) => {
  return (
    <p
    className={className}
      style={{ 
        fontSize: fontsize,  
        fontFamily: fontfamily,
        fontWeight: fontWeight,  
  
      }}
    >
      {text}
    </p>
  );
};

export default Paragrafy;
