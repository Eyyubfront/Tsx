import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

 export interface CategoryProps{
    id:number,
    name: string,
    image: string;
    masteredCount:number,
    vocabularyCount:number
}

export const categoryfetch = createAsyncThunk(
    "language/categoryfetch",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(
          "/Category/GetAllByUserId"
        );
        const category = response.data.data.map((item: CategoryProps) => ({
          id: item.id,
          name: item.name,
          image: item.image,
          masteredCount:item.masteredCount,
          vocabularyCount:item.vocabularyCount
        }));
        return category;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || "Failed to fetch category data");
      }
    }
  );