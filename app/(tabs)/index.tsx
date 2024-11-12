import { Stack, useRouter } from 'expo-router';
import { SafeAreaView, Button, Text, FlatList, View, Image } from 'react-native';
import { useEffect, useState } from 'react';
import FontsLoader from '~/components/FontsLoader';
import Header from '~/components/Header';
import SearchBar from '~/components/SearchBar';
import TrendingMovies from '~/components/TrendingMovies';
import TrendingTvShows from '~/components/TrendingTvShows';
import { useAuth } from '~/context/AuthProvider';
import { setAiMovies, selectAllAiMovies } from '~/redux/slices/movieSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getTmdbMovieImages } from '~/api';
import { getGroqMovies } from '../../grok';

export default function Home() {
  const { session } = useAuth();
  const router = useRouter();
  const [movieImages, setMovieImages] = useState<any[]>([]);
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

  const renderItem = ({ item }) => (
    <View className="m-4 flex-1 items-center justify-center">
      <Image source={{ uri: item.imageUrl }} className="h-40 w-28 rounded-lg" resizeMode="cover" />
      <Text className="mt-2 text-center text-sm" numberOfLines={2}>
        {item.title}
      </Text>
    </View>
  );

  return (
    <FontsLoader>
      <SafeAreaView className="flex-1">
        <Stack.Screen options={{ title: 'Home', headerShown: false }} />
        <Header />

        <Button title="Go to Auth" onPress={goToAuthScreen} />
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
