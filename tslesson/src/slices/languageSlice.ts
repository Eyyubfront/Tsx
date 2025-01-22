import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Language } from "../types/Types";

interface LanguageState {
  languages: Language[];
  selectedLanguage: Language | null;
}

const initialState: LanguageState = {
  languages: [
    { id: 1, name: "Italian", flag: "🇮🇹" },
    { id: 2, name: "Spanish", flag: "🇪🇸" },
    { id: 3, name: "Russian", flag: "🇷🇺" },
    { id: 4, name: "Serbian", flag: "🇷🇸" },
    { id: 5, name: "Serbian", flag: "🇷🇸" },
    { id: 6, name: "Serbian", flag: "🇷🇸" },
    { id: 7, name: "Serbian", flag: "🇷🇸" },
    { id: 8, name: "Serbian", flag: "🇷🇸" },
    { id: 8, name: "Serbian", flag: "🇷🇸" },
    { id: 8, name: "Serbian", flag: "🇷🇸" },
    { id: 8, name: "Serbian", flag: "🇷🇸" },
    { id: 8, name: "Serbian", flag: "🇷🇸" },
  ],
  selectedLanguage: null,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    selectLanguage(state, action: PayloadAction<Language>) {
      state.selectedLanguage = action.payload;
    },
  },
});

export const { selectLanguage } = languageSlice.actions;
export default languageSlice.reducer;
