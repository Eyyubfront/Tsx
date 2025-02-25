import React, {
  useEffect,
  useState,
} from "react";
import {
  useAppSelector,
  useAppDispatch,
} from "../../store/index";
import {
  createUserLanguage,
  fetchLanguages,
} from "../../store/actions/languageActions/languageActions";
import {
  useNavigate,
} from "react-router-dom";
import "./ChooseLearnLanguage.scss";
import SidePanel from "../../layout/SidePanel/SidePanel";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import BackButton from "../../components/BackButton/BackButton";
import {
  setTranslationLanguageId,
} from "../../store/slice/languageSlice";
import {
  Language,
} from "../../types/Types";
import AlertDialog from "../../components/AlertDialog/AlertDialog";
const ChooseLearnLanguage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedTranslationId, setSelectedTranslationId] =
    useState<number>(0);
  const languages = useAppSelector((state) => state.language.languages);
  const selectedSourceLanguageId = useAppSelector(
    (state) => state.language.selectedSourceLanguageId
  );
  const userId = useAppSelector((state) => state.Auth.userId);
  const loading = useAppSelector((state) => state.language.loading);
  const error = useAppSelector((state) => state.language.error);
  const userLanguageCreated = useAppSelector(
    (state) => state.language.userLanguageCreated
  );
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


  const handleTranslationLanguageClick = (language: Language) => {
    if (language.id === selectedSourceLanguageId) {
      setModalMessage("Source language and translation language cannot be the same.");
      setIsModalOpen(true);
      return;
    }
    setSelectedTranslationId(language.id);
    dispatch(setTranslationLanguageId(language.id));
  };

  const handleContinueClick = () => {
    if (userId && selectedTranslationId !== 0) {
      dispatch(
        createUserLanguage({
          sourceLanguageId: selectedSourceLanguageId!,
          translationLanguageId: selectedTranslationId,
        })
      )
        .unwrap()
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
        <BackButton
          className="chooselanguge_back"
          onClick={() => navigate("/login")}
        />
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
                    className={`language-item ${selectedTranslationId === language.id
                      ? "selected"
                      : ""
                      }`}
                    onClick={() => handleTranslationLanguageClick(language)}
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