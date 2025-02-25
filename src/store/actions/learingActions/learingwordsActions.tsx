import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';
import { fetchTexts } from './learingnowActions';
import { lexioncountfetch } from '../lexioncountActions/lexioncountActions';

export interface WordsItem {
    id: number|null;
    source?: string;
    translation?: string;
    isLearningNow?: boolean;
}
export interface IWordsitem extends WordsItem {
    isMastered?: boolean
}

export const wordfetchTexts = createAsyncThunk('learingWords/wordfetchTexts', async ({ page, pageSize }: { page: number; pageSize: number }, thunkAPI) => {
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
        thunkAPI.dispatch(lexioncountfetch());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const selecetwordText = createAsyncThunk(
    "learningWords/selecetwordText",
    async (id: number, { rejectWithValue, dispatch }) => {
        try {
            const response = await axiosInstance.post(`/UserVocabulary/SetLearning/${id}`);
            dispatch(wordfetchTexts({ page: 1, pageSize: 10 }));
            dispatch(fetchTexts({ page: 1, pageSize: 10 }));
            dispatch(lexioncountfetch());
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


export const removeText = createAsyncThunk('learingWords/removeText', async ({ id }: { id: number }, thunkAPI) => {
    try {
        await axiosInstance.delete(`/UserVocabulary/Delete/${id}`);
        thunkAPI.dispatch(wordfetchTexts({ page: 1, pageSize: 10 }));
        thunkAPI.dispatch(fetchTexts({ page: 1, pageSize: 10 }));
        thunkAPI.dispatch(lexioncountfetch());
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateText = createAsyncThunk('learingWords/updateText', async ({ id, source, translation }: { id: number; source: string; translation: string }, thunkAPI) => {
    try {
        const response = await axiosInstance.put("/Update", {
            id,
            source,
            translation
        });
        thunkAPI.dispatch(wordfetchTexts({ page: 1, pageSize: 10 }));
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});