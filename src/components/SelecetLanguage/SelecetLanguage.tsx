import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { getInitialLanguage, languageswap, selecetlangaugesave } from '../../store/actions/languagehome/languagehome';

import "./SelecetLanguage.scss";

const SelectLanguage = () => {
    const dispatch = useAppDispatch();
    const {  selectedLanguageId, defaultText, datasetselected } = useAppSelector((state) => state.LanguagetextData);


    useEffect(() => {
        dispatch(getInitialLanguage());
    }, []);

    useEffect(() => {
        const selectedLanguageId = localStorage.getItem('selectedLanguageId');
        if (selectedLanguageId) {

            dispatch(selecetlangaugesave(Number(selectedLanguageId)));
            dispatch(getInitialLanguage());
        }
    }, [selectedLanguageId]);

    return (
        <div onClick={() => {
            dispatch(languageswap(Number((defaultText?.id))));
        }} className='selecetlanguages'>
            <div className='selecets_box'>
                <p className='ee'> {defaultText?.isSwapped
                    ? `${datasetselected.translationLanguage} - ${datasetselected.sourceLanguage} `
                    : `${datasetselected.sourceLanguage} - ${datasetselected.translationLanguage}`}</p>
            </div>
        </div>
    );
};

export default SelectLanguage;
