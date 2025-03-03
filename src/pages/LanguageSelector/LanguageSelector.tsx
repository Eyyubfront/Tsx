import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/index";
import { fetchLanguages } from "../../store/actions/languageActions/languageActions";
import { useNavigate } from "react-router-dom";
import "./LanguageSelector.scss";
import SidePanel from "../../layout/SidePanel/SidePanel";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import BackButton from "../../components/BackButton/BackButton";
import { setSourceLanguageId } from "../../store/slice/languageSlice";

const LanguageSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState<number>(0);
  const languages = useAppSelector((state) => state.language.languages);
  const loading = useAppSelector((state) => state.language.loading);
  const error = useAppSelector((state) => state.language.error);
  const isConfirmed = useAppSelector((state) => state.Auth.veriyuse);

  useEffect(() => {
    if (!isConfirmed) {
      navigate("/verifyemailpage");
    }
  }, [isConfirmed]);

  useEffect(() => {
    if (languages.length === 0) {
      dispatch(fetchLanguages())
        .unwrap()
        .catch((err) => console.error("Fetch error:", err));
    }
  }, [dispatch, languages]);

  const handleLanguageClick = (id: number) => {
    setSelectedLanguage(id);
    dispatch(setSourceLanguageId(id));
  };

  const handleContinueClick = () => {
    if (selectedLanguage !== 0) {
      navigate("/chooselearnlanguage");
    } else {
      console.warn("No language selected.");
    }
  };

  return (
    <div className="language_selector">
      <div className="languageselector__left">
        <SidePanel
          titleText="Choose native language"
          descriptionText="Select your native language to personalize your learning experience easily."
        />
        <BackButton className="back_languageselect" onClick={() => navigate("/login")} />
      </div>
      <div className="languageselector__right">
        <div className="lang-div">
          <div className="lang-content">
            {loading && <p>Loading languages...</p>}
            {error && (
              <p className="error-message">
                Failed to load languages. Please try again later.
              </p>
            )}

            <div className="language-list">
              {languages?.map((language) => (
                <div
                  key={language.id}
                  className={`language-item ${selectedLanguage === language.id ? "selected" : ""}`}
                  onClick={() => handleLanguageClick(language.id)}
                >
                  <img
                    src={`data:image/png;base64,${language.image}`}
                    alt={`${language.name} flag`}
                    className="language-flag"
                  />
                  <span>{language.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="check-lang">
            <PrimaryButton
              onClick={handleContinueClick}
              label="Continue"
              disabled={selectedLanguage === 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;