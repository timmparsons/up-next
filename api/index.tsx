const TMDB_MOVIE_URL = 'https://api.themoviedb.org/3';

export const popularMovies =
  'discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';

export const fetchMovies = async (type: string, params: string) => {
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
function encodeQueryString(str: string) {
  return encodeURIComponent(str);
}

export const getTmdbMovieImages = async (movieTitles: []) => {
  const movieImages = [];

  for (const { title, provider } of movieTitles) {
    try {
      const url = `${TMDB_MOVIE_URL}/search/movie?query=${encodeQueryString(title)}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_PASSKEY}`,
        },
      });
      const jsonData = await response.json();

      if (jsonData.results && jsonData.results.length > 0) {
        const movieData = jsonData.results[0];
        const imageUrl = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;

        movieImages.push({
          title,
          imageUrl,
          provider,
        });
      }
    } catch (error) {
      console.error(`Error fetching TMDB image for ${title}:`, error);
    }
  }

  return movieImages;
};
