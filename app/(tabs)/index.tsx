import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native';

import FontsLoader from '~/components/FontsLoader';
import Header from '~/components/Header';
import PendingWatches from '~/components/PendingWatches';
import PillList from '~/components/PillList';
import SearchBar from '~/components/SearchBar';
import ShowsList from '~/components/ShowsList';
import { TMDB_PASSKEY } from '@env';

export default function Home() {
  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await fetch('https://api.themoviedb.org/3/movie/11', {
          headers: {
            Authorization: `Bearer ${TMDB_PASSKEY}`,
          },
        });
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    getMovies();
  }, []);

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
