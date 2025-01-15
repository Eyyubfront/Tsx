import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import learningNowReducer from './LearingNowSlice';
import latestWordsReducer from './LatestWordsSlice';
import UserProviders from './userSlice';
import AuthLogin from './authSlice';

const store = configureStore({
    reducer: {
        learningNow: learningNowReducer,
        latestWords: latestWordsReducer,
        UserAll:UserProviders,
        Auth :AuthLogin
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;