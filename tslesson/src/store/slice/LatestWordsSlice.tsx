import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TextItem {
    id: number;
    text: string;
}

interface LatestWordsState {
    items: TextItem[];
}

const initialState: LatestWordsState = {
    items: [],
};

const latestWordsSlice = createSlice({
    name: 'latestWords',
    initialState,
    reducers: {
        saveText: (state, action: PayloadAction<TextItem>) => {
            state.items.push(action.payload);
        },
        removeText: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateText: (state, action: PayloadAction<TextItem>) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
    },
});

export const { saveText, removeText, updateText } = latestWordsSlice.actions;

export default latestWordsSlice.reducer;















