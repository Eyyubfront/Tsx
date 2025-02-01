import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";


export const confirmEmail = createAsyncThunk(
  "emailVerification/confirmEmail",
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/ConfirmEmail", { code });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to confirm email."
      );
    }
  }
);

export const resendConfirmationToken = createAsyncThunk(
  "emailVerification/resendConfirmationToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/ResendEmailConfirmationToken");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to resend confirmation token."
      );
    }
  }
);
