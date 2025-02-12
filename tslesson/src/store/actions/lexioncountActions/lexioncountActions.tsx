import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";


export interface LexionProps {
    id?: number,
    totalCount: number,
    masteredCount: number,
    learningCount: number
}

export const lexioncountfetch = createAsyncThunk(
    "language/lexioncountfetch",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/UserVocabulary/GetCountByUserId");
            const lexionscards = response.data.data;
            return lexionscards;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);