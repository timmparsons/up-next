const TMDB_URL = 'https://api.themoviedb.org/3';

export const popularMovies =
  'discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';

export const fetchMovies = async (type: string, params: string) => {
  try {
    const response = await fetch(`${TMDB_URL}/discover/${type}?${params}`, {
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

export const fetchMovieData = async (id) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type === 'movie' ? 'movie' : 'tv'}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_PASSKEY}`,
        },
      }
    );

    const data = await response.json();
    setMovie(data);
  } catch (error) {
    console.error('Error fetching movie data:', error);
  } finally {
    setLoading(false);
  }
};

function encodeQueryString(str: string) {
  return encodeURIComponent(str);
}

export const getTmdbMovieImages = async (movieTitles: []) => {
  const movieImages = [];
  for (const { title, provider, type } of movieTitles) {
    try {
      const url =
        type === 'movie'
          ? `${TMDB_URL}/search/movie?query=${encodeQueryString(title)}`
          : `${TMDB_URL}/search/tv?query=${encodeQueryString(title)}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_PASSKEY}`,
        },
      });
      const jsonData = await response.json();

      if (jsonData.results && jsonData.results.length > 0) {
        const movieData = jsonData.results[0];
        const movieId = movieData.id;
        const imageUrl = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;

        movieImages.push({
          title,
          imageUrl,
          provider,
          movieId,
          type,

        });
      }
    } catch (error) {
      console.error(`Error fetching TMDB image for ${title}:`, error);
    }
  }

  return movieImages;
};
