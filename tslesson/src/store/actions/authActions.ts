
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
    email: string;
    password: string;
}

export const login = createAsyncThunk(
    'auth/login',
    async (data: User, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://language-learn-axe5epeugbbqepez.uksouth-01.azurewebsites.net/api/Login', data);
            return response.data;
        } catch (error) {
            return rejectWithValue('An error occurred');
        }
    }
);





export const register = createAsyncThunk(
    'auth/register',
    async (data: User, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://language-learn-axe5epeugbbqepez.uksouth-01.azurewebsites.net/api/Register', data);
            return response.data;
        } catch (error) {
            return rejectWithValue('An error occurred');
        }
    }
);