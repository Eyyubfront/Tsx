import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addFromVocabulary } from "../actions/LearingaddformActions/LearingaddformActions";


interface Vocabulary {
  id: number;
  source: string;
  translation: string;
  isAdded: boolean;
}


interface UserVocabularyState {
  vocabularies: Vocabulary[]; 
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null; 
}

const initialState: UserVocabularyState = {
  vocabularies: [],
  status: 'idle',
  error: null,
};


const userVocabularySlice = createSlice({
  name: 'userVocabulary',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFromVocabulary.pending, (state) => {
        state.status = 'loading'; 
      })
      .addCase(addFromVocabulary.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addFromVocabulary.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload; 
      });
  },
});

export default userVocabularySlice.reducer;
