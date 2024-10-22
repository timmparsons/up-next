import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import ShowList from './ShowList';

import { fetchMovies } from '~/app/api';
import { ShowsListProps } from '~/types/movies';

const TrendingTvShows = () => {
  const [topTenTrendingTvShows, setTopTenTrendingTvShows] = useState<ShowsListProps>({
    results: [],
  });

  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        const data = await fetchMovies('tv', 'trending/tv/day?language=en-US');
        setTopTenTrendingTvShows(data);
      } catch (error) {
        console.error('Error fetching tv data:', error);
      }
    };

    fetchGenreData();
  }, []);

  const buttonClicked = () => {
    Alert.alert('Alert Title', 'My Alert Msg');
  };

  return (
    <ShowList
      data={topTenTrendingTvShows}
      pressed={buttonClicked}
      title="Top 10 Trending TV Shows"
    />
  );
};

export default TrendingTvShows;
