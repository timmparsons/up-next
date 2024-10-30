import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  friends: [],
  likedMovies: [],
  userProfile: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
    setLikedMovies: (state, action) => {
      state.likedMovies = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

export const { setFriends, setLikedMovies, setUserProfile } = appSlice.actions;

export default appSlice.reducer;
