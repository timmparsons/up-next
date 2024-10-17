import { View, Text, FlatList, Pressable, Image, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';

import React, { useEffect, useState } from 'react';
import { GENRE_DATA } from '~/helpers/data';
import { fetchMovies } from '~/app/api';
import { ShowsListProps } from '~/types/movies';

const MovieGenre = ({ id }) => {
  const [topTenGenre, setTopTenGenre] = useState<ShowsListProps>({
    results: [],
  });

  const genre = GENRE_DATA.find((item) => item.id === id);

  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        const data = await fetchMovies(
          'movie',
          `include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`
        );
        setTopTenGenre(data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchGenreData();
  }, [id]);

  return (
    <SafeAreaView>
      <FlatList
        data={topTenGenre.results}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentInset={{ bottom: 50 }}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10, width: '48%' }}>
            <Link href={`/${item?.id}`} asChild>
              <Pressable>
                <Image
                  source={{
                    uri: item.backdrop_path
                      ? `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`
                      : 'https://via.placeholder.com/500x300',
                  }}
                  resizeMode="cover"
                  style={{ aspectRatio: 16 / 9, height: 120, borderRadius: 8 }}
                />
                <Text style={{ textAlign: 'center', marginTop: 5 }}>{item.title}</Text>
              </Pressable>
            </Link>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default MovieGenre;
