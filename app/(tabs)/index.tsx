import { Stack, useRouter } from 'expo-router';
import { SafeAreaView, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { getGroqMovies } from '../../grok';

import FontsLoader from '~/components/FontsLoader';
import Header from '~/components/Header';
import SearchBar from '~/components/SearchBar';
import TrendingMovies from '~/components/TrendingMovies';
import TrendingTvShows from '~/components/TrendingTvShows';
import { useAuth } from '~/context/AuthProvider';
import { setAiMovies } from '~/redux/slices/movieSlice';
import { useDispatch } from 'react-redux';

type MovieData = {
  title: string;
  description: string;
  genres: string[];
  release_year: number;
  poster_url: string;
};

export default function Home() {
  // const [aiMovies, setAiMovies] = useState<MovieData[] | null>(null);
  const { session } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();

  const goToAuthScreen = () => {
    router.push('/(auth)/welcome'); // Navigate to your auth page
  };

  console.log('xxx');

  useEffect(() => {
    const fetchMovies = async () => {
      const aiMoviesData = await getGroqMovies();
      console.log('qqq', aiMoviesData);
      dispatch(setAiMovies(JSON.parse(aiMoviesData)));
    };

    fetchMovies();
  }, []);

  return (
    <FontsLoader>
      <SafeAreaView className="flex-1">
        <Stack.Screen options={{ title: 'Home', headerShown: false }} />
        <Header />

        {/* <SearchBar /> */}
        <Button title="Go to Auth" onPress={goToAuthScreen} />

        {/* <PillList /> */}
        {/* <ShowsList title="Popular" />
        <ShowsList title="Your Friends' Favorites" /> */}
        <TrendingMovies />
        <TrendingTvShows />
      </SafeAreaView>
    </FontsLoader>
  );
}

// return results.map((movie) => {
//   console.log('qwe ', movie.title);
//   const formattedMovieName = movie.title.replace(' ', '%20');
//   console.log('qwe1 ', formattedMovieName);
//   const url = `https://api.themoviedb.org/3/search/movie?query=${formattedMovieName}&include_adult=false&language=en-US&page=1`;
//   const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',r
//       Authorization:
//         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGMwM2NhNzZkY2FiNzY3MDAzYmI5MDc2OGZmZTMwMyIsIm5iZiI6MTcyODc4NzIxMC4xODU4NzIsInN1YiI6IjVmMTM2NTdkNzg1NzBlMDAzNDU3YjczMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9mBiXgp5aL95QLi30Kulcv-bZWzoZiuuEc34w5OIh04',
//     },
//   };
//   fetch(url, options)
//     .then((res) => res.json())
//     .then((json) => console.log(json))
//     .catch((err) => console.error(err));
// });
