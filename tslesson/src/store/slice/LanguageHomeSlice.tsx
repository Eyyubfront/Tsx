import { createSlice } from "@reduxjs/toolkit";
import { getTexts } from "../actions/languagehome/languagehome";

interface TextItem {
  text: string;
  id: number;
  sourceLanguage: string;
  translationLanguage: string;
  isDefault: boolean;
}

interface TextState {
  texts: TextItem[];
  defaultText: TextItem | null;
  selectedLanguageId: number | null; 
  loading: boolean;
  error: string | null;
}

const initialState: TextState = {
  texts: [],
  defaultText: null,
  selectedLanguageId: null, 
  loading: false,
  error: null,
};

const LanguageHomeSlice = createSlice({
  name: "LanguagetextData",
  initialState,
  reducers: {
    setSelectedLanguage(state, action) {
      state.selectedLanguageId = action.payload; // Dil seçimi yapıldı
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTexts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTexts.fulfilled, (state, action: any) => {
        state.loading = false;
        state.texts = action.payload;
        
        // Default dili bul ve seçilen dil id'si varsa onu ayarla
        const defaultLanguage = action.payload.find((t: { isDefault: boolean }) => t.isDefault);
        if (defaultLanguage) {
          state.defaultText = defaultLanguage;
          if (state.selectedLanguageId === null) {
            state.selectedLanguageId = defaultLanguage.id; // İlk defa yükleniyorsa, default dili seç
          }
        }
      })
      .addCase(getTexts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedLanguage } = LanguageHomeSlice.actions;
export default LanguageHomeSlice.reducer;
