import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';

import store from '../redux/store';

import AuthProvider from '~/context/AuthProvider';
import { getGroqMovies } from '~/grok';
import { setAiMovies } from '~/redux/slices/movieSlice';
import '../global.css';
import { supabase } from '~/utils/supabase';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  function MovieFetcher() {
    const dispatch = useDispatch();

    useEffect(() => {
      const getMovies = async () => {
        let { data, error } = await supabase.from('movies').select('*');
        dispatch(setAiMovies(data));
      };
      // const fetchMovies = async () => {
      //   const aiMoviesData = await getGroqMovies();
      //   if (typeof aiMoviesData === 'string') {
      //     dispatch(setAiMovies(JSON.parse(aiMoviesData)));
      //   } else {
      //     dispatch(setAiMovies([])); // Or any fallback array you want
      //   }
      // };
      getMovies();
      // fetchMovies();
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
