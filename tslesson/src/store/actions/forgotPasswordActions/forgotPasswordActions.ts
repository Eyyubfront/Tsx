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
        "https://language-learn-axe5epeugbbqepez.uksouth-01.azurewebsites.net/api/ForgotPassword",
        { email }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);
