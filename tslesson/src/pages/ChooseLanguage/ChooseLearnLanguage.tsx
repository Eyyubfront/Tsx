import React, { useEffect } from "react";
import LearnLayout from "../../layout/LearnLayout/LearnLayout";
import { useAppSelector, useAppDispatch } from "../../store/index";
import "../LanguageSelector/LanguageSelector.scss";
import { createUserLanguage, fetchLanguages } from "../../store/actions/languageActions/languageActions";
import {setTranslationLanguageId } from "../../store/slice/languageSlice";
import { useNavigate } from "react-router-dom";


const ChooseLearnLanguage: React.FC = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const languages = useAppSelector((state) => state.language.languages);
  const { userId } = useAppSelector((state) => state.Auth);

  const selectedSourceLanguage = useAppSelector((state) => state.language.selectedSourceLanguageId);
  const selectedTranslationLanguage = useAppSelector((state) => state.language.selectedTranslationId);

  const loading = useAppSelector((state) => state.language.loading);
  const error = useAppSelector((state) => state.language.error);
  const userLanguageCreated = useAppSelector((state) => state.language.userLanguageCreated);
  const isConfirmed = useAppSelector((state) => state.Auth.veriyuse); 

  useEffect(() => {
    if (!isConfirmed) {
      navigate("/verifyemailpage"); 
    }
  }, [isConfirmed, navigate]);

  useEffect(() => {
    if (!selectedSourceLanguage) {
      navigate("/languageselector");
    } else if (languages.length === 0) {
      dispatch(fetchLanguages())
        .unwrap()
        .catch((err) => console.error("Fetch error:", err));
    }
  }, [dispatch, languages, selectedSourceLanguage, navigate]);

  useEffect(() => {
    if (userLanguageCreated) {
      navigate("/learntime");
    }
  }, [userLanguageCreated, navigate]);

  const handleLanguageClick = (language: any) => {
    dispatch(setTranslationLanguageId(Number(language.id)));
   
  };
  

  const handleContinueClick = () => {
    if ( userId) {

      if (selectedSourceLanguage === selectedTranslationLanguage) {
        alert("Source and translation language cannot be the same.");
        return; 
      }

      
     
      dispatch(
        createUserLanguage({
          userId: userId,
          sourceLanguageId: Number(selectedSourceLanguage),  
          translationLanguageId: Number(selectedTranslationLanguage),  
        })
      )
        .unwrap()
        .catch((err) => {
          console.error("Dil kaydedilirken hata oluştu:", err);
        });
    }
  };

  

  return (
    <LearnLayout
      titleText="Choose the language you want to learn"
      descriptionText="Select the language you want to learn to customize your learning experience."
    >
      <div className="lang-div">
        <div className="lang-content">
          {loading && <p>Loading languages...</p>}
          {error && (
            <p className="error-message">
              Failed to load languages. Please try again later.
            </p>
          )}

          <ul className="language-list">
            {languages.length > 0
              ? languages.map((language) => (
                  <li
                    key={language.id}
                    className={`language-item ${
                      Number(selectedTranslationLanguage )=== Number(language.id) ? "selected" : ""
                    }`}
                    onClick={() => handleLanguageClick(language)}
                  >
                    <img
                      src={`data:image/png;base64,${language.image}`}
                      alt={`${language.name} flag`}
                      className="language-flag"
                    />
                    <p>{language.name}</p>
                  </li>
                ))
              : !loading &&
                !error && (
                  <p className="no-languages-message">
                    No languages available at the moment.
                  </p>
                )}
          </ul>
        </div>
        <div className="check-lang">
          <button
            className="continue-button"
            disabled={typeof selectedTranslationLanguage!=="number"}
            onClick={handleContinueClick}
          >
            Continue
          </button>
        </div>
      </div>
    </LearnLayout>
  );
};

export default ChooseLearnLanguage;
