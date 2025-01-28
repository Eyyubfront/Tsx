import { createSlice } from "@reduxjs/toolkit";
import { confirmEmail, resendConfirmationToken } from "../actions/verifyemailActions/emailVerificationActions";

interface EmailProps {
  refreshToken: string | null; 
  userId: string | null;  
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
  resendAllowed: boolean;
  success: boolean;
  isResetPassword: boolean;
}

const initialState: EmailProps = {
  refreshToken: null,
  accessToken: null,
  userId: null,  
  isLoading: false,
  error: null,
  success: false,
  resendAllowed: false,
  isResetPassword: false, // Yeni durum başlangıcı
};

const emailVerificationSlice = createSlice({
  name: "emailVerification",
  initialState,
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
      state.resendAllowed = false;
      state.isResetPassword = false; // Sıfırlama
    },
    setIsResetPassword: (state, action) => {
      state.isResetPassword = action.payload; // Durumu ayarlama reducer'ı
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(confirmEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(confirmEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.userId = action.payload.userId;  
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

export const { resetState, setIsResetPassword } = emailVerificationSlice.actions;
export default emailVerificationSlice.reducer;