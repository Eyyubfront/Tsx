import { createSlice } from '@reduxjs/toolkit';
import { wordfetchTexts, saveText, removeText, updateText, selecetwordText, fetchSearchResults } from '../actions/learingActions/learingwordsActions';

interface wordsitems {
    id: number;
    source?: string;
    translation?: string;
    isLearningNow: boolean;
    isMastered: boolean;
}

export interface LearingWords {
    items: wordsitems[];
    pageCount: number;
    
}

interface LearningWordState {
    items: LearingWords;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: LearningWordState = {
    items: {
        items: [],
        pageCount: 0
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
            })


            .addCase(fetchSearchResults.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;        
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch search results';
            });
    },
});

export const { resetState } = LatestWordsSlice.actions;
export default LatestWordsSlice.reducer;
