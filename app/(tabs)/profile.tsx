import { Stack } from 'expo-router';
import { Text } from 'react-native';

export default function Profile() {
  return (
    <>
      <Stack.Screen options={{ title: 'Profile' }} />
      <Text>Profile Page</Text>
    </>
  );
}
