import { Close } from '@mui/icons-material';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
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
interface NewWordModalProps {
    show: boolean;
    onClose: () => void;
}

const LanguageSettingsModal: React.FC<NewWordModalProps> = ({ show, onClose }) => {
    const dispatch = useAppDispatch();
    const [sourceLanguage, setSourceLanguage] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('');
    const languages = useAppSelector((state) => state.language.languages);

    useEffect(() => {
        dispatch(fetchLanguages());
    }, [dispatch]);

    const handleSave = () => {
        const newItem = {
            sourceLanguageId: Number(sourceLanguage),
            translationLanguageId: Number(targetLanguage),
        };
        dispatch(createUserLanguage(newItem));
        onClose();
    };

    return (
        <Dialog className='dialoq' open={show} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle className='dialoqtitte_tops'>
                <span className='tittledialoq'>New Language</span>
                <IconButton className='iconbutton' onClick={onClose}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <FormControl fullWidth variant="outlined" style={{ marginTop: '15px' }} >

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
        </Dialog>
    );
}

export default LanguageSettingsModal;