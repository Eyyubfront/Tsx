import { createSlice } from "@reduxjs/toolkit";
import { categoryfetch, categoryIdfetch, CategoryProps } from "../actions/categoryActions/categoryActions";



interface CategoryState {
    categories: CategoryProps[];
    categoryDetails: any | null; 
    status: "idle" | "loading" | "success" | "error";
    error: string | null;
}

const initialState: CategoryState = {
    categories: [],
    categoryDetails: null,
    status: "idle",
    error: null,
};




const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(categoryfetch.pending, (state) => {
                state.status = "loading";
            })
            .addCase(categoryfetch.fulfilled, (state, action) => {
                state.status = "success";
                state.categories = action.payload;
            })
            .addCase(categoryfetch.rejected, (state, action) => {
                state.status = "error";
                state.error = action.payload as string;
            })
            .addCase(categoryIdfetch.pending, (state) => {
                state.status = "loading";
            })
            .addCase(categoryIdfetch.fulfilled, (state, action) => {
                state.status = "success";
                state.categoryDetails = action.payload; 
            })
            .addCase(categoryIdfetch.rejected, (state, action) => {
                state.status = "error";
                state.error = action.payload as string;
            });;
    },
});

export default categorySlice.reducer;
export const { } = categorySlice.actions;