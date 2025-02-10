import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { getTexts, selecetlangaugesave } from '../../store/actions/languagehome/languagehome'; 
import { setSelectedLanguage } from '../../store/slice/LanguageHomeSlice';
import { LanguageHomes } from '../../types/Types';
import "./SelecetLanguage.scss";

const SelectLanguage = () => {
    const dispatch = useAppDispatch();
    const { texts, selectedLanguageId } = useAppSelector((state) => state.LanguagetextData);  
    useEffect(() => {
        dispatch(getTexts());
    }, [dispatch]);

    useEffect(() => {
        if (texts.length > 0 && selectedLanguageId === null) {
            dispatch(setSelectedLanguage(texts[0].id));
        }
    }, [texts, selectedLanguageId, dispatch]);

    const handleLanguageChange = (event: SelectChangeEvent<number>) => {
        const value = event.target.value as number;
        dispatch(setSelectedLanguage(value));
        dispatch(selecetlangaugesave(value)); 
    };

    return (
        <FormControl className='selecetlanguages' fullWidth>
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
    );
};

export default SelectLanguage;