import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginUser } from '../userSlice'; 

export const refreshAccessToken = createAsyncThunk<
  { token: string; newRefreshToken: string }, 
  string, 
  { rejectValue: string }
>(
  'user/refreshAccessToken',
  async (refreshToken: string, { rejectWithValue, dispatch }) => {
    try {
  
      const response = await axios.post(
        'https://language-learn-axe5epeugbbqepez.uksouth-01.azurewebsites.net/api/RefreshToken',
        { refreshToken }
      );

  
      const { user, token, refreshToken: newRefreshToken } = response.data;

     
      dispatch(loginUser({ user, token, refreshToken: newRefreshToken }));

     
      return { token, newRefreshToken };
    } catch (error) {
      console.error('Refresh token request failed:', error);

      return rejectWithValue('Failed to refresh token');
    }
  }
);
