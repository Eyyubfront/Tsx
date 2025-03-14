import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const confirmEmail = createAsyncThunk(
  "emailVerification/confirmEmail",
  async ({ code, userId }: { code: string; userId: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://learn-language-app.azurewebsites.net/api/ConfirmEmail", { code, userId });
      localStorage.setItem('token', response.data.data.accessToken);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      localStorage.setItem('userId', response.data.data.userId);
      
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.[0] || error.response?.data?.message || "Failed to confirm email.";
      return rejectWithValue(errorMessage);
    }
  }
);

export const resendConfirmationToken = createAsyncThunk(
  "emailVerification/resendConfirmationToken",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://learn-language-app.azurewebsites.net/api/ResendEmailConfirmationCode", { userId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const confirmPasswordResetCode = createAsyncThunk(
  "emailVerification/ConfirmPasswordResetCode",
  async ({ code, userId }: { code: string; userId: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://learn-language-app.azurewebsites.net/api/ConfirmPasswordResetCode", { code, userId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);