import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { getTexts } from "../../store/actions/languagehome/languagehome";
import { LanguageHomes } from "../../types/Types";
import { MenuItem } from "@mui/material";
import "./Languagesettings.scss"
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import LanguageSettingsModal from "./LanguageSettingsModal/LanguageSettingsModal";

const Languagesettings = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const dispatch = useAppDispatch();
  const { texts } = useAppSelector((state) => state.LanguagetextData);

  useEffect(() => {
    dispatch(getTexts());
  }, [dispatch]);
  return (
    <div className="language_settings">
      <div className="languagesetings__top">
        <p>
          {texts?.map((language: LanguageHomes) => (
            <MenuItem key={language.id} value={language.id}>
              {language.sourceLanguage} - {language.translationLanguage}
            </MenuItem>
          ))}
        </p>
      </div>
      <div onClick={handleOpenModal} className="languagesetings__bottom">
        <PrimaryButton label="+ New Languages" />
      </div>
      <LanguageSettingsModal show={showModal} onClose={handleCloseModal} />
    </div>
  )
}

export default Languagesettings