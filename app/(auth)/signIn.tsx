import { View, Text, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import React from 'react';

const signIn = () => {
  return (
    <SafeAreaView className="flex-1 bg-white pt-5">
      <Stack.Screen options={{ title: 'Sign In', headerBackTitleVisible: false }} />

      <Text>signIn</Text>
    </SafeAreaView>
  );
};

export default signIn;
