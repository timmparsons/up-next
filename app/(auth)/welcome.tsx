import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Text, SafeAreaView, Pressable } from 'react-native';

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
        <Pressable
          className="rounded-xl border border-orange-500 bg-orange-500 p-5"
          onPress={buttonPress}>
          <Text className="text-lg font-bold text-white">Get Started</Text>
        </Pressable>
      </SafeAreaView>
    </>
  );
};

export default Auth;
