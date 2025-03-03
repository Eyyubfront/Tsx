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
    } catch (error) {
      return rejectWithValue(error);
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
    } catch (err: any) {

      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create language');
    }
  }
);

export const removeLanguage = createAsyncThunk('language/removeLanguage', async (id: number, thunkAPI) => {
  try {
    await axiosInstance.delete(`/UserLanguage/Delete/${id}`);

    thunkAPI.dispatch(getTexts())
  } catch (error: any) {
    return thunkAPI.rejectWithValue("Selected user language cannot be deleted");
  }
});

