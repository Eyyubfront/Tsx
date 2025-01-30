import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../axiosInstance";

interface SubmitTimePreferencesPayload {
  userId: string |null;
  intervalId: number;
  startTime: string;
  endTime: string;
  timeRange: string;
}

export const submitTimePreferences = createAsyncThunk(
  "time/submitPreferences",
  async (
    { userId, intervalId, startTime, endTime, timeRange }: SubmitTimePreferencesPayload,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/NotificationSetting/Create", {
        userId,
        intervalId,
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