import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchQuizData, quizSaveData } from "../actions/quizActions/quizActions";



interface Answer {
  train: boolean;
  luggage: boolean;
  gelll: boolean;
}

interface QuizData {
  id: number;
  question: string;
  answers: Answer;
}

interface HomeState {
  quizData: QuizData | null;
  loading: boolean;
  error: string | null;
}


const initialState: HomeState = {
  quizData: null,
  loading: false,
  error: null,
};


const homeSlice = createSlice({
  name: "quizslice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizData.fulfilled, (state, action: PayloadAction<QuizData>) => {
        state.loading = false;
        state.quizData = action.payload;
      })
      .addCase(fetchQuizData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(quizSaveData.pending, (state) => {
        state.loading = true;
        state.error = null; 
    })
    .addCase(quizSaveData.fulfilled, (state, action) => {
        state.loading = false;
        state.quizData = action.payload ;
    })
    .addCase(quizSaveData.rejected, (state, action) => {
        state.loading = false; 
        state.error = action.payload as string; 
    });;
  },
});


export default homeSlice.reducer;