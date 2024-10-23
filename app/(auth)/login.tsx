import { Stack } from 'expo-router';
import React from 'react';
import { Text, SafeAreaView } from 'react-native';

import Button from '~/components/Button';

const Auth = () => {
  const buttonPress = () => {
    console.log('Clicked');
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView>
        <Text className="text-xl">See what's upNext</Text>
        <Button
          title="Get Started"
          style="center rounded-2xl bg-orange-500 p-5"
          onPress={buttonPress}
        />
      </SafeAreaView>
    </>
  );
};

export default Auth;
