import { FC } from 'react';
import "./Heading.scss"
interface HeadingProps {
  text: string;
  fontsize?: string; 
}

const Heading: FC<HeadingProps> = ({ text, fontsize }) => {
  return (
    <h2 className='signin_name' style={{ fontSize: fontsize }}>
      {text}
    </h2>
  );
}

export default Heading;
