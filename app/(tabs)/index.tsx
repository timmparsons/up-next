import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native';

import FontsLoader from '~/components/FontsLoader';
import Header from '~/components/Header';
import SearchBar from '~/components/SearchBar';
import TrendingMovies from '~/components/TrendingMovies';
import TrendingTvShows from '~/components/TrendingTvShows';

export default function Home() {
  return (
    <FontsLoader>
      <SafeAreaView className="flex-1">
        <Stack.Screen options={{ title: 'Home', headerShown: false }} />
        <Header />

        <SearchBar />

        {/* <PillList /> */}
        {/* <ShowsList title="Popular" />
        <ShowsList title="Your Friends' Favorites" /> */}
        <TrendingMovies />
        <TrendingTvShows />
      </SafeAreaView>
    </FontsLoader>
  );
}
