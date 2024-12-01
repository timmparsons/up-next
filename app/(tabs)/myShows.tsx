import { Stack, useRouter, Link } from 'expo-router';
import { SafeAreaView, Text, FlatList, View, Image, Pressable, Button } from 'react-native';

import { useSelector } from 'react-redux';

import FontsLoader from '~/components/FontsLoader';
import { useAuth } from '~/context/AuthProvider';
import { selectAllAiMovies } from '~/redux/slices/movieSlice';

export default function MyShows() {
  const { session } = useAuth();
  const router = useRouter();
  const movies = useSelector(selectAllAiMovies);

  const shuffledMovies = [...movies.slice(0, Math.random() * 100)].sort(() => Math.random() - 0.5);
  console.log('QQQ-1 ', shuffledMovies);

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
            pathname: `${item?.id}`,
            params: {
              movie: JSON.stringify(item),
            },
          }}
          asChild>
          <Pressable>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
              className="h-40 w-28 rounded-lg"
              resizeMode="cover"
            />
            <View className="h-20 justify-between">
              <Text className="mt-2 text-center text-sm" numberOfLines={2} ellipsizeMode="tail">
                {item.title}
              </Text>
              {/* <Text className="mb-2 text-center text-sm">{providers[item.provider]?.logo}</Text> */}
            </View>
          </Pressable>
        </Link>
      </View>
    );
  };
  return (
    <FontsLoader>
      <SafeAreaView className="flex-1">
        <Stack.Screen options={{ title: 'Shows', headerShown: false }} />
        <Button title="Go to Auth" onPress={goToAuthScreen} />
        <FlatList
          data={shuffledMovies}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
        />
      </SafeAreaView>
    </FontsLoader>
  );
}
