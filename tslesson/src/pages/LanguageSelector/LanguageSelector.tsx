import React, { useEffect } from "react";
import LearnLayout from "../../layout/LearnLayout/LearnLayout";
import { useAppSelector, useAppDispatch } from "../../store/index";
import "./LanguageSelector.scss";
import { fetchLanguages } from "../../store/actions/languageActions/languageActions";
import { selectLanguage } from "../../store/slice/languageSlice";

const LanguageSelector: React.FC = () => {
  const dispatch = useAppDispatch();

  // Redux-dan dilləri və vəziyyətləri götür
  const languages = useAppSelector((state) => state.language.languages);
  const selectedLanguage = useAppSelector(
    (state) => state.language.selectedLanguage
  );
  const loading = useAppSelector((state) => state.language.loading);
  const error = useAppSelector((state) => state.language.error);

  // Dilləri yükləmək üçün useEffect
  useEffect(() => {
    dispatch(fetchLanguages())
      .unwrap()
      .then((data) => console.log("Fetched languages:", data))
      .catch((err) => console.error("Fetch error:", err));
  }, [dispatch]);

  console.log("Selected Language:", selectedLanguage);

  const handleLanguageClick = (language: any) => {
    dispatch(selectLanguage(language));
  };

  return (
    <LearnLayout
      TitleText="Choose native language"
      DescriptionText="Select your native language to personalize your learning experience easily."
    >
      <div className="lang-div">
        <div className="lang-content">
          {/* Yükləmə və Xəta Mesajları */}
          {loading && <p>Loading languages...</p>}
          {error && <p className="error-message">{error}</p>}

          {/* Dillərin siyahısı */}
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
                <p className="no-languages-message">No languages available.</p>
              )
            )}
          </ul>
        </div>
        <div className="check-lang">
          <button className="continue-button" disabled={!selectedLanguage}>
            Continue
          </button>
        </div>
      </div>
    </LearnLayout>
  );
};

export default LanguageSelector;
