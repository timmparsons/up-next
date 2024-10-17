import { View, Text } from 'react-native';
import { Stack } from 'expo-router';
import React from 'react';

const myTV = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'TV' }} />
    </>
  );
};

export default myTV;
