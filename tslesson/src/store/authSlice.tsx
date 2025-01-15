import { createSlice } from '@reduxjs/toolkit';
import { login, register } from './actions/authActions'; 

interface User {
    email: string;
    password: string;
    error?: string;
    isAuh
}

interface AuthState {
    isLoading: boolean;
    error: string | null;
    user: User | null;
}

const initialState: AuthState = {
    isLoading: false,
    error: null,
    user: null,
};

const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;