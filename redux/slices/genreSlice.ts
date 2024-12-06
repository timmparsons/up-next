import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GenreState {
  selectedGenres: number[];
}

const initialState: GenreState = {
  selectedGenres: [],
};

export const genreSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    setSelectedGenreNamesForAi: (state, action: PayloadAction<number[]>) => {
      state.selectedGenres = action.payload;
    },
    clearSelectedGenres: (state) => {
      state.selectedGenres = [];
    },
  },
});

export const { setSelectedGenreNamesForAi, clearSelectedGenres } = genreSlice.actions;
export default genreSlice.reducer;
