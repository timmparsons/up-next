import * as SplashScreen from 'expo-splash-screen';
import { ZillaSlab_600SemiBold } from '@expo-google-fonts/zilla-slab';
import { useFonts } from 'expo-font';
import React, { useEffect, ReactNode } from 'react';

interface FontsLoaderProps {
  children: ReactNode;
}

const FontsLoader: React.FC<FontsLoaderProps> = ({ children }) => {
  const [fontsLoaded] = useFonts({
    ZillaSlab_600SemiBold,
  });

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return children;
};

export default FontsLoader;
