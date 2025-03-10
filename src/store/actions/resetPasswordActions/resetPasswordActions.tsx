import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ResetPasswordPayload {
  userId: string;
  newPassword: string;
}


export const resetPassword = createAsyncThunk<
  any, 
  ResetPasswordPayload, 
  { rejectValue: any } 
>(
  'auth/resetPassword',
  async ({ userId, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://learn-language-app.azurewebsites.net/api/ResetPassword', {
        userId,
        newPassword,
      });
      return response.data; 
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);