import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import learningNowReducer from './slice/LearingNowSlice';
import latestWordsReducer from './slice/LatestWordsSlice';
import AuthLogin from './slice/authSlice';
import languageReducer from './slice/languageSlice';
import emailVerificationReducer from './slice/emailVerificationSlice';
import LanguageHomedata from './slice/LanguageHomeSlice';
import timeReducer from './slice/timeSlice';
import forgotPasswordReducer from "./slice/forgotPasswordSlice";
import passwordResetReducer from "./slice/passwordResetSlice";
import categoryReducer from "./slice/CategroySlice";
import lexionReducer from "./slice/LexionSlice";
import PasswordcheckSettingsReducer from "./slice/PasswordSettingsSlice";
import UserVocabularyReducer from "./slice/userVocabularySlice";
import MasteredReducers from "./slice/masteredSlice";
import QuizReducer from "./slice/quizSlice";
const store = configureStore({
    reducer: {
        learningNow: learningNowReducer,
        latestWords: latestWordsReducer,
        Auth: AuthLogin,
        language: languageReducer,
        emailVerification: emailVerificationReducer,
        LanguagetextData: LanguageHomedata,
        time: timeReducer,
        forgotPassword: forgotPasswordReducer,
        passwordReset: passwordResetReducer,
        category: categoryReducer,
        lexioncard: lexionReducer,
        passwordchecksettings: PasswordcheckSettingsReducer,
        userVocabulary: UserVocabularyReducer,
        mastered: MasteredReducers,
        quizslice: QuizReducer,

    },

});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;


