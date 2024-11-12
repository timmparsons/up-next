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
      state.aiMovies = action.payload.results;
    },
  },
});

export const { setLikedMovies, setAiMovies } = movieSlice.actions;

//Selectors
export const selectAllAiMovies = (state) => {
  return state.moviesList.aiMovies;
};

export const selectMoviesByGenre = (genre) => (state) =>
  state.aiMovies.filter((movie) => movie.genres.includes(genre));

export default movieSlice.reducer;
