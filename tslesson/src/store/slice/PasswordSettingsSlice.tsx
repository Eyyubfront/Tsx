
import { createSlice } from '@reduxjs/toolkit';

import { passwordChecksave } from '../actions/passwordsettingsActions/passwordsettingsActions';


interface ForgotPasswordState {
    isLoading: boolean;
    error: string | null;
    success: boolean;
  }

const initialState: ForgotPasswordState = {
  isLoading: false,
  error: null ,
  success: false,
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
        state.error = action.payload as string; 
      });
  },
});

export const { resetState } = PasswordSettingsSlice.actions;
export default PasswordSettingsSlice.reducer;