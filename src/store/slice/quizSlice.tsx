import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchQuizData, notificationallsdata, quizcountReport, QuizRaportFetch, quizSaveData, QuizSession } from "../actions/quizActions/quizActions";



interface Answer {
  [key: string]: boolean;
}

interface QuizData {
  id: number;
  question: string;
  answers: Answer;
  success: boolean;
  data: any;

}

export interface Notification {
  id: number;
  title: string;
  body: string
  createdOn: string;
}



export interface ReportProps {
  correctAnswers: number;
  totalQuestions: number;
  remainingHealth: number;
  quizDate: string

}




interface DailyReport {
  dayStart: string;
  questions: number;
  correctAnswers: number;
  accuracy: number;
}

interface WeeklyReport {
  weekStart: string;
  questions: number;
  correctAnswers: number;
  accuracy: number;
}

interface MonthlyReport {
  monthStart: string;
  questions: number;
  correctAnswers: number;
  accuracy: number;
}

export interface QuizRaport {
  totalQuestions: number;
  totalCorrectAnswers: number;
  overallAccuracy: number;
  daily: DailyReport[];
  weekly: WeeklyReport[];
  monthly: MonthlyReport[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}



interface HomeState {
  quizData: QuizData | null;
  quizRaports: QuizRaport | null;
  loading: boolean;
  reportData: ReportProps | null;
  error: string | null;
  notifications: Notification[]
}


const initialState: HomeState = {
  quizData: null,
  reportData: {
    correctAnswers: 0,
    totalQuestions: 0,
    remainingHealth: 0,
    quizDate: ""
  },
  quizRaports: null,
  loading: false,
  error: null,
  notifications: []
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
      .addCase(QuizRaportFetch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(QuizRaportFetch.fulfilled, (state, action: PayloadAction<QuizRaport>) => {
        state.loading = false;
        state.quizRaports = action.payload;
      })
      .addCase(QuizRaportFetch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(QuizSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(QuizSession.fulfilled, (state, action: PayloadAction<ReportProps>) => {
        state.loading = false;
        state.reportData = action.payload;
      })
      .addCase(QuizSession.rejected, (state, action) => {
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
        state.quizData = action.payload;
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