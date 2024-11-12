import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';

import store from '../redux/store';

import AuthProvider from '~/context/AuthProvider';
import { getGroqMovies } from '~/grok';
import { setAiMovies } from '~/redux/slices/movieSlice';
import '../global.css';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  function MovieFetcher() {
    const dispatch = useDispatch();

    useEffect(() => {
      const fetchMovies = async () => {
        const aiMoviesData = await getGroqMovies();
        dispatch(setAiMovies(JSON.parse(aiMoviesData)));
      };

      fetchMovies();
    }, [dispatch]);

    return null;
  }

  return (
    <Provider store={store}>
      <AuthProvider>
        <MovieFetcher />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </Provider>
  );
}
