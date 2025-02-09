import {  createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';


export const addFromVocabulary = createAsyncThunk(
    'userVocabulary/addFromVocabulary',
    async (vocabularyId: number, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                '/UserVocabulary/AddFromVocabulary',
                {
                    vocabularyId: vocabularyId
                }
            );
            return response.data; 
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response ? error.response.data : 'Error adding vocabulary');
        }
    }
);


