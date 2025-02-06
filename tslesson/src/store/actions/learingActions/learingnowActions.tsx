import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';
import { lexioncountfetch } from '../lexioncountActions/lexioncountActions';
import { wordfetchTexts } from './learingwordsActions';

export interface TextItem {
    id?: number;
    source?: string;
    translation?: string;
    isLearningNow: boolean;
}

export const fetchTexts = createAsyncThunk('learningNow/fetchTexts', async (_,thunkAPI) => {
    try {
        const response = await axiosInstance.get('/UserVocabulary/GetAllLearningByUserId');
        return response.data.data; 
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response ? error.response.data : 'Error fetching texts');
    }
});

export const learingnowsaveText = createAsyncThunk('learningNow/saveText', async (item: TextItem, thunkAPI) => {
    try {
        const response = await axiosInstance.post('/UserVocabulary/Create', item);
        thunkAPI.dispatch(fetchTexts());
        thunkAPI.dispatch(lexioncountfetch())
        thunkAPI.dispatch(wordfetchTexts())
        return response.data;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response ? err.response.data : 'Error saving text');
    }
});

export const removeText = createAsyncThunk('learningNow/removeText', async (id: number, thunkAPI) => {
    try {
        await axiosInstance.delete(`/UserVocabulary/Delete/${id}`);
        thunkAPI.dispatch(fetchTexts());
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response ? err.response.data : 'Error removing text');
    }
});

export const updateText = createAsyncThunk('learningNow/updateText', async ({ id, source, translation }: { id: number; source: string; translation: string }, thunkAPI) => {
    try {
        const response = await axiosInstance.put("/UserVocabulary/Update", {
            id,
            source,
            translation
        });
        thunkAPI.dispatch(fetchTexts());
        return response.data; 
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response ? err.response.data : 'Error updating text');
    }
});