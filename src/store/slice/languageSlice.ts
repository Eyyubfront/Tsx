import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUserLanguage, fetchLanguages, removeLanguage } from "../actions/languageActions/languageActions";
import { Language } from "../../types/Types";

interface LanguageState {
  languages: Language[];
  selectedLanguage: Language | null;
  loading: boolean;
  error: string | null;
  userLanguageCreated: boolean;
  selectedTranslationId: number | null;
  selectedSourceLanguageId: number | null;
  languageOpen:boolean;
  languagetooglOpen:boolean
}

const initialState: LanguageState = {
  languages: [],
  selectedLanguage: null,
  selectedTranslationId: null,
  selectedSourceLanguageId: null,
  loading: false,
  error: null,
  languageOpen:false,
  languagetooglOpen:false,
  userLanguageCreated: false,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    selectLanguage(state, action: PayloadAction<Language>) {
      state.selectedLanguage = action.payload;
    },
    setSourceLanguageId(state, action: PayloadAction<number>) {
      state.selectedSourceLanguageId = action.payload;
    },
    setTranslationLanguageId(state, action: PayloadAction<number>) {
      state.selectedTranslationId = action.payload;
    },
    LanguageClose(state) {
      state.languageOpen = !state.languageOpen;
    },
    LanguageToogleClose(state) {
      state.languagetooglOpen = !state.languagetooglOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLanguages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLanguages.fulfilled, (state, action: PayloadAction<Language[]>) => {
        state.loading = false;
        state.languages = action.payload;
      })
      .addCase(fetchLanguages.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createUserLanguage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.userLanguageCreated = false;
      })
      .addCase(createUserLanguage.fulfilled, (state) => {
        state.loading = false;
        state.userLanguageCreated = true;
      })
      .addCase(createUserLanguage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.userLanguageCreated = false;
        state.languageOpen=true
      })
      .addCase(removeLanguage.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(removeLanguage.fulfilled, (state, action) => {
        state.loading = true;
        state.languages = state.languages.filter((item) => item.id !== action.payload)
      })
      .addCase(removeLanguage.rejected, (state, action) => {
        state.loading = false;
        state.languageOpen = true;
        state.languagetooglOpen = true;
        state.error = action.payload as string

      });
  },
});

export const { selectLanguage,LanguageToogleClose,LanguageClose, setSourceLanguageId, setTranslationLanguageId } = languageSlice.actions;
export default languageSlice.reducer;
