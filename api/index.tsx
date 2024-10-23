export const popularMovies =
  'discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';

export const fetchMovies = async (type: string, params: string) => {
  const TMDB_MOVIE_URL = 'https://api.themoviedb.org/3';

  try {
    const response = await fetch(`${TMDB_MOVIE_URL}/discover/${type}?${params}`, {
      headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_PASSKEY}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    throw error;
  }
};
