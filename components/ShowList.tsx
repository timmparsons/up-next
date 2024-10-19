import { Link } from 'expo-router';
import { View, Text, SafeAreaView, FlatList, Pressable, Image } from 'react-native';
import React from 'react';

const ShowList = (props: any) => {
  const { data, pressed, title } = props;

  return (
    <SafeAreaView>
      <Text className="mt-2 pl-2 text-xl font-semibold underline">{title}</Text>
      <FlatList
        horizontal // Scroll horizontally
        className="mb-5 mt-5"
        data={data.results.slice(0, 10)}
        showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
        contentContainerStyle={{ paddingHorizontal: 10 }} // Padding for the start and end of the list
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="mr-4 w-40">
            {/* Add margin between items and set fixed width */}
            <Link href={`/${item?.id}`} asChild>
              <Pressable className="w-full" onLongPress={pressed}>
                <Image
                  source={{
                    uri: item.backdrop_path
                      ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                      : 'https://via.placeholder.com/500x300',
                  }}
                  className="aspect-[16/22] w-full rounded-lg object-cover" // Keep aspect ratio and round corners
                />
                <Text className="my-2 text-center text-sm font-bold">
                  {item.title ? item.title : item.name}
                </Text>
              </Pressable>
            </Link>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ShowList;
