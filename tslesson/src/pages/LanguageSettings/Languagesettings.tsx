

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { LanguageHomes } from "../../types/Types";
import { Button, IconButton, MenuItem, Skeleton } from "@mui/material";
import "./Languagesettings.scss";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import LanguageSettingsModal from "./LanguageSettingsModal/LanguageSettingsModal";
import { removeLanguage } from "../../store/actions/languageActions/languageActions";
import { MdDeleteOutline } from "react-icons/md";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Close } from "@mui/icons-material";

const Languagesettings = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [languageToRemoveId, setLanguageToRemoveId] = useState<number | null>(null);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseModalError = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const { texts, loading } = useAppSelector((state) => state.LanguagetextData);
  const { error } = useAppSelector((state) => state.language);

  useEffect(() => {
    if (error) {
      setIsModalOpen(true);
    }
    else if(!error && languageToRemoveId !== null){
      setLanguageToRemoveId(null);
    }
  }, [error,languageToRemoveId]);


  const handleRemoveText = (id: number) => {
    setLanguageToRemoveId(id);
    dispatch(removeLanguage(id));
  };

 

  return (
    <>
      {loading ? (
        <Skeleton style={{ height: "200px", width: "450px" }} />
      ) : (
        <div className="language_settings">
          <div className="languagesetings__top">
            {texts?.map((language: LanguageHomes) => (
              <div key={language.id} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                <MenuItem value={language.id} style={{ marginRight: "10px" }}>
                  {language.sourceLanguage} - {language.translationLanguage}
                </MenuItem>
                <Button onClick={() => { handleRemoveText(language.id ?? 0) }}  >
                  <MdDeleteOutline className="delet_language" />
                </Button>
              </div>
            ))}
          </div>

          <div onClick={handleOpenModal} className="languagesetings__bottom">
            <PrimaryButton disabled={loading} label="+ New Languages" />
          </div>
          <LanguageSettingsModal show={showModal} onClose={handleCloseModal} />
        </div>
      )}

      {error && <Dialog
        open={isModalOpen}
        onClose={handleCloseModalError}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="language_dialoqtop">
          <DialogTitle id="alert-dialog-title">
            Pay attention
          </DialogTitle>
          <IconButton className='iconbutton' onClick={handleCloseModalError}>
            <Close />
          </IconButton>
        </div>
        <DialogContent>
          <DialogContentText id="modal_message">
            {error && <p style={{ color: 'red' }}> {error}</p>}
          </DialogContentText>
        </DialogContent>
      </Dialog>}
    </>
  );
};

export default Languagesettings;