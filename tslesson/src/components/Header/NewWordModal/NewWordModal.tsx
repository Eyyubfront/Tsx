import React, { useEffect, useState } from 'react';
import Savedicon from "../../../assets/images/home/Bookmark.svg";
import NotSavedicon from "../../../assets/images/home/nosaved.svg";
import { Link } from 'react-router-dom';
import PrimaryButton from '../../PrimaryButton/PrimaryButton';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import "./NewWordModal.scss";
import { learingnowsaveText } from '../../../store/actions/learingActions/learingnowActions';
import { useAppDispatch, useAppSelector } from '../../../store';
import Paragrafy from '../../Paragrafy/Paragrafy';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import UseFormModalInput from '../../PrimaryInput/UseFormModalInput';

interface NewWordModalProps {
    show: boolean;
    onClose: () => void;
}

const schema = Yup.object().shape({
    wordone: Yup.string().required("Source word is required"),
    wordtwo: Yup.string().required("Translation word is required"),
});

const NewWordModal: React.FC<NewWordModalProps> = ({ show, onClose }) => {
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const selectedLanguageId = useAppSelector((state) => state.LanguagetextData.selectedLanguageId);
    const texts = useAppSelector((state) => state.LanguagetextData.texts);
    const userId = useAppSelector((state) => state.Auth.userId);
    const dispatch = useAppDispatch();
    const selectedLanguage = texts.find((text) => text.id === selectedLanguageId);

    const defaultSourceLanguage = selectedLanguage?.sourceLanguage || '';
    const defaultTranslationLanguage = selectedLanguage?.translationLanguage || '';
    const error = useAppSelector((state) => state.learningNow.error);
    const methods = useForm({
        defaultValues: {
            wordone: '',
            wordtwo: ''
        },
        resolver: yupResolver(schema),
    });

    const { formState } = methods;

    useEffect(() => {
        if (selectedLanguage) {
            methods.reset({ wordone: '', wordtwo: '' });
        }
    }, [selectedLanguage, show]);

    const handleSave = () => {
        const { wordone, wordtwo } = methods.getValues();
        if (userId) {
            const newItem = {
                id: selectedLanguageId,
                source: wordone,
                translation: wordtwo,
                isLearningNow: isSaved
            };
            dispatch(learingnowsaveText(newItem));
            setIsSaved(false);
        } else {
            console.error("userId not available.");
        }
        onClose();
    };
    const handleSavedIconClick = () => {
        if (!isSaved) {
            setIsSaved(true);
        } else {
            setIsSaved(false);
        }
    };


    return (
        <Dialog className='dialoq' open={show} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle className='dialoqtitte_tops'>
                {error ? "Pay attention" : <span className='tittledialoq'>New Word</span>}
                <IconButton className='iconbutton' onClick={onClose}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {error ? <p>{error}</p> : <FormProvider {...methods}>
                    <form>
                        <div className="text__input">
                            <div className="sourcetop">
                                <label className='modals_labelsource' htmlFor="">{defaultSourceLanguage}</label>
                                <UseFormModalInput className='newwords_input' type='select' name="wordone" label={defaultSourceLanguage || "Source Language"} />
                            </div>
                            <div className="translationbutom">
                                <label className='modals_labeltranslation' htmlFor="">{defaultTranslationLanguage}</label>
                                <UseFormModalInput className='newwords_input' type='select' name="wordtwo" label={defaultTranslationLanguage || "Translation Language"} />
                            </div>
                        </div>
                        <div className="text_saved">
                            <Link to="/">
                                <Paragrafy text='Add to Learning now ' />
                            </Link>
                            <div>
                                <img
                                    src={isSaved ? Savedicon : NotSavedicon}
                                    onClick={handleSavedIconClick}
                                    alt="Save Icon"
                                />
                            </div>
                        </div>
                    </form>
                </FormProvider>}
            </DialogContent>
            {error ? null : <DialogActions>
                <PrimaryButton
                    label='Save Word'
                    onClick={handleSave}
                    disabled={!formState.isValid}
                />
            </DialogActions>}
        </Dialog>
    );
};

export default NewWordModal;