import { Stack } from 'expo-router';
import { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import { GENRES } from '../constants';
import FontsLoader from '~/components/FontsLoader';
import Header from '~/components/Header/Header';
import { setSelectedGenreNamesForAi } from '~/redux/slices/genreSlice';
import { useDispatch } from 'react-redux';
import { fetchMovies } from '~/api';

export default function Home() {
  const dispatch = useDispatch();
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [movieGenreList, setMovieGenreList] = useState<any[]>([]);

  const toggleGenre = (genreId: number, genreName: string) => {
    setSelectedGenres((current) =>
      current.includes(genreId) ? current.filter((id) => id !== genreId) : [...current, genreId]
    );
  };

  const handleSearch = async () => {
    const genreIds = selectedGenres.join(',');

    // dispatch(setSelectedGenreNamesForAi(selectedGenres));

    try {
      const movies = await fetchMovies(
        'movie',
        `include_adult=false&include_video=false&language=en-US&page=1&region=us&sort_by=popularity.desc&with_genres=${genreIds}`
      );

      setMovieGenreList(movies.results || []);
      console.log('Searching with genres:', selectedGenres);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const renderMovieItem = ({ item }: { item: any }) => (
    <View className="mb-4 mr-4 w-[200px]">
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        className="h-[300px] w-full rounded-lg"
        resizeMode="cover"
      />
      <View className="mt-2">
        <Text className="text-lg font-bold" numberOfLines={1}>
          {item.title}
        </Text>
        <Text className="text-sm text-gray-600" numberOfLines={3}>
          {item.overview}
        </Text>
      </View>
    </View>
  );

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
            onPress={handleSearch}>
            <Text className="text-base font-semibold text-white">Search</Text>
          </TouchableOpacity>
        </View>

        {/* Movie List */}
        {movieGenreList.length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
            <FlatList
              data={movieGenreList}
              renderItem={renderMovieItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={Math.ceil(movieGenreList.length / 2)}
            />
          </ScrollView>
        )}
      </SafeAreaView>
    </FontsLoader>
  );
}
