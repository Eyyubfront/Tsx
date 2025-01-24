import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import learningNowReducer from './slice/LearingNowSlice';
import latestWordsReducer from './slice/LatestWordsSlice';
import AuthLogin from './slice/authSlice';
import languageReducer from './slice/languageSlice';
import emailVerificationReducer from './slice/emailVerificationSlice';
import LanguageHomedata from './slice/LanguageHomeSlice';

const store = configureStore({
    reducer: {
        learningNow: learningNowReducer,
        latestWords: latestWordsReducer,
        Auth: AuthLogin,
        language: languageReducer,
        emailVerification: emailVerificationReducer,
        LanguagetextData: LanguageHomedata,
    },

});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;


