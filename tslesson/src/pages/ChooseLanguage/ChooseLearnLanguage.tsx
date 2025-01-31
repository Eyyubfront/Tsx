import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/index";
import "../LanguageSelector/LanguageSelector.scss";
import { createUserLanguage, fetchLanguages } from "../../store/actions/languageActions/languageActions";
import { useNavigate } from "react-router-dom";
import "./ChooseLearnLanguage.scss"
import SidePanel from "../../layout/SidePanel/SidePanel";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import BackButton from "../../components/BackButton/BackButton";
const ChooseLearnLanguage: React.FC = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [togleselectedId, setToogleSelectedId] = useState<number>(0);
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
    setToogleSelectedId(language.id);
  };


  const handleContinueClick = () => {
    if (userId) {

      if (selectedSourceLanguage === selectedTranslationLanguage) {
        alert("Source and translation language cannot be the same.");
        return;
      }
      dispatch(
        createUserLanguage({
          sourceLanguageId: Number(selectedSourceLanguage),
          translationLanguageId: Number(selectedTranslationLanguage),
        })
      )
        .unwrap()
        .catch((err) => {
          console.error("Language seleceted problems", err);
        });
    }
  };



  return (
    <div className="chooselanguage_selector">
      <div className="chooselanguageselector__left">
        <SidePanel
          titleText="Choose the Language to Learn"
          descriptionText="Select your native language to personalize your learning experience easily."
        />
        <BackButton onClick={() => navigate("/login")} />
      </div>
      <div className="chooselanguageselector__right">
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
                    className={`language-item ${togleselectedId === language.id ? "selected" : ""
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
            <PrimaryButton
              onClick={handleContinueClick}
              label="Continue"
              disabled={togleselectedId === 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseLearnLanguage;
