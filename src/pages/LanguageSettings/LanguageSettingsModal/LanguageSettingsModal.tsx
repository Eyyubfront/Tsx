import {
    DialogContent,
    DialogActions,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from '@mui/material';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { createUserLanguage, fetchLanguages } from '../../../store/actions/languageActions/languageActions';
import "./LanguageSettingsModal.scss"
import { LanguageToogleClose } from '../../../store/slice/languageSlice';
import AlertDialog from '../../../components/AlertDialog/AlertDialog';
interface NewWordModalProps {
    onClose: () => void;
}

const LanguageSettingsModal: React.FC<NewWordModalProps> = () => {
    const dispatch = useAppDispatch();
    const [sourceLanguage, setSourceLanguage] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('');
    const { languages, languagetooglOpen } = useAppSelector((state) => state.language);

    useEffect(() => {
        dispatch(fetchLanguages());
    }, [dispatch]);

    const handleSave = () => {
        const newItem = {
            sourceLanguageId: Number(sourceLanguage),
            translationLanguageId: Number(targetLanguage),
        };
        dispatch(createUserLanguage(newItem));
        handleCloseModal()
    };

    const handleCloseModal = () => {
        dispatch(LanguageToogleClose());
    };

    return (
        <>

        
            <AlertDialog
                open={languagetooglOpen}
                onClose={handleCloseModal}
                title="New Language"
                className='languagesettings_modal'
            >
                <DialogContent sx={{ display:"flex",flexDirection:"column",width:"100%" }}>
                    <FormControl fullWidth variant="outlined" style={{ marginTop: '15px' }}>
                        <InputLabel id="source-language-label">Native</InputLabel>
                        <Select
                            labelId="source-language-label"
                            value={sourceLanguage}
                            onChange={(e) => setSourceLanguage(e.target.value)}
                            label=""
                        >
                            {languages?.map((language) => (
                                <MenuItem key={language.id} value={language.id}>
                                    <div className='languageselecet_settingscard'>
                                        <img
                                            src={`data:image/png;base64,${language.image}`}
                                            alt={`${language.name} flag`}
                                            className="language-flag"
                                        />
                                        {language.name}
                                    </div>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth variant="outlined" style={{ marginTop: '15px' }}>
                        <InputLabel id="target-language-label">Native</InputLabel>
                        <Select
                            labelId="target-language-label"
                            value={targetLanguage}
                            onChange={(e) => setTargetLanguage(e.target.value)}
                            label="Target Language"
                        >

                            {languages?.map((language) => (
                                <MenuItem key={language.id} value={language.id}>
                                    <div className='languageselecet_settingscard'>
                                        <img
                                            src={`data:image/png;base64,${language.image}`}
                                            alt={`${language.name} flag`}
                                            className="language-flag"
                                        />

                                        {language.name}
                                    </div>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <PrimaryButton
                        label='Save Word'
                        onClick={handleSave}
                        disabled={!sourceLanguage || !targetLanguage}
                    />
                </DialogActions>
            </AlertDialog>
        </>
    );
};

export default LanguageSettingsModal;
