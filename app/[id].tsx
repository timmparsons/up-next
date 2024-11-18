import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, Pressable, SafeAreaView } from 'react-native';

import { providers } from './constants';

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
    return (
      <View className="flex-1 justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!movie) {
    return (
      <View className="flex-1 justify-center">
        <Text className="text-xl">No movie found.</Text>
      </View>
    );
  }

  const likeMovie = async () => {
    // ...
  };

  return (
    <SafeAreaView className="flex-1 p-4">
      <Stack.Screen options={{ title: 'Movie', headerBackTitleVisible: false }} />
      <Text className="mb-4 p-3 text-3xl font-bold">{movie?.title || movie?.name}</Text>
      <Image
        className="mb-4 h-60 w-full rounded-lg"
        source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}` }}
        resizeMode="cover"
      />
      <View className="p-3">
        <Text className="mb-2 text-lg">{movie.overview}</Text>
        <View className="mb-2 flex-row">
          <Text className="text-lg">Release Date:</Text>
          <Text className="ml-2 text-lg">{movie.release_date}</Text>
        </View>
        <View className="mb-2 flex-row">
          <Text className="text-lg">Rating:</Text>
          <Text className="ml-2 text-lg">{movie.vote_average}</Text>
        </View>
        <View className="mb-4 flex-row">
          <Text className="text-lg">Provider:</Text>
          <View className="px-4">{providers[provider]?.logo}</View>
        </View>
        <View className="mb-4 mr-2 flex-row justify-end">
          <Pressable onPress={likeMovie} className="mr-6">
            <AntDesign name="hearto" size={24} color="black" />
          </Pressable>
          <Pressable>
            <Feather name="send" size={24} color="black" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MovieDetails;
