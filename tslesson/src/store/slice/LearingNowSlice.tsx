import { createSlice } from '@reduxjs/toolkit';
import { fetchTexts, saveText, removeText, updateText, TextItem } from '../actions/learingActions/learingnowActions';

interface LearningNowState {
    items: TextItem[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: LearningNowState = {
    items: [],
    status: 'idle',
    error: null,
};

const learningNowSlice = createSlice({
    name: 'learningNow',
    initialState,
    reducers: {
        resetState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTexts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchTexts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchTexts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch texts';
            })
            .addCase(saveText.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(saveText.fulfilled, (state,action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(saveText.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to save text';
            })
            .addCase(removeText.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(removeText.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(removeText.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to remove text';
            })
            .addCase(updateText.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateText.fulfilled, (state) => {
                state.status = 'succeeded';
                
            })
            .addCase(updateText.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to update text';
            });
    },
});

export const { resetState } = learningNowSlice.actions;
export default learningNowSlice.reducer;