import { createSlice } from '@reduxjs/toolkit';
import { fetchTexts, removeText, updateText, learingnowsaveText } from '../actions/learingActions/learingnowActions';

interface items {
    id: number;
    source?: string;
    translation?: string;
    isLearningNow: boolean
}

export interface LearingNow {
    nowitems: items[],
    pageCount: number,
}

interface LearningNowState {
    items: LearingNow;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    isOpenNow: boolean;
}

const initialState: LearningNowState = {
    items: {
        nowitems: [],
        pageCount: 0
    },
    status: 'idle',
    error: null,
    isOpenNow: false,
};

const learningNowSlice = createSlice({
    name: 'learningNow',
    initialState,
    reducers: {
        resetState: () => initialState,
        CloseModalNow: (state) => {
            state.isOpenNow = !state.isOpenNow
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTexts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchTexts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items.nowitems = action.payload.items
                state.items.pageCount = action.payload.pageCount;

            })
            .addCase(fetchTexts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch texts';
            })

            .addCase(learingnowsaveText.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = action.payload as string

            })
            .addCase(learingnowsaveText.rejected, (state, action) => {
                state.error = action.payload as string
                state.isOpenNow = true;
            })
            .addCase(removeText.fulfilled, (state) => {
                state.status = 'succeeded';

            })

            .addCase(updateText.fulfilled, (state) => {
                state.status = 'succeeded';

            });
    },
});

export const { resetState, CloseModalNow } = learningNowSlice.actions;
export default learningNowSlice.reducer;