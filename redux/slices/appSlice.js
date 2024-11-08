import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userProfile: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

export const { setUserProfile } = appSlice.actions;

export default appSlice.reducer;
