import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LearningTextState {
    items: { id: number; text: string }[];
}

const initialState: LearningTextState = {
    items: [],
};

const LearningNowSlice = createSlice({
    name: 'savedLearningNow',
    initialState,
    reducers: {
        saveText: (state, action: PayloadAction<{ id: number; text: string }>) => {
            const exists = state.items.some(item => item.id === action.payload.id);
            if (!exists) {
                state.items.push(action.payload);
            }
        },
        removeText: (state, action: PayloadAction<number>) => {
            console.log('Silme işlemi için id:', action.payload);
            state.items = state.items.filter(item => item.id !== action.payload);
            console.log('Yeni state:', state.items);
        },
        updateText: (state, action: PayloadAction<{ id: number; text: string }>) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index].text = action.payload.text; // Günücel metin
            } else {
                console.error('Güncellenecek metin bulunamadı', action.payload);
            }
        },
    },
});

export const { saveText, removeText, updateText } = LearningNowSlice.actions;
export default LearningNowSlice.reducer;