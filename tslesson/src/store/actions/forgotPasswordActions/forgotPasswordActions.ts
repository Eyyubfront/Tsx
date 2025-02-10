import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ForgotPasswordPayload {
  email: string;
}

export const sendForgotPasswordEmail = createAsyncThunk<
  any, 
  ForgotPasswordPayload, 
  { rejectValue: string } 
>(
  "forgotPassword/sendForgotPasswordEmail",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://learn-language-api.azurewebsites.net/api/ForgotPassword",
        { email }
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);
