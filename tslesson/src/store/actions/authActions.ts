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
}

export const login = createAsyncThunk(
  'auth/login',
  async (request: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await axios.post<AuthResponse>(
        'https://language-learn-axe5epeugbbqepez.uksouth-01.azurewebsites.net/api/Login',
        request,
      
      );
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
        request,
     
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Error');
    }
  }
);