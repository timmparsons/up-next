import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';

import store from '../redux/store';

import AuthProvider from '~/context/AuthProvider';
import { setAiMovies } from '~/redux/slices/movieSlice';
import { supabase } from '~/utils/supabase';
import '../global.css';

export default function RootLayout() {
  const MovieFetcher = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      const getMovies = async () => {
        const { data } = await supabase.from('movies').select('*');
        dispatch(setAiMovies(data));
      };
      getMovies();
    }, [dispatch]);
    return null;
  };

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
