import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUserLanguage, fetchLanguages } from "../actions/languageActions/languageActions";
import { Language } from "../../types/Types";

interface LanguageState {
  languages: Language[];
  selectedLanguage: Language | null;
  loading: boolean;
  error: string | null;
  userLanguageCreated: boolean;
  selectedTranslationId: number | null;
  selectedSourceLanguageId: number | null;
}

const initialState: LanguageState = {
  languages: [],
  selectedLanguage: null,
  selectedTranslationId: null,
  selectedSourceLanguageId: null,
  loading: false,
  error: null,
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
      });
  },
});

export const { selectLanguage, setSourceLanguageId, setTranslationLanguageId } = languageSlice.actions;
export default languageSlice.reducer;
