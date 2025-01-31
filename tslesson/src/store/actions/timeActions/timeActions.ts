import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../axiosInstance";

interface SubmitTimePreferencesPayload {
  intervalId: number;
  startTime: string;
  endTime: string;
  timeRange: string;
}

export const submitTimePreferences = createAsyncThunk(
  "time/submitPreferences",
  async (
    {  intervalId, startTime, endTime, timeRange }: SubmitTimePreferencesPayload,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/NotificationSetting/Create", {
        intervalId,
        startTime,
        endTime,
        timeRange,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);