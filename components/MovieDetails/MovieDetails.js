import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { View, Text, Image, Pressable, SafeAreaView } from 'react-native';

const MovieDetails = ({ movie, isLiked, loading, onLikeToggle }) => {
  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 p-4">
      <Text className="mb-4 p-3 text-3xl font-bold">{movie.title}</Text>
      <Image
        className="mb-4 h-60 w-full rounded-lg"
        source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
        resizeMode="contain"
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
        <View className="mb-4 mr-2 flex-row justify-end">
          <Pressable onPress={onLikeToggle} className="mr-6">
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
