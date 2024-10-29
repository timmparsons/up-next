import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native';

export default function MyShows() {
  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: 'Shows', headerShown: false }} />
    </SafeAreaView>
  );
}
