import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';

interface MovieItem {
  id: number;
  title: string;
}

interface MovieResponse {
  results: MovieItem[];
}

const MovieGenre = ({ id }) => {
  const [topTenGenre, setTopTenGenre] = useState<MovieResponse>({
    results: [],
  });
  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_PASSKEY}`,
            },
          }
        );
        const data = await response.json();
        setTopTenGenre(data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      } finally {
        console.log('noooo');
      }
    };

    fetchGenreData();
  }, [id]);

  return (
    <View>
      {topTenGenre?.results?.map((movie) => <Text>{movie.title}</Text>)}
      <Text>Genre: {id}</Text>
    </View>
  );
};

export default MovieGenre;
