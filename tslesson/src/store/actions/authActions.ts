import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  data: {
    userId: string
  }
}

export const login = createAsyncThunk(
  'auth/login',
  async (request: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await axios.post<AuthResponse>(
        'https://language-learn-axe5epeugbbqepez.uksouth-01.azurewebsites.net/api/Login',
        request
      );
      console.log(request);
      
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      return response.data;
    } catch (error) {
      return rejectWithValue('Error');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (request: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await axios.post<AuthResponse>(
        'https://language-learn-axe5epeugbbqepez.uksouth-01.azurewebsites.net/api/Register',
        request
      );
      console.log(request);
      
      const userId = response.data.data.userId; 
      console.log(response);
      
      return { ...response.data, userId }; 
      
    } catch (error) {
      return rejectWithValue('Error');
    }
  }
);
