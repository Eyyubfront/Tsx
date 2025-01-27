import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';

export interface WordsItem {
    id: number;
    userId: string;
    source?: string;
    translation?: string;
    sourceLanguageId?: number;
    translationLanguageId?: number;
    isLearningNow:boolean
}

export const wordfetchTexts = createAsyncThunk('learningNow/wordfetchTexts', async (userId: string, thunkAPI) => {
    try {
        const response = await axiosInstance.get(`/UserVocabulary/GetAllByUserId?userId=${userId}`);
        console.log("words",response.data);
        return response.data.data;
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const saveText = createAsyncThunk('learningNow/saveText', async (item: WordsItem, thunkAPI) => {
    try {
        const response = await axiosInstance.post('/UserVocabulary/Create', item);

        thunkAPI.dispatch(wordfetchTexts(item.userId));
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const removeText = createAsyncThunk('learningNow/removeText', async ({ id }: { id: number}, thunkAPI) => {
    try {
        const response = await axiosInstance.delete(`/UserVocabulary/Delete/${id}`);
        return response.status;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const updateText = createAsyncThunk('learningNow/updateText', async ({ id, source, translation, userId }: { id: number; source: string; translation: string; userId: string }, thunkAPI) => {
    try {
        const response = await axiosInstance.put("/Update", {
            id: id,
            source: source,
            translation: translation
        });

        thunkAPI.dispatch(wordfetchTexts(userId));
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});