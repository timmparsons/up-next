import { TMDB_PASSKEY } from '@env';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native';

import { popularMovies } from '../api';

import FontsLoader from '~/components/FontsLoader';
import Header from '~/components/Header';
import PendingWatches from '~/components/PendingWatches';
import PillList from '~/components/PillList';
import SearchBar from '~/components/SearchBar';
import ShowsList from '~/components/ShowsList';

export default function Home() {
  return (
    <FontsLoader>
      <SafeAreaView className="flex-1">
        <Stack.Screen options={{ title: 'Home', headerShown: false }} />
        <Header />

        <SearchBar />

        <PillList />

        {/* If no genre selected, show ShowsList */}
        <PendingWatches />
        {/* <ShowsList title="Popular" />
        <ShowsList title="Your Friends' Favorites" /> */}
      </SafeAreaView>
    </FontsLoader>
  );
}
