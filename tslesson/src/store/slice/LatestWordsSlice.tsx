import { createSlice } from '@reduxjs/toolkit';
import { wordfetchTexts, saveText, removeText, updateText, selecetwordText } from '../actions/learingActions/learingwordsActions';


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
   
            .addCase(saveText.fulfilled, (state) => {
                state.status = 'succeeded';
            })
          
            .addCase(selecetwordText.fulfilled, (state) => {
                state.status = 'succeeded';
     
            })
            .addCase(selecetwordText.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(removeText.fulfilled, (state) => {
                state.status = 'succeeded';    
            })

            .addCase(updateText.fulfilled, (state) => {
                state.status = 'succeeded';
            });
    },
});

export const { resetState } = LatestWordsSlice.actions;
export default LatestWordsSlice.reducer;

