import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native';
import Header from '~/components/Header';

export default function Home() {
  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <Header />
    </SafeAreaView>
  );
}
