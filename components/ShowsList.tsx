import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import Shows from './Shows';

import { MOVIE_DATA } from '~/helpers/data';

type ShowItem = {
  id: number;
  title: string;
};

type ShowsListProps = {
  id?: number;
  title: string;
  data: ShowItem[];
};

const ShowsList = ({ title, data }: ShowsListProps) => {
  return (
    <View className="mt-2 px-8">
      <Text style={styles.headingText} className="text-2xl font-extrabold">
        {title}
      </Text>
      <FlatList data={data} renderItem={({ item }) => <Shows title={item.title} />} />
    </View>
  );
};

export default ShowsList;

const styles = StyleSheet.create({
  headingText: {
    fontFamily: 'ZillaSlab_600SemiBold',
  },
});
