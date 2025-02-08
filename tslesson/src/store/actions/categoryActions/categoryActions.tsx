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
    "home/categoryfetch",
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
      } catch (error) {
        return rejectWithValue("Failed to fetch category data");
      }
    }
  );

  export const categoryIdfetch = createAsyncThunk(
    "home/categoryIdfetch",
    async (categoryId: number, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(
          `/Vocabulary/GetAllByCategoryId?categoryId=${categoryId}`
        );
 
        
        return response.data.data;
      } catch (error) {
        return rejectWithValue("Failed to fetch category data");
      }
    }
  );
