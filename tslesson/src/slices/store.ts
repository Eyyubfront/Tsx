import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"; 
import languageReducer from "../slices/languageSlice";
import emailVerificationReducer from "./emailVerificationSlice";

export const store = configureStore({
  reducer: {
    language: languageReducer,
    emailVerification: emailVerificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
