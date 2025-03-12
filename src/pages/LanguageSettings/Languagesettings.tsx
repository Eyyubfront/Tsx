import { useAppDispatch, useAppSelector } from "../../store";
import { LanguageHomes } from "../../types/Types";
import { Button, MenuItem, Skeleton } from "@mui/material";
import "./Languagesettings.scss";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import LanguageSettingsModal from "./LanguageSettingsModal/LanguageSettingsModal";
import { removeLanguage } from "../../store/actions/languageActions/languageActions";
import AlertDialog from "../../components/AlertDialog/AlertDialog";
import {
  LanguageClose,
  LanguageToogleClose,
} from "../../store/slice/languageSlice";
import { useEffect } from "react";
import {
  getInitialLanguage,
  getTexts,
  selecetlangaugesave,
} from "../../store/actions/languagehome/languagehome";
import Trash from "../../assets/images/home/Trash_Full.svg";

const Languagesettings = () => {
  const dispatch = useAppDispatch();
  const { texts, loading, defaultText } = useAppSelector(
    (state) => state.LanguagetextData
  );
  console.log(defaultText?.isSwapped);

  useEffect(() => {
    dispatch(getTexts());
  }, []);

  const { languageOpen, error } = useAppSelector(
    (state) => state.language
  );


  const handleCloseModal = () => {
    dispatch(LanguageClose());
  };

  const handleCloseSettingsModal = () => {
    dispatch(LanguageToogleClose());
  };

  const handleSelectLanguage = async (id: number) => {
    localStorage.setItem("selectedLanguageId", id.toString());

    try {
      await dispatch(selecetlangaugesave(id)).unwrap();
      await dispatch(getInitialLanguage()).unwrap();
      await dispatch(getTexts()).unwrap();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRemoveText = (id: number) => {
    dispatch(removeLanguage(id));
  };

  return (
    <>
      {loading ? (
        <Skeleton style={{ height: "200px", width: "450px" }} />
      ) : (
        <div className="language_settings">
          <h2>Choosen language for learning</h2>
          <div className="languagesetings__top">
            {texts?.map((language: LanguageHomes) => (
              <div
                className="language_setingsboxed"
                key={language.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "5px",
                  justifyContent: "space-between",
                }}
              >
                <MenuItem
                  value={language.id}
                  onClick={() => handleSelectLanguage(Number(language.id))}
                  style={{ marginRight: "10px" }}
                >
                  {language.id === defaultText?.id && defaultText?.isSwapped
                    ? `${language.translationLanguage} - ${language.sourceLanguage}`
                    : `${language.sourceLanguage} - ${language.translationLanguage}`}
                </MenuItem>
                <Button onClick={() => handleRemoveText(language.id ?? 0)}>F
                  <img className="delet_language" src={Trash} alt="" />
                </Button>
              </div>
            ))}
          </div>
          <div
            onClick={handleCloseSettingsModal}
            className="languagesetings__bottom"
          >
            <PrimaryButton disabled={loading} label="+ New Languages" />
          </div>

          <LanguageSettingsModal onClose={handleCloseSettingsModal} />
        </div>
      )}
      {error && (
        <AlertDialog
          open={languageOpen}
          onClose={handleCloseModal}
          error={error}
          title="Pay attention"
        />
      )}
    </>
  );
};

export default Languagesettings;
