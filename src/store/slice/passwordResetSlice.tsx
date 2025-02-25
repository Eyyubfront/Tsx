
import { createSlice } from '@reduxjs/toolkit';
import { resetPassword } from '../actions/resetPasswordActions/resetPasswordActions';

const initialState = {
  isLoading: false,
  error: null,
  success: false,
};

const passwordResetSlice = createSlice({
  name: 'passwordReset',
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
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true; 
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
      });
  },
});

export const { resetState } = passwordResetSlice.actions;
export default passwordResetSlice.reducer;