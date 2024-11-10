import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [],
  likedMovies: [],
  aiMovies: [],
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setLikedMovies: (state, action) => {
      state.likedMovies = action.payload;
    },
    setAiMovies: (state, action) => {
      console.log('QQQ', action.payload);
      state.aiMovies = action.payload.results;
    },
  },
});

export const { setLikedMovies, setAiMovies } = movieSlice.actions;

export default movieSlice.reducer;
