import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import learningNowReducer from './LearingNowSlice';
import latestWordsReducer from './LatestWordsSlice';

const store = configureStore({
    reducer: {
        learningNow: learningNowReducer,
        latestWords: latestWordsReducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;