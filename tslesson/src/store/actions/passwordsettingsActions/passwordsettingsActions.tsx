import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../axiosInstance";





export const passwordChecksave = createAsyncThunk(
    'create/passwordcheck',
    async (params: { currentPassword: string; newPassword: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                "https://learn-language-api.azurewebsites.net/api/ChangePassword",
                {
                    currentPassword: params.currentPassword,
                    newPassword: params.newPassword,
                }
            );
  
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);