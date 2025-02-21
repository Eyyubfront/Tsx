import { createSlice } from "@reduxjs/toolkit";
import { getTexts, selecetlangaugesave } from "../actions/languagehome/languagehome";

interface TextItem {
    text: string;
    id: number;
    sourceLanguage: string;
    translationLanguage: string;
    isDefault: boolean;
}

interface TextState {
    texts: TextItem[];
    defaultText: TextItem | null;
    selectedLanguageId: number | null;
    loading: boolean;
    error: string | null;
    isOpen?: boolean;
    isDialogOpen: boolean, 
}

const initialState: TextState = {
    texts: [],
    defaultText: null,
    selectedLanguageId: null,
    loading: false,
    error: null,
    isOpen: false,
    isDialogOpen: false, 
};

const LanguageHomeSlice = createSlice({
    name: "LanguagetextData",
    initialState,
    reducers: {
        setSelectedLanguage(state, action) {
            state.selectedLanguageId = action.payload;
        },
        openQuizModal: (state) => {
            state.isOpen = true;
        },
        closeQuizModal: (state) => {
            state.isOpen = false;
        },
        openDialog: (state) => {
            state.isDialogOpen = true;
        },

        closeDialog: (state) => { 
            state.isDialogOpen = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTexts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTexts.fulfilled, (state, action) => {
                state.loading = false;
                state.texts = action.payload;
                state.defaultText = action.payload.find((t: { isDefault: boolean }) => t.isDefault);
            })
            .addCase(getTexts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(selecetlangaugesave.pending, (state) => {
                state.loading = true;
                state.error = null;
                console.log("pending")
            })
            .addCase(selecetlangaugesave.fulfilled, (state) => {
                state.loading = false;

            })
            .addCase(selecetlangaugesave.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;

            });
    },
});

export const { setSelectedLanguage, openQuizModal, closeQuizModal, openDialog, closeDialog } = LanguageHomeSlice.actions;

export default LanguageHomeSlice.reducer;