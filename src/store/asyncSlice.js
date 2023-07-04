import { createSlice } from '@reduxjs/toolkit';

export const APP_LOADED = 'APP_LOADED';

const asyncSlice = createSlice({
  name: 'async',
  initialState: {
    loading: false,
    error: null,
    initialized: false,
  },
  reducers: {
    asyncActionStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    asyncActionFinish: (state) => {
      state.loading = false;
    },
    asyncActionError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    appLoaded: (state) => {
      state.initialized = true;
    },
  },
});

export const { asyncActionStart, asyncActionFinish, asyncActionError, appLoaded } = asyncSlice.actions;

export default asyncSlice.reducer;
