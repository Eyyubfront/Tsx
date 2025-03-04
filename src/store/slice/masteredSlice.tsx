import { createSlice } from "@reduxjs/toolkit";

import { getAllMastered, masteredisfetch, MasteredPropsUse } from "../actions/masteredActions/masteredActions";
import {  storycreatgptcreat } from "../actions/authActions";

interface MasteredProps{
    mastereds: MasteredPropsUse[],
    loading:boolean;
    error:string|null;
}



const initialState: MasteredProps = {
    mastereds: [],
    loading: false,
    error: null,
};




const categorySlice = createSlice({
    name: "mastered",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllMastered.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllMastered.fulfilled, (state, action) => {
                state.loading = false;
                state.mastereds = action.payload.items;
            })
            .addCase(getAllMastered.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(masteredisfetch.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(masteredisfetch.fulfilled, (state) => {
                state.loading = false;
            
              })
              .addCase(masteredisfetch.rejected, (state, action) => {
                state.loading = false;  
                state.error = action.payload as string;
              })
              .addCase(storycreatgptcreat.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(storycreatgptcreat.fulfilled, (state) => {
                state.loading = false;
              
              })
              .addCase(storycreatgptcreat.rejected, (state, action) => {
                state.loading = false;  
                state.error = action.payload as string;
              })
          
    },
});

export default categorySlice.reducer;
export const { } = categorySlice.actions;