import { createSlice } from "@reduxjs/toolkit";
import { confirmEmail, resendConfirmationToken } from "../actions/verifyemailActions/emailVerificationActions";

const emailVerificationSlice = createSlice({
  name: "emailVerification",
  initialState: {
    isLoading: false,
    error: null as string | null,
    success: false,
    resendAllowed: false,
  },
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
      state.resendAllowed = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Confirm Email
      .addCase(confirmEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(confirmEmail.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(confirmEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Resend Token
      .addCase(resendConfirmationToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resendConfirmationToken.fulfilled, (state) => {
        state.isLoading = false;
        state.resendAllowed = true;
      })
      .addCase(resendConfirmationToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetState } = emailVerificationSlice.actions;
export default emailVerificationSlice.reducer;
