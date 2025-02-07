import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
import { getTexts } from "../languagehome/languagehome";


export interface FethcLanguagesProps {
  id?: number;
  name: string;
  image: string
}


export const fetchLanguages = createAsyncThunk(
  "language/fetchLanguages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/Language/GetAll"
      );
      const languages = response.data.data.map((item: FethcLanguagesProps) => ({
        id: item.id,
        name: item.name,
        image: item.image
      }));

      return languages;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch languages");
    }
  }
);
export const createUserLanguage = createAsyncThunk(
  'create/createUserLanguage',
  async (params: { sourceLanguageId: number; translationLanguageId: number }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/UserLanguage/Create",
        {
          sourceLanguageId: params.sourceLanguageId,
          translationLanguageId: params.translationLanguageId,
        }
      );
      thunkAPI.dispatch(fetchLanguages())
      thunkAPI.dispatch(getTexts())
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
);