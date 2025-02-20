import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
import { getAllMastered } from "../masteredActions/masteredActions";
import { lexioncountfetch } from "../lexioncountActions/lexioncountActions";
import { fetchTexts } from "../learingActions/learingnowActions";
import { wordfetchTexts } from "../learingActions/learingwordsActions";

export const fetchQuizData = createAsyncThunk(
    "home/fetchQuizData",
    async (excludeIds: number[], { rejectWithValue }) => {
      const idsGenerate = excludeIds.map(id => `excludeIds=${id}`).join("&")
      try {
        const response = await axiosInstance.get(
          `/Quiz/GetQuestion?${idsGenerate}`
        );
       
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
        const response = await axiosInstance.post(`/UserVocabulary/SetMastered/${id}`);
        // await dispatch(fetchQuizData([0])); 
        dispatch(lexioncountfetch()); 
        dispatch(getAllMastered()); 
        dispatch(fetchTexts({ page: 1, pageSize: 10 })); 
        dispatch(wordfetchTexts({ page: 1, pageSize: 10 }));
        return response.data.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );


  export const quizcountReport = createAsyncThunk(
    "homelanguage/quizcountReport",
    async (correctAnswerCount: number, { rejectWithValue,dispatch }) => {
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




