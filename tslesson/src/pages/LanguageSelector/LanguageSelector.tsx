import React from "react";
import LearnLayout from "../../layout/LearnLayout/LearnLayout";
import { useAppSelector } from "../../store/index";
import LanguageItem from "./LanguageItem";
import "./LanguageSelector.scss";

const LanguageSelector: React.FC = () => {
  const languages = useAppSelector((state) => state.language.languages);
  const selectedLanguage = useAppSelector(
    (state) => state.language.selectedLanguage
  );

  return (
    <LearnLayout
      TitleText="Choose native language"
      DescriptionText="Select your native language to personalize your learning experience easily."
    >
      <div className="lang-div">
        <div className="lang-content">
          <ul className="language-list">
            {languages.length > 0 ? (
              languages.map((language) => (
                <li
                  key={language.id}
                  className={`language-item ${
                    selectedLanguage?.id === language.id ? "selected" : ""
                  }`}
                >
                  <LanguageItem language={language} />
                </li>
              ))
            ) : (
              <p className="selected-language">No languages available.</p>
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
