import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, Text, View, Pressable, TouchableOpacity } from 'react-native';

import { GENRES } from '../constants';

import FontsLoader from '~/components/FontsLoader';
import Header from '~/components/Header/Header';
import { useAuth } from '~/context/AuthProvider';
import { setSelectedGenreNamesForAi } from '~/redux/slices/genreSlice';
import { useDispatch } from 'react-redux';

export default function Home() {
  const { session } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const toggleGenre = (genreId: number, genreName: string) => {
    setSelectedGenres((current) =>
      current.includes(genreId) ? current.filter((id) => id !== genreId) : [...current, genreId]
    );
  };

  return (
    <FontsLoader>
      <SafeAreaView className="flex-1 bg-white">
        <Stack.Screen options={{ title: 'Home', headerShown: false }} />
        <Header />
        <View className="mt-4 px-4">
          <Text className="mb-4 text-2xl font-bold">What do you want to watch?</Text>
          <View className="mb-4 flex-row flex-wrap justify-center gap-2">
            {GENRES.map((genre) => (
              <Pressable
                key={genre.id}
                onPress={() => toggleGenre(genre.id, genre.name)}
                className={`
                  rounded-full px-4 py-2
                  ${selectedGenres.includes(genre.id) ? 'bg-blue-500' : 'bg-gray-200'}
                `}>
                <Text
                  className={`
                    text-sm font-semibold
                    ${selectedGenres.includes(genre.id) ? 'text-white' : 'text-black'}
                  `}>
                  {genre.name}
                </Text>
              </Pressable>
            ))}
          </View>
          <TouchableOpacity
            className="my-4 w-full items-center rounded-full bg-blue-500 px-4 py-3"
            onPress={() => {
              dispatch(setSelectedGenreNamesForAi(selectedGenres));
              console.log('Searching with genres:', selectedGenres);
            }}>
            <Text className="text-base font-semibold text-white">Search</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </FontsLoader>
  );
}
