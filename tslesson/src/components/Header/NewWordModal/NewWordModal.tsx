import React, { useEffect, useState } from 'react';
import Savedicon from "../../../assets/images/home/Bookmark.svg";
import NotSavedicon from "../../../assets/images/home/nosaved.svg";
import { Link } from 'react-router-dom';
import PrimaryButton from '../../PrimaryButton/PrimaryButton';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import "./NewWordModal.scss";
import { saveText } from '../../../store/actions/learingActions/learingnowActions';
import { useAppDispatch } from '../../../store';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/index';
import Paragrafy from '../../Paragrafy/Paragrafy';

interface NewWordModalProps {
    show: boolean;
    onClose: () => void;
}

const NewWordModal: React.FC<NewWordModalProps> = ({ show, onClose }) => {
    const [wordone, setWordOne] = useState('');
    const [wordtwo, setWordTwo] = useState('');
    const [isSaved, setIsSaved] = useState(false); 

    const selectedLanguageId = useSelector((state: RootState) => state.LanguagetextData.selectedLanguageId);
    const texts = useSelector((state: RootState) => state.LanguagetextData.texts);
    const userId = useSelector((state: RootState) => state.Auth.userId);
    const dispatch = useAppDispatch();
    const selectedLanguage = texts.find((text) => text.id === selectedLanguageId);
    
    const defaultSourceLanguage = selectedLanguage?.sourceLanguage || '';
    const defaultTranslationLanguage = selectedLanguage?.translationLanguage || '';

    useEffect(() => {
        if (selectedLanguage) {
            setWordOne('');
            setWordTwo('');
            
        }
    }, [selectedLanguage, show]);

    const handleSave = () => {
        if (userId) {
            const newItem = {
                source: wordone,
                translation: wordtwo,
                isLearningNow: isSaved
            };
            dispatch(saveText(newItem));
        } else {
            console.error("userId not available.");
        }
    };

    const handleSavedIconClick = () => {
        setIsSaved(prevState => !prevState); 
    };

    return (
        <Dialog className='dialoq' open={show} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle className='dialoqtitte_tops'>
                <span className='tittledialoq'>New Word</span>
                <IconButton className='iconbutton' onClick={onClose}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <div className="text__input">
                    <label className='input_label'>{defaultSourceLanguage || "Source Language"}</label>
                    <input
                        type="text"
                        className='input_language'
                        value={wordone}
                        onChange={(e) => setWordOne(e.target.value)}
                        placeholder="" 
                    />
                    <label className='input_labeltwo'>{defaultTranslationLanguage || "Translation Language"}</label>
                    <input
                        type="text"
                        className='input_language'
                        value={wordtwo}
                        onChange={(e) => setWordTwo(e.target.value)}
                        placeholder="" 
                    />
                </div>
                <div className="text_saved">
                    <Link to="/">
                        <Paragrafy text='Add to Learning now ' />
                    </Link>
                    <div>
                        <img 
                            src={isSaved ? Savedicon : NotSavedicon} 
                            alt=""
                            onClick={handleSavedIconClick}
                        />
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <PrimaryButton
                    label='Save Word'
                    onClick={handleSave}
                    disabled={!wordone || !wordtwo}
                />
            </DialogActions>
        </Dialog>
    );
};

export default NewWordModal;