import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from './axiosInstance';
import axios from 'axios';
import { wordfetchTexts } from './learingActions/learingwordsActions';


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
      localStorage.setItem('userId', response.data.data.userId);
      return { ...response.data, userId };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (request: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await axios.post<AuthResponse>(
        'https://learn-language-api.azurewebsites.net/api/Register',
        request
      );

      const userId = response.data.data.userId;

      return { ...response.data, userId };

    } catch (error: any) {
      return rejectWithValue(" Alredy email ");
    }
  }
);


export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        '/RefreshToken',
        {
          refreshToken: localStorage.getItem("refreshToken")
        }

      );
      console.log("refresh", localStorage.getItem("refreshToken"));

      localStorage.setItem('token', response.data.data.accessToken);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete('/DeleteUser');
      return response.data;
    } catch (error) {

      return rejectWithValue(error);
    }
  }
);


export const excelfilefetch = createAsyncThunk(
  'home/excelfilefetch',
  async (_, { rejectWithValue }) => {
    try {

      const response = await axiosInstance.get('/UserVocabulary/DownloadTemplate', {
        responseType: 'blob'
      });

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Fayl error dowland");
    }
  }
);




export const addformFile = createAsyncThunk('home/addformFile', async (file: File, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append("file", file)
    const response = await axiosInstance.post('/UserVocabulary/AddFromFile', formData);
    thunkAPI.dispatch(wordfetchTexts({ page: 1, pageSize: 10 }));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("User vocabulary already exists")
  }
});


export const sendIdToken = createAsyncThunk(
  'auth/sendIdToken',  
  async (idToken: string, { rejectWithValue }) => {
    try {
  
      const response = await axiosInstance.post(
        '/GoogleAuth',
         {idToken} 
      );
      return  response.data.data; 
    } catch (error) {
      return rejectWithValue('Bir hata oluştu');
    }
  }
);





export const changeVisibility = createAsyncThunk(
  'auth/changeVisibility',
  async (_, thunkAPI) => {
      try {
          const response = await axiosInstance.post(
              '/ChangeQuizVisibility'
          );
          return response.data; 
      } catch (error) {
          return thunkAPI.rejectWithValue(error);
      }
  }
);


