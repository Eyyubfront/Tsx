import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, register, refreshToken } from '../actions/authActions';
import { sendForgotPasswordEmail } from '../actions/forgotPasswordActions/forgotPasswordActions';

interface AuthState {
  refreshToken: string | null;
  userId: string | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  isAuth: boolean;
  success: boolean;
  veriyuse: Boolean
}

const initialState: AuthState = {
  refreshToken: null,
  accessToken: null,
  userId: null,
  loading: false,
  error: null,
  success: false,
  isAuth: false,
  veriyuse: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuth = false;
      state.userId = null;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    },
    setVeryuse(state, action) {
      state.veriyuse = action.payload
    }

  },
  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.userId = action.payload.userId;
        state.isAuth = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuth = false;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload.userId;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuth = false;
      })
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.userId = action.payload.data.userId
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuth = false;
      })
      .addCase(sendForgotPasswordEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendForgotPasswordEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const userId = action.payload.userId
        state.userId = userId;

      })
      .addCase(
        sendForgotPasswordEmail.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "An error occurred.";
        }
      );
  },
});

export const { logout, setVeryuse } = authSlice.actions;
export default authSlice.reducer;