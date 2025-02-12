import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";


export interface MasteredPropsUse {
    id: number;
    source: string;
    translation: string;
    isLearningNow: boolean;
  
}

export interface IMasteredProps extends MasteredPropsUse {
    isMastered?: boolean
}

export const getAllMastered = createAsyncThunk('alltext/getAllMastered', async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/UserVocabulary/GetAllMasteredByUserId`);
      console.log(response);
      return response.data.data;
      
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  });
  