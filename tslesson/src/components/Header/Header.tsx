import  { useState } from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import Paragrafy from '../../components/Paragrafy/Paragrafy';
import "./Header.scss"
interface Soz {
    id: number;
    textone: string;
    texttwo: string;
}

const sozler: Soz[] = [
    { id: 1, textone: 'English', texttwo: 'Spanish' },

];

const Header: React.FC = () => {
     const [secilenSoz, setSecilenSoz] = useState<string>('');
    
        const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
            setSecilenSoz(event.target.value);
        };
  return (
    <div className='header' >
    <div className="header_left">
        <FormControl className='selects' fullWidth>
            <Select
                value={secilenSoz}
                onChange={handleChange}
            >
                {sozler.map((soz) => (
                    <MenuItem key={soz.id} value={soz.textone}>
                        {soz.textone} - {soz.texttwo}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </div>
    <div className="header_center  eyyub">
        <Link style={{textDecoration:"none",color:'black'}} to="" >
            <Paragrafy className='quiz_center' fontsize='24px' fontfamily='DM Serif Display' text='Let’s start quiz' />
        </Link>
    </div>
    <div className="header_right">
        <div className="header_setting">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9M15 17H18.5905C18.973 17 19.1652 17 19.3201 16.9478C19.616 16.848 19.8475 16.6156 19.9473 16.3198C19.9997 16.1643 19.9997 15.9715 19.9997 15.5859C19.9997 15.4172 19.9995 15.3329 19.9863 15.2524C19.9614 15.1004 19.9024 14.9563 19.8126 14.8312C19.7651 14.7651 19.7048 14.7048 19.5858 14.5858L19.1963 14.1963C19.0706 14.0706 19 13.9001 19 13.7224V10C19 6.134 15.866 2.99999 12 3C8.13401 3.00001 5 6.13401 5 10V13.7224C5 13.9002 4.92924 14.0706 4.80357 14.1963L4.41406 14.5858C4.29476 14.7051 4.23504 14.765 4.1875 14.8312C4.09766 14.9564 4.03815 15.1004 4.0132 15.2524C4 15.3329 4 15.4172 4 15.586C4 15.9715 4 16.1642 4.05245 16.3197C4.15225 16.6156 4.3848 16.848 4.68066 16.9478C4.83556 17 5.02701 17 5.40956 17H9" stroke="#8B6DE8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </div>
        <div className="header_rinings">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.6006 21.0758L19.0608 17.9233C19.6437 17.5868 19.9346 17.4185 20.1465 17.1831C20.3341 16.9748 20.4759 16.7295 20.5625 16.4629C20.6602 16.1624 20.6602 15.8265 20.6602 15.1566V8.84243C20.6602 8.17253 20.6602 7.83669 20.5625 7.53614C20.4759 7.26958 20.3341 7.02404 20.1465 6.81575C19.9355 6.58137 19.6453 6.41381 19.0674 6.08018L13.5996 2.92334C13.0167 2.58681 12.7259 2.41889 12.416 2.35303C12.1419 2.29476 11.8584 2.29476 11.5843 2.35303C11.2744 2.41889 10.9826 2.58681 10.3997 2.92334L4.93843 6.07641C4.35623 6.41255 4.06535 6.58048 3.85352 6.81575C3.66597 7.02404 3.52434 7.26958 3.43773 7.53614C3.33984 7.8374 3.33984 8.17411 3.33984 8.84717V15.1521C3.33984 15.8252 3.33984 16.1617 3.43773 16.4629C3.52434 16.7295 3.66597 16.9748 3.85352 17.1831C4.06548 17.4185 4.35657 17.5868 4.93945 17.9233L10.3997 21.0758C10.9826 21.4123 11.2744 21.5804 11.5843 21.6462C11.8584 21.7045 12.1419 21.7045 12.416 21.6462C12.7259 21.5803 13.0177 21.4123 13.6006 21.0758Z" stroke="#8B6DE8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M9 11.9995C9 13.6564 10.3431 14.9995 12 14.9995C13.6569 14.9995 15 13.6564 15 11.9995C15 10.3427 13.6569 8.99952 12 8.99952C10.3431 8.99952 9 10.3427 9 11.9995Z" stroke="#8B6DE8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>


        </div>
        <div className="header_words">
            <Paragrafy className='words_count' text='+' />
            <Paragrafy fontWeight="600" fontsize='16px' fontfamily='DM Sans' text=' New Words' />
        </div>
    </div>

</div>
  )
}

export default Header
