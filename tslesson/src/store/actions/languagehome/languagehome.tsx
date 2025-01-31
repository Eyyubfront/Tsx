import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";




export const getTexts = createAsyncThunk('learningNow/getTexts', async (_,thunkAPI) => {
    try {
        const response = await axiosInstance.get(`/UserLanguage/GetAllByUserId`);
   
        return response.data.data;
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


