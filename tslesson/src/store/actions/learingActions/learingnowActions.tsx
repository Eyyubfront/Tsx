import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';

export interface TextItem {
    id: number;
    userId: string;
    source?: string;
    translation?: string;
    sourceLanguageId?: number;
    translationLanguageId?: number;
    isLearningNow: boolean;
}

export const fetchTexts = createAsyncThunk('learningNow/fetchTexts', async (userId: string, thunkAPI) => {
    try {
        const response = await axiosInstance.get(`/UserVocabulary/GetAllLearningByUserId?userId=${userId}`);
        console.log("datafetch",response.data.data);
        return response.data.data; 
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const saveText = createAsyncThunk('learningNow/saveText', async (item: TextItem, thunkAPI) => {
    try {
        const response = await axiosInstance.post('/UserVocabulary/Create', item);
        thunkAPI.dispatch(fetchTexts(item.userId)); 
        console.log("savetext",response.data);
        return response.data;
        
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});


export const removeText = createAsyncThunk('learningNow/removeText', async (id: number, thunkAPI) => {
    try {
        await axiosInstance.delete(`/UserVocabulary/Delete/${id}`);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});


export const updateText = createAsyncThunk('learningNow/updateText', async ({ id, source, translation, userId }: { id: number; source: string; translation: string; userId: string }, thunkAPI) => {
    try {
        const response = await axiosInstance.put("/Update", {
            id,
            source,
            translation
        });

        thunkAPI.dispatch(fetchTexts(userId));

        return { ...response.data }; 
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});