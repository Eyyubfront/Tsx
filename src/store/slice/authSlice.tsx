import { createSlice } from '@reduxjs/toolkit';
import { login, register, refreshToken, deleteUser, excelfilefetch, addformFile, sendIdToken, changeVisibility, getuserSettings } from '../actions/authActions';
import { sendForgotPasswordEmail } from '../actions/forgotPasswordActions/forgotPasswordActions';

interface AuthState {
  refreshToken: string | null;
  userId: string | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  isAuth: boolean | null;
  success: boolean;
  veriyuse: boolean;
  full: boolean;
  datagoogle: boolean;
  quizHidden: boolean;
  notificationDisabled: boolean;
}

const initialState: AuthState = {
  refreshToken: null,
  accessToken: null,
  userId: null,
  loading: false,
  error: null,
  success: false,
  isAuth: null,
  veriyuse: false,
  full: false,
  datagoogle: false,
  quizHidden: JSON.parse(localStorage.getItem("quizHidden")|| "false"),
  notificationDisabled: false
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
    },
    setisAuth(state) {
      state.isAuth =true
    },
    toggleQuizHidden(state){
      state.quizHidden =!state.quizHidden
      localStorage.setItem("quizHidden",JSON.stringify(state.quizHidden))
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
      .addCase(excelfilefetch.pending, (state, action: any) => {
        state.loading = true;
        state.full = action.payload
      })
      .addCase(excelfilefetch.fulfilled, (state) => {
        state.loading = false;

      })
      .addCase(excelfilefetch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(sendIdToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendIdToken.fulfilled, (state, action: any) => {
        state.loading = false;
        state.isAuth = true;
        state.userId = action.payload.userId;
        state.veriyuse = true;
      })
      .addCase(sendIdToken.rejected, (state, action) => {
        state.loading = false;
        state.veriyuse = false;
        state.error = action.payload as string;
      })
      .addCase(addformFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(addformFile.fulfilled, (state) => {
        state.loading = false;

      })
      .addCase(addformFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getuserSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getuserSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.quizHidden = action.payload.quizHidden;
        state.notificationDisabled = action.payload.notificationDisabled;
      })
      .addCase(getuserSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(changeVisibility.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeVisibility.fulfilled, (state) => {
        state.loading = false;
        state.success=true
 
      })
      .addCase(changeVisibility.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuth = false;
        state.accessToken = null;
        state.refreshToken = null;
        state.userId = null;
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload.userId;
        state.isAuth = false;
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
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      );
  },
});

export const { logout,toggleQuizHidden, setVeryuse,setisAuth } = authSlice.actions;
export default authSlice.reducer;