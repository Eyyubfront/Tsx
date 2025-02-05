import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { getTexts } from '../../store/actions/languagehome/languagehome';
import { setSelectedLanguage } from '../../store/slice/LanguageHomeSlice';
import { LanguageHomes } from '../../types/Types';
import "./SelecetLanguage.scss"

const SelectLanguage = () => {
    const dispatch = useAppDispatch();
    const { texts, selectedLanguageId } = useAppSelector((state) => state.LanguagetextData);

    useEffect(() => {
        dispatch(getTexts());
    }, [dispatch]);

    useEffect(() => {
        if (texts.length > 0 && selectedLanguageId === null) {
            const defaultLanguage = texts.find((text) => text.isDefault);
            if (defaultLanguage) {
                dispatch(setSelectedLanguage(defaultLanguage.id));
            }
        }
    }, [texts, selectedLanguageId, dispatch]);

    const handleLanguageChange = (event: SelectChangeEvent<number>) => {
        const value = event.target.value as number;
        dispatch(setSelectedLanguage(value));
    };

   
    return (
        <FormControl className='selecetlanguages' fullWidth>
            <Select
             className='formselecet'
                value={selectedLanguageId ?? ''}
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