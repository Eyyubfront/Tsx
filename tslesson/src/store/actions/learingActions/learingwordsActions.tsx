import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';

export interface WordsItem {
    id: number;
    source?: string;
    translation?: string;
    isLearningNow: boolean;
}

export const wordfetchTexts = createAsyncThunk('learningNow/wordfetchTexts', async ({ page, pageSize }: { page: number; pageSize: number }, thunkAPI) => {
    try {
        const response = await axiosInstance.get(`/UserVocabulary/GetPaginatedByUserId?page=${page}&pageSize=${pageSize}`);
        return response.data.data;  
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const saveText = createAsyncThunk('learningWords/saveText', async (item: WordsItem, thunkAPI) => {
    try {
        const response = await axiosInstance.post('/UserVocabulary/Create', item);
         thunkAPI.dispatch(wordfetchTexts({ page: 1, pageSize: 10 }));
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const removeText = createAsyncThunk('learningNow/removeText', async ({ id }: { id: number }, thunkAPI) => {
    try {
        await axiosInstance.delete(`/UserVocabulary/Delete/${id}`);
        thunkAPI.dispatch(wordfetchTexts({ page: 1, pageSize: 10 }));
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const updateText = createAsyncThunk('learningNow/updateText', async ({ id, source, translation }: { id: number; source: string; translation: string }, thunkAPI) => {
    try {
        const response = await axiosInstance.put("/Update", {
            id,
            source,
            translation
        });
        thunkAPI.dispatch(wordfetchTexts({ page: 1, pageSize: 10 }));
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});