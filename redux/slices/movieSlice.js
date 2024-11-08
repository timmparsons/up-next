import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [],
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setLikedMovies: (state, action) => {
      state.likedMovies = action.payload;
    },
  },
});

export const { setLikedMovies } = movieSlice.actions;

export default movieSlice.reducer;
