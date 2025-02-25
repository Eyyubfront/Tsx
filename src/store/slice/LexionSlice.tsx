import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { lexioncountfetch, LexionProps } from "../actions/lexioncountActions/lexioncountActions";

interface InitialState {
    lexionCards: LexionProps;
    loading: boolean;
    error: string | null;
}

const initialState: InitialState = {
    lexionCards: {
        totalCount: 0,
        learningCount: 0,
        masteredCount: 0
    },
    loading: false,
    error: null,
};

const lexionSlice = createSlice({
    name: "lexioncard",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(lexioncountfetch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(lexioncountfetch.fulfilled, (state, action: PayloadAction<LexionProps>) => {
                state.loading = false;
                state.lexionCards = action.payload;
            })
            .addCase(lexioncountfetch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});



export default lexionSlice.reducer;
