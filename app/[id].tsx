import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, Pressable, SafeAreaView } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useAuth } from '~/context/AuthProvider';
import { supabase } from '~/utils/supabase';

const MovieDetails = () => {
  const { id, provider, type } = useLocalSearchParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { session } = useAuth();

  useEffect(() => {
    const fetchMovieData = async () => {
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
    fetchMovieData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!movie) {
    return <Text>No movie found.</Text>;
  }

  const likeMovie = async () => {
    const { id, title, description, release_date } = movie;

    const { data: movieExists, error: checkError } = await supabase
      .from('movies')
      .select('id')
      .eq('id', id)
      .single();

    if (!movieExists) {
      const { error: insertMovieError } = await supabase.from('movies').insert([
        {
          id: movie.id,
          title,
          description,
          release_date,
        },
      ]);

      if (insertMovieError) {
        console.error('Error inserting movie:', insertMovieError.message);
        return;
      }
    }

    const { data, error: likeError } = await supabase
      .from('liked_movies')
      .insert([{ user_id: session.user.id, movie_id: movie.id }]);

    if (likeError) {
      console.error('Error liking the movie:', likeError.message);
    } else {
      console.log('Movie liked successfully!');
    }
  };

  // const { data } = supabase.from('liked_movies').select('id').eq('id', id).single();

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: 'movie', headerBackTitleVisible: false }} />
      <Text className="mt-5 text-2xl font-bold">{movie?.title || movie?.name}</Text>
      <Image
        className="h-60 w-full rounded-lg"
        source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}` }}
        resizeMode="cover"
      />
      <Text className="mt-2">{movie.overview}</Text>
      <Text>Release Date: {movie.release_date}</Text>
      <Text>Rating: {movie.vote_average}</Text>
      <Pressable onPress={likeMovie}>
        <Text className="font-extrabold">Like</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default MovieDetails;
