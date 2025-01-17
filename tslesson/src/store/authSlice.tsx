import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, register } from './actions/authActions'; 

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null; 
  loading: boolean;
  error: string | null;
  isAuth: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null; 
      state.isAuth = false; 
      localStorage.removeItem('token'); 
      localStorage.removeItem('refreshToken'); 
    },
    setToken(state, action: PayloadAction<{ token: string; refreshToken: string }>) {
      state.accessToken = action.payload.token; 
      state.refreshToken = action.payload.refreshToken; 
      state.isAuth = true; 
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
        localStorage.setItem('token', action.payload.accessToken); 
        localStorage.setItem('refreshToken', action.payload.refreshToken);
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
      .addCase(register.fulfilled, (state) => {
        state.loading = false; 
  
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false; 
        state.error = action.payload as string; 
        state.isAuth = false; 
      });
  },
});


export const { setToken, logout } = authSlice.actions;

export default authSlice.reducer;