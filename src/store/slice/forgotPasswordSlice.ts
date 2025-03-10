import { createSlice } from "@reduxjs/toolkit";
import { sendForgotPasswordEmail } from "../actions/forgotPasswordActions/forgotPasswordActions";

interface ForgotPasswordState {
  loading: boolean;
  error: string | null;
  success: boolean;
}


const initialState: ForgotPasswordState = {
  loading: false,
  error: null,
  success: false,
};

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendForgotPasswordEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendForgotPasswordEmail.fulfilled, (state) => {
        state.loading = false;
        state.success = true;

      })
      .addCase(
        sendForgotPasswordEmail.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      );
  },
});

export default forgotPasswordSlice.reducer;
