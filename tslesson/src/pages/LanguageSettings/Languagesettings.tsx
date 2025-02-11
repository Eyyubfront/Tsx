import { useState } from "react";
import { useAppSelector } from "../../store";
import { LanguageHomes } from "../../types/Types";
import { MenuItem, Skeleton } from "@mui/material";
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
  const { texts, loading } = useAppSelector((state) => state.LanguagetextData);

  return (
    <>
      {
        loading ? <Skeleton style={{ height: "200px", width: "450px" }} /> : <div className="language_settings">
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
            <PrimaryButton disabled={loading} label="+ New Languages" />
          </div>
          <LanguageSettingsModal show={showModal} onClose={handleCloseModal} />
        </div>
      }
    </>
  )
}

export default Languagesettings