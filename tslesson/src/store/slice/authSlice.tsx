import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, register, refreshToken } from '../actions/authActions'; 

interface AuthState {
  refreshToken: string | null; 
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  isAuth: boolean;
  userId: string | null;  
}

const initialState: AuthState = {
  refreshToken: null,
  accessToken: null,
  loading: false,
  error: null,
  isAuth: false,
  userId: null,  
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
    setToken(state, action: PayloadAction<{ token: string; refreshToken: string; userId: string }>) {
      state.accessToken = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuth = true;
      state.userId = action.payload.userId; 
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
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
        state.isAuth = true;
        state.userId = action.payload.userId;  
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
      .addCase(refreshToken.fulfilled, (state) => {
        state.loading = false;
        state.isAuth = true;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuth = false;
      });
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;