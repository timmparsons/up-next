import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text, FlatList, View, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';

import { useSelector } from 'react-redux';

import { providers } from '../constants';

import { getTmdbMovieImages } from '~/api';
import FontsLoader from '~/components/FontsLoader';
import Header from '~/components/Header';
// import SearchBar from '~/components/SearchBar';
// import TrendingMovies from '~/components/TrendingMovies';
// import TrendingTvShows from '~/components/TrendingTvShows';
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
    return <Text>Loading...</Text>;
  }

  const goToAuthScreen = (): void => {
    router.push('/(auth)/welcome');
  };

  const renderItem = ({ item }) => {
    console.log('qqq ', item);
    return (
      <View className="m-4 flex-1 items-center justify-center">
      <Link href={`/${item?.id}`} asChild>

        <Pressable onPress={() => console.log('Image clicked')}>
          <Image
            source={{ uri: item.imageUrl }}
            className="h-40 w-28 rounded-lg"
            resizeMode="cover"
          />
          <Text className="mt-2 text-center text-sm" numberOfLines={2}>
            {item.title}
          </Text>
          <Text className="pt-2 text-center text-sm" numberOfLines={1}>
            {providers[item.provider]?.logo}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <FontsLoader>
      <SafeAreaView className="flex-1">
        <Stack.Screen options={{ title: 'Home', headerShown: false }} />
        <Header />

        {/* <Button title="Go to Auth" onPress={goToAuthScreen} /> */}
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
