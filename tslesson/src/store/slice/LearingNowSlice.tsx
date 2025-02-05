import { createSlice } from '@reduxjs/toolkit';
import { fetchTexts, saveText, removeText, updateText } from '../actions/learingActions/learingnowActions';

interface items {
    id: number;
    source?: string;
    translation?: string;
    isLearningNow: boolean
}

export interface LearingNow {
    nowitems: items[],
    count: number,
}

interface LearningNowState {
    items: LearingNow;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: LearningNowState = {
    items: {
        nowitems: [],
        count: 0
    },
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
                state.items.nowitems = action.payload.items,
                state.items.count= action.payload.count
            })
            .addCase(fetchTexts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch texts';
            })
   
            .addCase(saveText.fulfilled, (state, action) => {
                state.status = 'succeeded';
         
                state.items.nowitems.push(action.payload);

            })
     
            .addCase(removeText.fulfilled, (state, action) => {
                state.status = 'succeeded';
             
                state.items.nowitems = state.items.nowitems.filter(item => item.id !== action.payload); 
             
            })

            .addCase(updateText.fulfilled, (state, action) => {
                state.status = 'succeeded';
      
                const updatedIndex = state.items.nowitems.findIndex(item => item.id === action.payload.id);
                if (updatedIndex !== -1) {
                    state.items.nowitems[updatedIndex] = action.payload;
                }
            });
    },
});

export const { resetState } = learningNowSlice.actions;
export default learningNowSlice.reducer;