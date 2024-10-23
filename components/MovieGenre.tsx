import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, Image, SafeAreaView, Alert } from 'react-native';

import { fetchMovies } from '~/api';
import { ShowsListProps } from '~/types/movies';

const MovieGenre = ({ id }) => {
  const [topTenGenre, setTopTenGenre] = useState<ShowsListProps>({
    results: [],
  });
  const [selected, setSelected] = useState(false);

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

  const buttonClicked = () => {
    Alert.alert('Alert Title', 'My Alert Msg');
  };

  return (
    <SafeAreaView>
      <FlatList
        data={topTenGenre.results.slice(0, 8)}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 250 }}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentInset={{ bottom: 50 }}
        renderItem={({ item }) => (
          <View style={{ width: '50%' }}>
            <Link href={`/${item?.id}`} asChild>
              <Pressable onLongPress={buttonClicked}>
                <Image
                  source={{
                    uri: item.backdrop_path
                      ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                      : 'https://via.placeholder.com/500x300',
                  }}
                  resizeMode="cover"
                  style={{ aspectRatio: 16 / 9, borderRadius: 8 }}
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
