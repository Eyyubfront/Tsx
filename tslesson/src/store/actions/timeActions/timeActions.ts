
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


export const submitTimePreferences = createAsyncThunk(
    "time/submitPreferences",
    async (
      { startTime, endTime, timeRange }: { startTime: string; endTime: string; timeRange: string },
      { rejectWithValue }
    ) => {
      try {
        const response = await axios.post("https://your-backend-api.com/api/LearnTime", {
          startTime,
          endTime,
          timeRange,
        });
  
        if (response.status === 200) {
          return response.data; 
        } else {
          throw new Error("Failed to submit time preferences");
        }
      } catch (error: any) {
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
    }
  );