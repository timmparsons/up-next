import { TMDB_PASSKEY } from '@env';
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
    const getMovies = async () => {
      try {
        const res = await fetch('https://api.themoviedb.org/3/movie/popular', {
          headers: {
            Authorization: `Bearer ${TMDB_PASSKEY}`,
          },
        });
        const data: MovieResponse = await res.json();
        setPopularMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    getMovies();
  }, []);

  return (
    <View>
      <ShowsList title="Pending Watches" data={getPopularMovies.results} />
    </View>
  );
};

export default PendingWatches;
