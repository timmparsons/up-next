import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Text, SafeAreaView } from 'react-native';

import Button from '~/components/Button';

const Auth = () => {
  const router = useRouter();

  const buttonPress = () => {
    router.push('/(auth)/login');
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 items-center justify-center bg-gray-100">
        <Text className="mb-4 text-xl font-bold">Welcome to upNext!</Text>
        <Text className="mb-8 text-lg">Find out what your friends are watching</Text>
        <Button title="Get Started" style="rounded-2xl bg-orange-500 p-5" onPress={buttonPress} />
      </SafeAreaView>
    </>
  );
};

export default Auth;
