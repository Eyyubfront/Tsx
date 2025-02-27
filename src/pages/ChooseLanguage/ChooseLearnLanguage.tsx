import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/index";
import { createUserLanguage, fetchLanguages } from "../../store/actions/languageActions/languageActions";
import { useNavigate } from "react-router-dom";
import "./ChooseLearnLanguage.scss";
import SidePanel from "../../layout/SidePanel/SidePanel";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import BackButton from "../../components/BackButton/BackButton";
import { setTranslationLanguageId } from "../../store/slice/languageSlice";
import AlertDialog from "../../components/AlertDialog/AlertDialog";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

const ChooseLearnLanguage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedTranslationId, setSelectedTranslationId] = useState<number>(0);
  const languages = useAppSelector((state) => state.language.languages);
  const selectedSourceLanguageId = useAppSelector((state) => state.language.selectedSourceLanguageId);
  const userId = useAppSelector((state) => state.Auth.userId);
  const loading = useAppSelector((state) => state.language.loading);
  const error = useAppSelector((state) => state.language.error);
  const userLanguageCreated = useAppSelector((state) => state.language.userLanguageCreated);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (languages.length === 0) {
      dispatch(fetchLanguages())
        .unwrap()
        .catch((err) => console.error("Fetch error:", err));
    }
  }, [dispatch, languages]);

  useEffect(() => {
    if (userLanguageCreated) {
      navigate("/learntime");
    }
  }, [userLanguageCreated, navigate]);

  const handleTranslationLanguageChange = (event: SelectChangeEvent<number>) => {
    const languageId = event.target.value as number;
    if (languageId === selectedSourceLanguageId) {
      setModalMessage("Source language and translation language cannot be the same.");
      setIsModalOpen(true);
      return;
    }
    setSelectedTranslationId(languageId);
    dispatch(setTranslationLanguageId(languageId));
  };

  const handleContinueClick = () => {
    if (userId && selectedTranslationId !== 0) {
      dispatch(createUserLanguage({
        sourceLanguageId: selectedSourceLanguageId!,
        translationLanguageId: selectedTranslationId,
      }))
        .unwrap()
        .then(() => {
          navigate("/learntime");
        })
        .catch((err) => {
          console.error("Error creating user language", err);
        });
    } else {
      console.warn("No translation language selected or user not logged in");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="chooselanguage_selector">
      <div className="chooselanguageselector__left">
        <SidePanel
          titleText="Choose the Language to Learn"
          descriptionText="Select your target language to continue learning."
        />
        <BackButton className="chooselanguge_back" onClick={() => navigate("/login")} />
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

            <FormControl fullWidth variant="outlined" style={{ marginTop: "15px" }}>
              <InputLabel id="translation-language-label"> Translation Language</InputLabel>
              <Select
                labelId="translation-language-label"
                value={selectedTranslationId}
                onChange={handleTranslationLanguageChange}
                label="Translation Language"
              >
                {languages.length > 0 ? (
                  languages.map((language) => (
                    <MenuItem key={language.id} value={language.id}>
                      <div className="languageselect_settingscard">
                        <img
                          src={`data:image/png;base64,${language.image}  `}
                          alt={`${language.name} flag`}
                          className="language-flag"
                        />
                        {language.name}
                      </div>
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No languages available</MenuItem>
                )}
              </Select>
            </FormControl>
          </div>

          <div className="check-lang">
            <PrimaryButton
              onClick={handleContinueClick}
              label="Continue"
              disabled={selectedTranslationId === 0}
            />
          </div>
        </div>
      </div>

      <AlertDialog
        open={isModalOpen}
        onClose={handleCloseModal}
        error={modalMessage}
        title="Pay attention"
      />
    </div>
  );
};

export default ChooseLearnLanguage;