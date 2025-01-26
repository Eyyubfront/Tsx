import { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { FormControl, MenuItem, Select } from '@mui/material';
import { getTexts } from '../../store/actions/languagehome/languagehome';
import { setSelectedLanguage } from '../../store/slice/LanguageHomeSlice';

const SelectLanguage = () => {
    const dispatch = useAppDispatch();
    const { texts, defaultText, loading, error, selectedLanguageId } = useAppSelector((state) => state.LanguagetextData);

    const userId = useAppSelector((state: RootState) => state.Auth.userId);

    // Veriler yüklendikten sonra default dili seçme
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

    const handleLanguageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
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
                {texts?.map((text) => (
                    <MenuItem key={text.id} value={text.id}>
                        {text.sourceLanguage} - {text.translationLanguage}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectLanguage;
