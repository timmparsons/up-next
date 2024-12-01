import { Stack, useRouter } from 'expo-router';
import { SafeAreaView, Text, View, Pressable, TouchableOpacity } from 'react-native';
import FontsLoader from '~/components/FontsLoader';
import Header from '~/components/Header/Header';
import { useAuth } from '~/context/AuthProvider';
import { useState } from 'react';

const GENRES = [
  { id: 28, name: 'Action' },
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' },
  { id: 27, name: 'Horror' },
  { id: 16, name: 'Animation' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Sci-Fi' },
  { id: 12, name: 'Adventure' },
  { id: 53, name: 'Thriller' },
];

export default function Home() {
  const { session } = useAuth();
  const router = useRouter();
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const toggleGenre = (genreId: number) => {
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
                onPress={() => toggleGenre(genre.id)}
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
              // Add your search logic here
              console.log('Searching with genres:', selectedGenres);
            }}>
            <Text className="text-base font-semibold text-white">Search</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </FontsLoader>
  );
}
