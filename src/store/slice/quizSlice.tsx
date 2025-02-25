import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchQuizData, notificationallsdata, quizcountReport, quizSaveData } from "../actions/quizActions/quizActions";



interface Answer {
  [key: string]: boolean;
}

interface QuizData {
  id: number;
  question: string;
  answers: Answer;
  success:boolean;
  data:any
}

 export interface Notification {
  id: number;
  title: string;
  body: string
  createdOn:string;
}



interface HomeState {
  quizData: QuizData | null;
  loading: boolean;
  error: string | null;

  notifications:Notification[]
}


const initialState: HomeState = {
  quizData: null,
  loading: false,
  error: null,
  notifications:[]
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

      .addCase(notificationallsdata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(notificationallsdata.fulfilled, (state, action: PayloadAction<Notification[]>) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(notificationallsdata.rejected, (state, action) => {
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
    })
    .addCase(quizcountReport.pending, (state) => {
      state.loading = true;
      state.error = null; 
  })
  .addCase(quizcountReport.fulfilled, (state) => {
      state.loading = false;

  })
  .addCase(quizcountReport.rejected, (state, action) => {
      state.loading = false; 
      state.error = action.payload as string; 
  });;
  },
});


export default homeSlice.reducer;