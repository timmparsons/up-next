import { View, Text } from 'react-native';
import React, { useEffect } from 'react';

const MovieGenre = ({ id }) => {
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
        console.log('GENRE-DATA ', data);
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
      <Text>Genre: {id}</Text>
    </View>
  );
};

export default MovieGenre;
