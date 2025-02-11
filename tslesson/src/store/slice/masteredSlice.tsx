import { createSlice } from "@reduxjs/toolkit";

import { getAllMastered, MasteredPropsUse } from "../actions/masteredActions/masteredActions";

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
                state.mastereds = action.payload;
            })
            .addCase(getAllMastered.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
          
    },
});

export default categorySlice.reducer;
export const { } = categorySlice.actions;