import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Text, SafeAreaView, Pressable, View } from 'react-native';

import Button from '~/components/Button';

const Auth = () => {
  const router = useRouter();

  const redirectToLogin = () => {
    router.push('/(auth)/login');
  };

  const redirectToSignIn = () => {
    router.push('/(auth)/signIn');
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 items-center justify-center bg-gray-100">
        <Text className="mb-4 text-xl font-bold">Welcome to upNext!</Text>
        <Text className="mb-8 text-lg">Find out what your friends are watching</Text>
        <Pressable
          className="rounded-xl border border-orange-500 bg-orange-500 p-5"
          onPress={redirectToSignIn}>
          <Text className="text-lg font-bold text-white">Get Started</Text>
        </Pressable>

        <View className="mt-4" style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>Already have an account?</Text>
          <Pressable onPress={redirectToLogin}>
            <Text className="px-2" style={{ textDecorationLine: 'underline' }}>
              Log In
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Auth;
