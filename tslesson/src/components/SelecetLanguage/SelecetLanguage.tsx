import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { FormControl, MenuItem, Select, SelectChangeEvent, Skeleton } from '@mui/material';
import { getTexts, selecetlangaugesave } from '../../store/actions/languagehome/languagehome'; 
import { setSelectedLanguage } from '../../store/slice/LanguageHomeSlice';
import { LanguageHomes } from '../../types/Types';
import "./SelecetLanguage.scss";

const SelectLanguage = () => {
    const dispatch = useAppDispatch();
    const { texts, selectedLanguageId ,loading} = useAppSelector((state) => state.LanguagetextData);  
   console.log(texts);
   console.log(selectedLanguageId);

   
    useEffect(() => {
        dispatch(getTexts());
    }, [dispatch]);
    useEffect(() => {
        const storedLanguageId = localStorage.getItem('selectedLanguageId');
        if (storedLanguageId) {
            dispatch(setSelectedLanguage(parseInt(storedLanguageId)));
        } else if (texts.length > 0 && selectedLanguageId === null) {
            dispatch(setSelectedLanguage(texts[0].id));
        }
    }, [texts, selectedLanguageId, dispatch]);

    const handleLanguageChange = (event: SelectChangeEvent<number>) => {
        const value = event.target.value as number;
        dispatch(setSelectedLanguage(value));
        dispatch(selecetlangaugesave(value)); 
        localStorage.setItem('selectedLanguageId', value.toString());
    };

    

    return (
     <div>
           {
            loading ?  <Skeleton  style={{height:"70px",width:"250px"}}  /> :    <FormControl className='selecetlanguages' fullWidth>
            <Select
                className='formselecet'
                value={selectedLanguageId || (texts.length > 0 ? texts[0]?.id : '')} 
                onChange={handleLanguageChange}
            >
                {texts?.map((language: LanguageHomes) => (
                    <MenuItem key={language.id} value={language.id}>
                        {language.sourceLanguage} - {language.translationLanguage}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        }
     </div>
     
    );
};

export default SelectLanguage;