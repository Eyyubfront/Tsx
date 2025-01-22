import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchLanguages } from "../actions/languageActions/languageActions";
import { Language } from "../../types/Types";

interface LanguageState {
  languages: Language[];
  selectedLanguage: Language | null;
  loading: boolean;
  error: string | null;
}

const initialState: LanguageState = {
  languages: [],
  selectedLanguage: null,
  loading: false,
  error: null,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    selectLanguage(state, action: PayloadAction<Language>) {
      state.selectedLanguage = action.payload;
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
      });
  },
});

export const { selectLanguage } = languageSlice.actions;
export default languageSlice.reducer;
