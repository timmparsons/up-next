import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import ShowsList from './ShowsList';
import { GENRE_DATA } from '~/helpers/data';
import { fetchMovies, TMDB_MOVIE_URL } from '~/app/api';

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

  const genre = GENRE_DATA.find((item) => item.id === id);

  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        const data = await fetchMovies(
          'movie',
          `include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`
        );
        setTopTenGenre(data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchGenreData();
  }, [id]);

  return (
    <View>
      <ShowsList
        title={`Popular ${genre?.title || 'Movies'} Movies`}
        data={topTenGenre.results}
        horizontal={false}
        numColumns={2}
      />
    </View>
  );
};

export default MovieGenre;
