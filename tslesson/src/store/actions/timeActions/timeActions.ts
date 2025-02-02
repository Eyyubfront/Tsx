import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface SubmitTimePreferencesPayload {
  intervalId: number;
  startTime: string;
  endTime: string;
  
}

export const submitTimePreferences = createAsyncThunk(
  "time/submitPreferences",
  async (
    {  intervalId, startTime, endTime }: SubmitTimePreferencesPayload,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("https://language-learn-axe5epeugbbqepez.uksouth-01.azurewebsites.net/api/NotificationSetting/Create", {
        intervalId,
        startTime,
        endTime,
      
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);