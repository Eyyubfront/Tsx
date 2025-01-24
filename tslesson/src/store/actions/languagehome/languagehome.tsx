import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";




export const getTexts = createAsyncThunk('learningNow/fetchTexts', async (userId: string, thunkAPI) => {
    try {
        const response = await axiosInstance.get(`/UserLanguage/GetAllByUserId?userId=${userId}`);
   
        return response.data?.data;
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
