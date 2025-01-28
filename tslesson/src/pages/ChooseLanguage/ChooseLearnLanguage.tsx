import React, { useEffect } from "react";
import LearnLayout from "../../layout/LearnLayout/LearnLayout";
import { useAppSelector, useAppDispatch } from "../../store/index";
import "../LanguageSelector/LanguageSelector.scss";
import { fetchLanguages } from "../../store/actions/languageActions/languageActions";
import { selectLanguage } from "../../store/slice/languageSlice";
import { useNavigate } from "react-router-dom";

const ChooseLearnLanguage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const languages = useAppSelector((state) => state.language.languages);
  const selectedLanguage = useAppSelector(
    (state) => state.language.selectedLanguage
  );
  const loading = useAppSelector((state) => state.language.loading);
  const error = useAppSelector((state) => state.language.error);

  useEffect(() => {
    if (!selectedLanguage) {
      navigate("/languageselector");
    } else if (languages.length === 0) {
      dispatch(fetchLanguages())
        .unwrap()
        .catch((err) => console.error("Fetch error:", err));
    }
  }, [dispatch, languages, selectedLanguage, navigate]);

  const handleLanguageClick = (language: any) => {
    dispatch(selectLanguage(language));
  };

  const handleContinueClick = () => {
    if (selectedLanguage) {
      navigate("/learntime");
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
                      selectedLanguage?.id === language.id ? "selected" : ""
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

export default ChooseLearnLanguage;
