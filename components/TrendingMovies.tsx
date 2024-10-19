import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import ShowList from './ShowList';

import { fetchMovies } from '~/app/api';
import { ShowsListProps } from '~/types/movies';

const TrendingMovies = () => {
  const [topTenTrendingMovies, setTopTenTrendingMovies] = useState<ShowsListProps>({
    results: [],
  });

  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        const data = await fetchMovies('movie', 'trending/movie/day?language=en-US');
        setTopTenTrendingMovies(data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchGenreData();
  }, []);

  const buttonClicked = () => {
    Alert.alert('Alert Title', 'My Alert Msg');
  };

  return (
    <ShowList data={topTenTrendingMovies} pressed={buttonClicked} title="Top 10 Trending Movies" />
  );
};

export default TrendingMovies;
