import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native';

import Header from '~/components/Header';
import PillList from '~/components/PillList';
import SearchBar from '~/components/SearchBar';
import ShowsList from '~/components/ShowsList';

export default function Home() {
  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <Header />
      <SearchBar />
      <PillList />
      <ShowsList title="Still need to watch" />
    </SafeAreaView>
  );
}
