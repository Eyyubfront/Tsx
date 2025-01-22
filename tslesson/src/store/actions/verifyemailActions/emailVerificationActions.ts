import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const confirmEmail = createAsyncThunk(
  "emailVerification/confirmEmail",
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/ConfirmEmail", { code });
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
      const response = await axios.post("/api/ResendEmailConfirmationToken");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to resend confirmation token."
      );
    }
  }
);
