import { createSlice } from '@reduxjs/toolkit';
import { wordfetchTexts, saveText, removeText, updateText } from '../actions/learingActions/learingwordsActions';


interface wordsitems {
    id: number;
    source?: string;
    translation?: string;
    isLearningNow: boolean
}

export interface LearingWords {
    items: wordsitems[],
    count: number,
}

interface LearningWordState {
    items: LearingWords;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: LearningWordState = {
    items: {
        items: [],
        count: 0
    },
    status: 'idle',
    error: null,
};

const LatestWordsSlice = createSlice({
    name: 'latestWords',
    initialState,
    reducers: {
        resetState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(wordfetchTexts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(wordfetchTexts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload; 
            })
            .addCase(wordfetchTexts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch texts';
            })
   
            .addCase(saveText.fulfilled, (state, action) => {
                state.status = 'succeeded';
         
                state.items.items.push(action.payload);
            })
     
            .addCase(removeText.fulfilled, (state, action) => {
                state.status = 'succeeded';
             
                state.items.items = state.items.items.filter(item => item.id !== action.payload); 
          
            })

            .addCase(updateText.fulfilled, (state, action) => {
                state.status = 'succeeded';
      
                const updatedIndex = state.items.items.findIndex(item => item.id === action.payload.id);
                if (updatedIndex !== -1) {
                    state.items.items[updatedIndex] = action.payload;
                }
            });
    },
});

export const { resetState } = LatestWordsSlice.actions;
export default LatestWordsSlice.reducer;

