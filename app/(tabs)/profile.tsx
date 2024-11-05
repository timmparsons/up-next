import { router, Stack } from 'expo-router';
import { Button, Pressable, SafeAreaView, Text } from 'react-native';

import { supabase } from '~/utils/supabase';

export default function Profile() {
  const handleSignOut = () => {
    const { error } = supabase.auth.signOut();

    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      router.push('/(auth)/login');
      console.log('Signed Out Successfully');
    }
  };

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: 'Profile' }} />
      <Text>Profile Page</Text>
      <Pressable onPress={handleSignOut}>
        <Text>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
}
