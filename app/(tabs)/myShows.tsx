import { Stack } from 'expo-router';
import { useState, useEffect } from 'react';

export default function MyShows() {
  return (
    <>
      <Stack.Screen options={{ title: 'Shows' }} />
    </>
  );
}
