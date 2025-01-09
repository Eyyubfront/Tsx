import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LastTextState {
    items: string[];
}

const initialState: LastTextState = {
    items: [],
};

const LatestWordsSlice = createSlice({
    name: 'savedLastaddWords',
    initialState,
    reducers: {
        saveText: (state, action: PayloadAction<string>) => {
            if (!state.items.includes(action.payload)) {
                state.items.push(action.payload);
            }
        },
        removeText: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item !== action.payload);
        },
    },
});

export const { saveText, removeText } = LatestWordsSlice.actions;
export default LatestWordsSlice.reducer;