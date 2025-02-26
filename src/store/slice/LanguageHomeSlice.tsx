import { createSlice } from "@reduxjs/toolkit";
import { getInitialLanguage, getTexts, selecetlangaugesave } from "../actions/languagehome/languagehome";

interface TextItem {
    text: string;
    id: number;
    sourceLanguage: string;
    translationLanguage: string;
    isDefault: boolean;
    isSwapped?: boolean;

}

interface TextState {
    texts: TextItem[];
    defaultText: TextItem | null;
    selectedLanguageId: number | null;
    loading: boolean;
    error: string | null;
    isOpen?: boolean;
    isDialogOpen: boolean,
    isDialogOpenMastered: boolean,
    datasetselected: any
}

const initialState: TextState = {
    texts: [],
    defaultText: null,
    selectedLanguageId: null,
    loading: false,
    error: null,
    isOpen: false,
    isDialogOpen: false,
    isDialogOpenMastered: false,
    datasetselected: {}
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

        openDialogMastered: (state) => {
            state.isDialogOpenMastered = true;
        },

        closeDialogMastered: (state) => {
            state.isDialogOpenMastered = false;
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
                state.datasetselected = state.datasetselected.push(action.payload);
                state.defaultText = action.payload.find((t: { isSelected: boolean }) => t.isSelected);
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

            })
            .addCase(getInitialLanguage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getInitialLanguage.fulfilled, (state, action) => {
                state.loading = false;
                state.datasetselected = action.payload; 
                state.defaultText = action.payload; 
           
            })
            .addCase(getInitialLanguage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

export const { setSelectedLanguage, openQuizModal, closeQuizModal, openDialog, closeDialog, openDialogMastered, closeDialogMastered } = LanguageHomeSlice.actions;

export default LanguageHomeSlice.reducer;