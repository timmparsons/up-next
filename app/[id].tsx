import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_PASSKEY}`,
          },
        });
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!movie) {
    return <Text>No movie found.</Text>;
  }
  return (
    <View>
      <Stack.Screen options={{ title: 'movie', headerBackTitleVisible: false }} />
      <Text className="text-2xl font-bold">{movie?.title}</Text>
      <Image
        className="h-60 w-full rounded-lg"
        source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}` }}
        resizeMode="cover"
      />
      <Text className="mt-2">{movie.overview}</Text>
      <Text>Release Date: {movie.release_date}</Text>
      <Text>Rating: {movie.vote_average}</Text>
    </View>
  );
};

export default MovieDetails;
