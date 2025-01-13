import  { useState } from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';
interface Soz {
    id: number;
    textone: string;
    texttwo: string;
}

const sozler: Soz[] = [
    { id: 1, textone: 'English', texttwo: 'Spanish' },

];
const SelecetLanguage = () => {
        const [secilenSoz, setSecilenSoz] = useState<string>('');
        
            const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
                setSecilenSoz(event.target.value);
            };
  return (
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
  )
}

export default SelecetLanguage
