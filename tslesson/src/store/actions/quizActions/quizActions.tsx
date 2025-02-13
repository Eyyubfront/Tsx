import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
import { getAllMastered } from "../masteredActions/masteredActions";
import { lexioncountfetch } from "../lexioncountActions/lexioncountActions";

export const fetchQuizData = createAsyncThunk(
    "home/fetchQuizData",
    async (excludeIds: number, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(
          `/Quiz/GetQuestion?excludeIds=${excludeIds}`
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
        dispatch(fetchQuizData(0)); 
        dispatch(lexioncountfetch()); 
     
        return response.data.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );


