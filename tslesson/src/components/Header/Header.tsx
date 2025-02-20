
import { useState } from 'react';
import {  DialogContent, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store';
import { closeDialog, openDialog, openQuizModal } from '../../store/slice/LanguageHomeSlice';
import Paragrafy from '../../components/Paragrafy/Paragrafy';
import "./Header.scss";
import BurgerMenu from './HeaderBurger/Burgermenu/Burgermenu';
import SelecetLanguage from '../SelecetLanguage/SelecetLanguage';
import NotifactionComponents from '../NotifactionComponents/NotifactionComponents';
import Add from '../../assets/images/header/Add.svg';
import NewWordModal from './NewWordModal/NewWordModal';
import { Link } from 'react-router-dom';
import AlertDialog from '../AlertDialog/AlertDialog';


const Header = () => {
  const [showModal, setShowModal] = useState<boolean>(false);




  const items = useAppSelector((state) => state.learningNow.items.nowitems);
  const dispatch = useAppDispatch();
  const isDialogOpen = useAppSelector((state) => state.LanguagetextData.isDialogOpen);

  const handleQuizClick = () => {
    if (!items || items.length === 0) {

      dispatch(openDialog());
    } else {

      dispatch(openQuizModal());
    }
  };

  const handleCloseLearingDialog = () => {
    dispatch(closeDialog());
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="header">
      <div className="header_left">
        <SelecetLanguage />
      </div>
      <div className="header_center">
        <div onClick={handleQuizClick}
          className="header_center">
          <Link style={{ textDecoration: "none", color: 'black', cursor: "pointer" }} to="">
            <Paragrafy className='quiz_center' fontsize='24px' fontfamily='DM Serif Display' text='Let’s start quiz' />
          </Link>
        </div>

      </div>
      <div className="header_right">
        <Link to="/settingspage">
          <div className="header_setting">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.6006 21.0758L19.0608 17.9233C19.6437 17.5868 19.9346 17.4185 20.1465 17.1831C20.3341 16.9748 20.4759 16.7295 20.5625 16.4629C20.6602 16.1624 20.6602 15.8265 20.6602 15.1566V8.84243C20.6602 8.17253 20.6602 7.83669 20.5625 7.53614C20.4759 7.26958 20.3341 7.02404 20.1465 6.81575C19.9355 6.58137 19.6453 6.41381 19.0674 6.08018L13.5996 2.92334C13.0167 2.58681 12.7259 2.41889 12.416 2.35303C12.1419 2.29476 11.8584 2.29476 11.5843 2.35303C11.2744 2.41889 10.9826 2.58681 10.3997 2.92334L4.93843 6.07641C4.35623 6.41255 4.06535 6.58048 3.85352 6.81575C3.66597 7.02404 3.52434 7.26958 3.43773 7.53614C3.33984 7.8374 3.33984 8.17411 3.33984 8.84717V15.1521C3.33984 15.8252 3.33984 16.1617 3.43773 16.4629C3.52434 16.7295 3.66597 16.9748 3.85352 17.1831C4.06548 17.4185 4.35657 17.5868 4.93945 17.9233L10.3997 21.0758C10.9826 21.4123 11.2744 21.5804 11.5843 21.6462C11.8584 21.7045 12.1419 21.7045 12.416 21.6462C12.7259 21.5803 13.0177 21.4123 13.6006 21.0758Z" stroke="#8B6DE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 11.9995C9 13.6564 10.3431 14.9995 12 14.9995C13.6569 14.9995 15 13.6564 15 11.9995C15 10.3427 13.6569 8.99952 12 8.99952C10.3431 8.99952 9 10.3427 9 11.9995Z" stroke="#8B6DE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </Link>
        <NotifactionComponents />
        <div className="header_words" onClick={handleOpenModal}>
          <img src={Add} alt="Add New Word" />
          <Paragrafy className='newwordstext' fontWeight="600" fontsize='16px' fontfamily='DM Sans' text=' New Words' />
        </div>
      </div>
      <div className="header_burgermenu">
        <BurgerMenu />
      </div>
      <NewWordModal show={showModal} onClose={handleCloseModal} />
      <AlertDialog
        open={isDialogOpen} onClose={handleCloseLearingDialog}
        title="Notice ">
        <DialogContent>
          <Typography sx={{textAlign:"center",color:"red"}}>
          There are no learning words available to start the quiz
          </Typography>
        </DialogContent>
      </AlertDialog>
    </div>
  );
};

export default Header;
