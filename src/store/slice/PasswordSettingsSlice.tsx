import { createSlice } from '@reduxjs/toolkit';
import { intervalfetch, passwordChecksave } from '../actions/passwordsettingsActions/passwordsettingsActions';

interface ForgotPasswordState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  isModalopen: boolean;
  intervals:Array<{id:number,name:string,minutes:number}>
}

const initialState: ForgotPasswordState = {
  isLoading: false,
  error: null,
  success: false,
  isModalopen: false,    
  intervals:[]
};

const PasswordSettingsSlice = createSlice({
  name: 'passwordchecksettings',
  initialState,
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
    CloseModalsopen: (state) => {
      state.isModalopen = !state.isModalopen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(passwordChecksave.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(passwordChecksave.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(passwordChecksave.rejected, (state, action) => {
        state.isLoading = false;
        state.isModalopen = true;
        state.error = action.payload as string;
      })
      .addCase(intervalfetch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(intervalfetch.fulfilled, (state,action) => {
        state.isLoading = false;
        state.error = null;
        state.intervals = action.payload;
      })
      .addCase(intervalfetch.rejected, (state, action) => {
        state.isLoading = false;
        state.isModalopen = true;
        state.error = action.payload as string;
      });
  },
});

export const { resetState, CloseModalsopen } = PasswordSettingsSlice.actions;
export default PasswordSettingsSlice.reducer;