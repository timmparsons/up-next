import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text, FlatList, View, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';

import { useSelector } from 'react-redux';

import { providers } from '../constants';

import { getTmdbMovieImages } from '~/api';
import FontsLoader from '~/components/FontsLoader';
import Header from '~/components/Header';
import SearchBar from '~/components/SearchBar';
import { useAuth } from '~/context/AuthProvider';
import { selectAllAiMovies } from '~/redux/slices/movieSlice';

export default function Home() {
  const { session } = useAuth();
  const router = useRouter();
  const [movieImages, setMovieImages] = useState<string[]>([]);
  const movies = useSelector(selectAllAiMovies);

  useEffect(() => {
    const fetchMovieImages = async () => {
      try {
        const images = await getTmdbMovieImages(movies);
        setMovieImages(images);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieImages();
  }, [movies]);

  if (!movies || movies.length === 0) {
    return (
      <View className="flex-1 justify-center">
        <Text className="text-xl font-semibold">Loading...</Text>
      </View>
    );
  }

  const goToAuthScreen = (): void => {
    router.push('/(auth)/welcome');
  };

  const renderItem = ({ item }) => {
    return (
      <View className="m-4 flex-1 items-center justify-center">
        <Link
          href={{
            pathname: `${item?.movieId}`,
            params: {
              movieId: item?.movieId,
              title: item?.title,
              imageUrl: item?.imageUrl,
              provider: item?.provider,
              type: item?.type,
            },
          }}
          asChild>
          <Pressable>
            <Image
              source={{ uri: item.imageUrl }}
              className="h-40 w-28 rounded-lg"
              resizeMode="cover"
            />
            <View className="h-20 justify-between">
              <Text className="mt-2 text-center text-sm" numberOfLines={2} ellipsizeMode="tail">
                {item.title}
              </Text>
              <Text className="mb-2 text-center text-sm">{providers[item.provider]?.logo}</Text>
            </View>
          </Pressable>
        </Link>
      </View>
    );
  };

  return (
    <FontsLoader>
      <SafeAreaView className="flex-1">
        <Stack.Screen options={{ title: 'Home', headerShown: false }} />
        <Header />
        <SearchBar />

        <FlatList
          data={movieImages}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
        />
      </SafeAreaView>
    </FontsLoader>
  );
}
