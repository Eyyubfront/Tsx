
import { Link } from 'react-router-dom';
import Paragrafy from '../Paragrafy/Paragrafy';
import { FC } from 'react';
interface LinkProps{
    element:boolean,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const CustomLink:FC<LinkProps> = ({ element }) => {
    console.log("element:", element);

    return (
        <div>
            <Link className='signup_nav' to="/signin">
                <Paragrafy text={element ? "Sign in" : "Sign up"} />
            </Link>
        </div>

    )
}

export default CustomLink
