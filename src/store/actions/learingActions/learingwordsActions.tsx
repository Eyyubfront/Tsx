import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';
import { fetchTexts } from './learingnowActions';
import { lexioncountfetch } from '../lexioncountActions/lexioncountActions';

export interface WordsItem {
    id: number | null;
    source?: string;
    translation?: string;
    isLearningNow?: boolean;

}
export interface IWordsitem extends WordsItem {
    isMastered?: boolean
}

export const wordfetchTexts = createAsyncThunk('learingWords/wordfetchTexts', async ({ page, pageSize, isGrouped }: { page: number; pageSize: number, isGrouped: boolean }, thunkAPI) => {
    try {
        const response = await axiosInstance.get(`/UserVocabulary/GetPaginatedByUserId?page=${page}&pageSize=${pageSize}&isGrouped=${isGrouped}`);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const saveText = createAsyncThunk('learningWords/saveText', async (item: WordsItem, thunkAPI) => {
    try {
        const response = await axiosInstance.post('/UserVocabulary/Create', item);
        thunkAPI.dispatch(wordfetchTexts({ page: 1, pageSize: 10, isGrouped: true }));
        thunkAPI.dispatch(lexioncountfetch());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const selecetwordText = createAsyncThunk(
    "learningWords/selecetwordText",
    async ({ id, page }: { id: number, page: number }, thunkAPI) => {
        try {
            const response = await axiosInstance.post(`/UserVocabulary/SetLearning/${id}`);
            thunkAPI. dispatch(wordfetchTexts({ page: page, pageSize: 10, isGrouped: false }));
            thunkAPI. dispatch(fetchTexts({ page: 1, pageSize: 10 }));
            thunkAPI. dispatch(lexioncountfetch());
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const removeText = createAsyncThunk('learingWords/removeText', async ({ id }: { id: number }, thunkAPI) => {
    try {
        await axiosInstance.delete(`/UserVocabulary/Delete/${id}`);
        thunkAPI.dispatch(wordfetchTexts({ page: 1, pageSize: 10, isGrouped: false }));
        thunkAPI.dispatch(fetchTexts({ page: 1, pageSize: 10 }));
        thunkAPI.dispatch(lexioncountfetch());
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateText = createAsyncThunk('learingWords/updateText', async ({ id, source, translation }: { id: number; source: string; translation: string }, thunkAPI) => {
    try {
        const response = await axiosInstance.put("/UserVocabulary/Update", {
            id,
            source,
            translation
        });
        thunkAPI.dispatch(wordfetchTexts({ page: 1, pageSize: 10, isGrouped: false }));
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});







export const fetchSearchResults = createAsyncThunk('languageHome/fetchSearchResults', async ({ page, pageSize, searchText, isGrouped }: { page: number; pageSize: number, searchText: string, isGrouped: boolean }, thunkAPI) => {
    try {
        const response = await axiosInstance.get(`/UserVocabulary/Search?searchText=${searchText}&page=${page}&pageSize=${pageSize}&isGrouped=${isGrouped}`);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});



export const deletAll = createAsyncThunk('learingWords/deletAll', async (_, thunkAPI) => {
    try {
        const response = await axiosInstance.delete(`/UserVocabulary/DeleteAll`);
        thunkAPI.dispatch(wordfetchTexts({ page: 1, pageSize: 10, isGrouped: false }));
        thunkAPI.dispatch(lexioncountfetch());
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});