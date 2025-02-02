import { FC } from 'react';
import Paragrafy from '../Paragrafy/Paragrafy';

interface LinkProps {
  element: boolean;
  fontfamily?: string;
  onChange?: () => void;
}

const CustomLink: FC<LinkProps> = ({ element, fontfamily, onChange }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();  
    if (onChange) {
      onChange();  
    }
  };

  return (
    <div>
      <a
        href="#" 
        style={{ color: "black", fontFamily: fontfamily }}
        className="signlink"
        onClick={handleClick} 
      >
        <Paragrafy text={element ? "Sign in" : "Sign up"} fontWeight='600' />
      </a>
    </div>
  );
};

export default CustomLink;
