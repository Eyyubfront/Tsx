import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  user: User | null;
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

const initialState: UserState = {
  user: getUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: 'UserAll',
  initialState,
  reducers: {
    loginUser(state, action) {
      const { user, token } = action.payload;
      const activeUser: User = { ...user, token };
      state.user = activeUser;
      localStorage.setItem('user', JSON.stringify(activeUser));
    },
    logoutUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;