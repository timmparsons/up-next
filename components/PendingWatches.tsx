import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import ShowsList from './ShowsList';

import { MovieResponse } from '~/types/movies';

const PendingWatches = () => {
  const [getPopularMovies, setPopularMovies] = useState<MovieResponse>({
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0,
  });

  useEffect(() => {
    const getPopularMoviesFromApi = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular', {
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_PASSKEY}`,
          },
        });
        const data: MovieResponse = await response.json();
        setPopularMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    getPopularMoviesFromApi();
  }, []);

  return (
    <View>
      <ShowsList title="Pending Watches" results={getPopularMovies.results} />
    </View>
  );
};

export default PendingWatches;
