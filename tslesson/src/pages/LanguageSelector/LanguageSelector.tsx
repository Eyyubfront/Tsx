import React, { useEffect } from "react";
import LearnLayout from "../../layout/LearnLayout/LearnLayout";
import { useAppSelector, useAppDispatch } from "../../store/index";
import "./LanguageSelector.scss";
import { fetchLanguages } from "../../store/actions/languageActions/languageActions";
import { selectLanguage } from "../../store/slice/languageSlice";
import { useNavigate } from "react-router-dom";

const LanguageSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const languages = useAppSelector((state) => state.language.languages);
  const selectedLanguage = useAppSelector(
    (state) => state.language.selectedLanguage
  );
  const loading = useAppSelector((state) => state.language.loading);
  const error = useAppSelector((state) => state.language.error);

  useEffect(() => {
    if (languages.length === 0) {
      dispatch(fetchLanguages())
        .unwrap()
        .catch((err) => console.error("Fetch error:", err));
    }
  }, [dispatch, languages]);

  const handleLanguageClick = (language: any) => {
    dispatch(selectLanguage(language));
  };

  const handleContinueClick = () => {
    if (selectedLanguage) {
      navigate("/chooselearnlanguage");
    }
  };

  return (
    <LearnLayout
      titleText="Choose native language"
      descriptionText="Select your native language to personalize your learning experience easily."
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
            {languages.length > 0 ? (
              languages.map((language) => (
                <li
                  key={language.id}
                  className={`language-item ${
                    selectedLanguage?.id === language.id ? "selected" : ""
                  }`}
                  onClick={() => handleLanguageClick(language)}
                >
                  <p>{language.flag}</p>
                  <p>{language.name}</p>
                </li>
              ))
            ) : (
              !loading && !error && (
                <p className="no-languages-message">
                  No languages available at the moment.
                </p>
              )
            )}
          </ul>
        </div>
        <div className="check-lang">
          <button
            className="continue-button"
            disabled={!selectedLanguage}
            onClick={handleContinueClick}
          >
            Continue
          </button>
        </div>
      </div>
    </LearnLayout>
  );
};

export default LanguageSelector;
