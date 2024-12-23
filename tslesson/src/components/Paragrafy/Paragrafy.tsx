import { FC } from "react";
import "./Paragrafy.scss";

interface ParagrafyProps {
  text?: string;
  fontsize?: string;
  fontfamily?: string;
  fontWeight?: string; 
 
}

const Paragrafy: FC<ParagrafyProps> = ({ text, fontsize, fontfamily, fontWeight }) => {
  return (
    <p
      className="signin_controlinfo"
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
