import { Link } from 'expo-router';
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, Pressable } from 'react-native';

import { ShowsListProps } from '~/types/movies';

const ShowsList = ({ title, data }: ShowsListProps) => {
  return (
    <View className="mt-2 px-8">
      <Text style={styles.headingText} className="pb-3 text-2xl font-extrabold">
        {title}
      </Text>
      <FlatList
        horizontal
        data={data.slice(0, 5)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="mb-4 mr-2">
            <Link href={`/${item.id}`} asChild>
              <Pressable>
                <Image
                  className="h-40 w-full rounded-lg"
                  source={{
                    uri: item.backdrop_path
                      ? `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`
                      : 'https://via.placeholder.com/500x300',
                  }}
                  resizeMode="cover"
                  style={{ aspectRatio: 16 / 9, height: 120 }}
                />
                <Text className="text-lg">{item.title}</Text>
              </Pressable>
            </Link>
          </View>
        )}
      />
    </View>
  );
};

export default ShowsList;

const styles = StyleSheet.create({
  headingText: {
    fontFamily: 'ZillaSlab_600SemiBold',
  },
});
