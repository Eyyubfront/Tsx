import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TextItem {
    id: number;
    text: string;
}

interface LearningNowState {
    items: TextItem[];
}

const initialState: LearningNowState = {
    items: [],
};

const learningNowSlice = createSlice({
    name: 'learningNow',
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

export const { saveText, removeText, updateText } = learningNowSlice.actions;

export default learningNowSlice.reducer;
