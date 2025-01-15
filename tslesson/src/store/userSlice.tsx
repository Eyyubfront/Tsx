import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { refreshAccessToken } from './actions/refreshAccessToken'; // refreshAccessToken action creator

interface UserState {
  user: User | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

interface User {
  id: number;
  name: string;
  email: string;
  token: string;
}

const getUserFromLocalStorage = (): User | null => {
  const userString = localStorage.getItem('user');
  return userString ? JSON.parse(userString) : null;
};

const getRefreshTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem('refreshToken');
};

const initialState: UserState = {
  user: getUserFromLocalStorage(),
  refreshToken: getRefreshTokenFromLocalStorage(),
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'UserAll',
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<{ user: User; token: string; refreshToken: string }>) {
      const { user, token, refreshToken } = action.payload;

    
      const activeUser: User = { ...user, token };
      state.user = activeUser;
      state.refreshToken = refreshToken;


      localStorage.setItem('user', JSON.stringify(activeUser));
      localStorage.setItem('refreshToken', refreshToken);
    },
    logoutUser(state) {
      state.user = null;
      state.refreshToken = null;
      localStorage.removeItem('user');
      localStorage.removeItem('refreshToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshAccessToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.loading = false;
 
        const { token, newRefreshToken } = action.payload;

        if (state.user) {
          state.user.token = token;
        }

        state.refreshToken = newRefreshToken;

   
        localStorage.setItem('user', JSON.stringify(state.user));
        localStorage.setItem('refreshToken', newRefreshToken);
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
