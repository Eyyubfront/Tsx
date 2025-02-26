import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
import { fetchTexts } from "../learingActions/learingnowActions";
import { wordfetchTexts } from "../learingActions/learingwordsActions";
import { categoryfetch } from "../categoryActions/categoryActions";
import { lexioncountfetch } from "../lexioncountActions/lexioncountActions";




export const getTexts = createAsyncThunk('homepage/getTexts', async (_,thunkAPI) => {
    try {
        const response = await axiosInstance.get(`/UserLanguage/GetAllByUserId`); 
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getInitialLanguage = createAsyncThunk('homepage/getInitialLanguage', async (_,thunkAPI) => {
  try {
      const response = await axiosInstance.get(`/UserLanguage/GetSelected`); 
      
      return response.data.data;
      
  } catch (error) {
      return thunkAPI.rejectWithValue(error);
  }
});

export const selecetlangaugesave = createAsyncThunk(
    "homelanguage/selecetid",
    async (id: number, { rejectWithValue, dispatch }) => {
      try {
        const response = await axiosInstance.post(`/UserLanguage/SetSelected/${id}`);
        
        
        dispatch(getTexts()); 
        dispatch(categoryfetch()); 
        dispatch(lexioncountfetch()); 
        dispatch(fetchTexts({ page: 1, pageSize: 10 })); 
        dispatch(wordfetchTexts({ page: 1, pageSize: 10 }));
     
        return response.data?.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );







  export const languageswap = createAsyncThunk(
    "homelanguage/languageswap",
    async (id: number, { rejectWithValue, dispatch }) => {
      try {
        const response = await axiosInstance.post(`/UserLanguage/Swap/${id}`);
        dispatch(getInitialLanguage());    
        return response.data.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

