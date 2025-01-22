import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from './axiosInstance';

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
    userId: string;
    accessToken: string;
    refreshToken: string;
  }
}
export const login = createAsyncThunk(
  'auth/login',
  async (request: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        '/Login',
        request
      );
      const userId = response.data.data.userId;

      localStorage.setItem('token', response.data.data.accessToken);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      return { ...response.data, userId };
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
        '/Register',
        request
      );


      const userId = response.data.data.userId;

      return { ...response.data, userId };

    } catch (error) {
      return rejectWithValue('Error');
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post<AuthResponse>(
        '/RefreshToken',
        {
          refreshToken: localStorage.getItem("refreshToken")
        }
      );
      localStorage.setItem('token', response.data.data.accessToken);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      return response.data;
    } catch (error) {
      return rejectWithValue('Error refreshing token');
    }
  }
);