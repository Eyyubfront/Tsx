import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Confirm Email API
export const confirmEmail = createAsyncThunk(
  "emailVerification/confirmEmail",
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/ConfirmEmail", { code });
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to confirm email."
      );
    }
  }
);


// Resend Confirmation Token API
export const resendConfirmationToken = createAsyncThunk(
  "emailVerification/resendConfirmationToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/ResendEmailConfirmationToken");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to resend confirmation token."
      );
    }
  }
);

// Slice
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
