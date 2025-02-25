import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTime, submitTimePreferences, updateTime } from "../actions/timeActions/timeActions";

interface TimeState {
  userId: string;
  intervalId: number | null;
  startTime: string;
  endTime: string;
  loading: boolean;
  error: string | null;
}

const initialState: TimeState = {
  userId: "",
  intervalId: null,
  startTime: "",
  endTime: "",
  loading: false,
  error: null,
};

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
    setIntervalId(state, action: PayloadAction<number | null>) {
      state.intervalId = action.payload;
    },
    setStartTime(state, action: PayloadAction<string>) {
      state.startTime = action.payload;
    },
    setEndTime(state, action: PayloadAction<string>) {
      state.endTime = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getTime.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.intervalId = action.payload.intervalId;
        state.startTime = action.payload.startTime;
        state.endTime = action.payload.endTime;
      })

      .addCase(getTime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(submitTimePreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitTimePreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.intervalId = action.payload.intervalId;
        state.startTime = action.payload.startTime;
        state.endTime = action.payload.endTime;
      })
      .addCase(submitTimePreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateTime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTime.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.intervalId = action.payload.intervalId;
        state.startTime = action.payload.startTime;
        state.endTime = action.payload.endTime;
      })
      .addCase(updateTime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUserId, setIntervalId, setStartTime, setEndTime } = timeSlice.actions;

export default timeSlice.reducer;