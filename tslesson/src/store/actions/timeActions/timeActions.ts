import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../axiosInstance";

interface SubmitTimePreferencesPayload {
  intervalId: number;
  startTime: string;
  endTime: string;

}
export const getTime = createAsyncThunk('learningNow/getTime', async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`/NotificationSetting/GetByUserId`);

    return response.data.data;

  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});



export const submitTimePreferences = createAsyncThunk(
  "time/submitPreferences",
  async (
    { intervalId, startTime, endTime }: SubmitTimePreferencesPayload,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await axiosInstance.post("/NotificationSetting/Create", {
        intervalId,
        startTime,
        endTime,

      });
      dispatch(getTime());
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const updateTime = createAsyncThunk(
  "time/updateTime",
  async (
    { intervalId, startTime, endTime }: SubmitTimePreferencesPayload,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await axiosInstance.put("/NotificationSetting/Update", {
        intervalId,
        startTime,
        endTime,
      });
      dispatch(getTime());
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
