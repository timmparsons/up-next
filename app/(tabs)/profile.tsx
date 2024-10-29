import { router, Stack } from 'expo-router';
import { Pressable, SafeAreaView, Text } from 'react-native';

import { supabase } from '~/utils/supabase';

export default function Profile() {
  const handleSignOut = () => {
    const { error } = supabase.auth.signOut();

    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      console.log('Signed Out Successfully');
      router.push('/(auth)/login');
    }
  };

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: 'Profile', headerShown: false }} />
      <Text>Profile Page</Text>
      <Pressable onPress={handleSignOut}>
        <Text>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
}
