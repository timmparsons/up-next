import { Stack, useRouter } from 'expo-router';
import { SafeAreaView, Button } from 'react-native';

import FontsLoader from '~/components/FontsLoader';
import Header from '~/components/Header';
import SearchBar from '~/components/SearchBar';
import TrendingMovies from '~/components/TrendingMovies';
import TrendingTvShows from '~/components/TrendingTvShows';
import { useAuth } from '~/context/AuthProvider';

export default function Home() {
  const { session } = useAuth();
  const router = useRouter();

  const goToAuthScreen = () => {
    router.push('/(auth)/welcome'); // Navigate to your auth page
  };

  return (
    <FontsLoader>
      <SafeAreaView className="flex-1">
        <Stack.Screen options={{ title: 'Home', headerShown: false }} />
        <Header />

        <SearchBar />
        <Button title="Go to Auth" onPress={goToAuthScreen} />

        {/* <PillList /> */}
        {/* <ShowsList title="Popular" />
        <ShowsList title="Your Friends' Favorites" /> */}
        <TrendingMovies />
        <TrendingTvShows />
      </SafeAreaView>
    </FontsLoader>
  );
}
