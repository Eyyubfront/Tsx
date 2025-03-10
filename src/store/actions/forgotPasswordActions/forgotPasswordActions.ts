import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ForgotPasswordPayload {
  email: string;
}

export const sendForgotPasswordEmail = createAsyncThunk<
  any, 
  ForgotPasswordPayload
>(
  "forgotPassword/sendForgotPasswordEmail",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://learn-language-app.azurewebsites.net/api/ForgotPassword",
        { email }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue( error);
    }
  }
);
