import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authenticated: false,
  currentUser: null,
  currentLocation: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export const selectAllUsers = state => state.users;

export default userSlice.reducer;
