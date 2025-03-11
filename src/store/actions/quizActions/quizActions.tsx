import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
import { getAllMastered } from "../masteredActions/masteredActions";
import { lexioncountfetch } from "../lexioncountActions/lexioncountActions";
import { fetchTexts } from "../learingActions/learingnowActions";
import { wordfetchTexts } from "../learingActions/learingwordsActions";
import { ReportProps } from "../../slice/quizSlice";

export const fetchQuizData = createAsyncThunk(
  "home/fetchQuizData",
  async (params: { excludeIds: number[], isMastered: boolean }, { rejectWithValue }) => {
    const { excludeIds, isMastered } = params;
    const idsGenerate = excludeIds.map(id => `excludeIds=${id}`).join("&");
    try {
      const response = await axiosInstance.get(
        `/Quiz/GetQuestion?${idsGenerate}&isMastered=${isMastered}`
      );
      console.log(response);
      
      return response.data.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch category data");
    }
  }
);




export const quizSaveData = createAsyncThunk(
  "homelanguage/selecetid",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post(`/UserVocabulary/SetMastered/${id}?addToLearning=true`);

      dispatch(lexioncountfetch());
      dispatch(getAllMastered());
      dispatch(fetchTexts({ page: 1, pageSize: 10 }));
      dispatch(wordfetchTexts({ page: 1, pageSize: 10,isGrouped:true }));
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const quizcountReport = createAsyncThunk(
  "homelanguage/quizcountReport",
  async (correctAnswerCount: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post(`/Quiz/CreateReport?correctAnswerCount=${correctAnswerCount}`);
      dispatch(notificationallsdata());
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);




export const notificationallsdata = createAsyncThunk(
  "home/notificationallsdata",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/UserNotification/GetAllByUserId"
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch category data");
    }
  }
);




export const QuizSession = createAsyncThunk(
  "Quiz/QuizSession",
  async (reportData: ReportProps, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/QuizSession/Create`, reportData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);



export const QuizRaportFetch = createAsyncThunk('Quiz/QuizRaportFetch', async (_, thunkAPI) => {
  try {

    const response = await axiosInstance.get(`/QuizSession/GetQuizAccuracy`);
    console.log(response);

    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});