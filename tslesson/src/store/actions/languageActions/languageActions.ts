import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../axiosInstance";

export const fetchLanguages = createAsyncThunk(
  "language/fetchLanguages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/Language/GetAll"
      );
      const languages = response.data.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        image: item.image
      }));
      console.log(languages);


      return languages;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch languages");
    }
  }
);
export const createUserLanguage = createAsyncThunk(
  'userLanguage/createUserLanguage',
  async (params: { userId: string; sourceLanguageId: number; translationLanguageId: number }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/UserLanguage/Create",
        {
          userId: params.userId,
          sourceLanguageId: params.sourceLanguageId,
          translationLanguageId: params.translationLanguageId,
        }
      );

      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
);