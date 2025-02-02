import { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { getTexts } from '../../store/actions/languagehome/languagehome';
import { setSelectedLanguage } from '../../store/slice/LanguageHomeSlice';

const SelectLanguage = () => {
    const dispatch = useAppDispatch();
    const { texts, loading, error, selectedLanguageId } = useAppSelector((state) => state.LanguagetextData);
    const userId = useAppSelector((state: RootState) => state.Auth.userId);
    const languages = useAppSelector((state) => state.language.languages);
    const selectedSourceLanguage = useAppSelector((state) => state.language.selectedSourceLanguageId);
    const { language } = useAppSelector((state) => state.language);
    const selectedTranslationLanguage = useAppSelector((state) => state.language.selectedTranslationId);

    useEffect(() => {
        if (userId) {
            dispatch(getTexts(userId));
        }
    }, [dispatch, userId]);

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <FormControl className='selects' fullWidth>
            <Select
                value={selectedLanguageId ?? ''}
                onChange={handleLanguageChange}
            >
                {languages?.map((language) => (
                    <MenuItem key={language.id} value={language.id}>
                        {language.selectedSourceLanguage} - {language.selectedTranslationLanguage}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectLanguage;