import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, Pressable, SafeAreaView } from 'react-native';

import { providers } from './constants';

import { useAuth } from '~/context/AuthProvider';
import { supabase } from '~/utils/supabase';

const MovieDetails = () => {
  const { movie } = useLocalSearchParams();
  const parsedMovie = JSON.parse(movie);
  const { session } = useAuth();

  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIfLiked = async () => {
      if (!session?.user?.id) return;

      const { data, error } = await supabase
        .from('liked_movies')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('movie_id', parsedMovie.id)
        .maybeSingle();

      if (error && error.details !== 'Row not found') {
        console.error('Error checking liked movies:', error);
      } else {
        setIsLiked(!!data);
      }

      setLoading(false);
    };

    checkIfLiked();
  }, [parsedMovie.id, session?.user?.id]);

  const likeMovie = async () => {
    setIsLiked(true); // Optimistic update

    const { error } = await supabase
      .from('liked_movies')
      .insert([{ user_id: session.user.id, movie_id: parsedMovie.id }]);

    if (error) {
      console.error('Error liking movie:', error);
      setIsLiked(false); // Revert if error occurs
    }
  };

  const unlikeMovie = async () => {
    setIsLiked(false); // Optimistic update
    console.log('Unliking movie:', parsedMovie.id, session.user.id);

    const { data, error } = await supabase
      .from('liked_movies')
      .delete()
      .eq('user_id', session.user.id)
      .eq('movie_id', parsedMovie.id);

    if (error) {
      console.error('Error unliking movie:', error);
      setIsLiked(true); // Revert if error occurs
    } else {
      console.log('Successfully unliked movie:', data);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 p-4">
      <Stack.Screen options={{ title: 'Movie', headerBackTitleVisible: false }} />
      <Text className="mb-4 p-3 text-3xl font-bold">{parsedMovie?.title || parsedMovie?.name}</Text>
      <Image
        className="mb-4 h-60 w-full rounded-lg"
        source={{ uri: `https://image.tmdb.org/t/p/w500/${parsedMovie.poster_path}` }}
        resizeMode="contain"
      />
      <View className="p-3">
        <Text className="mb-2 text-lg">{parsedMovie.overview}</Text>
        <View className="mb-2 flex-row">
          <Text className="text-lg">Release Date:</Text>
          <Text className="ml-2 text-lg">{parsedMovie.release_date}</Text>
        </View>
        <View className="mb-2 flex-row">
          <Text className="text-lg">Rating:</Text>
          <Text className="ml-2 text-lg">{parsedMovie.vote_average}</Text>
        </View>
        <View className="mb-4 mr-2 flex-row justify-end">
          <Pressable onPress={isLiked ? unlikeMovie : likeMovie} className="mr-6">
            <AntDesign
              name={isLiked ? 'heart' : 'hearto'}
              size={24}
              color={isLiked ? 'red' : 'black'}
            />
          </Pressable>
          <Pressable>
            <Feather name="send" size={24} color="black" />
          </Pressable>
        </View>
        <Text className="text-lg">Friends thoughts:</Text>
      </View>
    </SafeAreaView>
  );
};

export default MovieDetails;
