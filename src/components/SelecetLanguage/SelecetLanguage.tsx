import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { getInitialLanguage, languageswap } from '../../store/actions/languagehome/languagehome';
import { setSelectedLanguage } from '../../store/slice/LanguageHomeSlice';
import "./SelecetLanguage.scss";

const SelectLanguage = () => {
    const dispatch = useAppDispatch();
    const { texts, selectedLanguageId, defaultText, datasetselected } = useAppSelector((state) => state.LanguagetextData);

    useEffect(() => {
        dispatch(getInitialLanguage());
    }, []);

    useEffect(() => {
        const storedLanguageId = localStorage.getItem('selectedLanguageId');
        if (storedLanguageId) {
            dispatch(setSelectedLanguage(parseInt(storedLanguageId)));
        } else if (texts.length > 0 && selectedLanguageId === null) {
            dispatch(setSelectedLanguage(texts[0].id));
        }
    }, [texts, dispatch]);


    return (
        <div onClick={() => {
            dispatch(languageswap(Number((defaultText?.id))))
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