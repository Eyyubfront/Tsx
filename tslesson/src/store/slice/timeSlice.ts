import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { submitTimePreferences } from "../actions/timeActions/timeActions";

interface TimeState {
  startTime: string;
  endTime: string;
  timeRange: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: TimeState = {
  startTime: "08:00",
  endTime: "18:00",
  timeRange: null,
  loading: false,
  error: null,
};

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    setStartTime(state, action: PayloadAction<string>) {
      state.startTime=action.payload;
    },
    setEndTime(state, action: PayloadAction<string>) {
      state.endTime = action.payload;
    },
    setTimeRange(state, action: PayloadAction<string>) {
      state.timeRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitTimePreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitTimePreferences.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitTimePreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setStartTime, setEndTime, setTimeRange } = timeSlice.actions;
export default timeSlice.reducer;
