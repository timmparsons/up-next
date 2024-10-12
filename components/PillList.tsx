import { View, Text, FlatList } from 'react-native';
import React from 'react';

const GENRE_DATA = [
  {
    id: '1',
    title: 'Documentaries',
  },
  {
    id: '2',
    title: 'Sci-Fi',
  },
  {
    id: '3',
    title: 'Sitcoms',
  },
  {
    id: '4',
    title: 'Horror',
  },
  {
    id: '5',
    title: 'Thriller',
  },
  {
    id: '6',
    title: 'Western',
  },
  {
    id: '7',
    title: 'Comedy',
  },
];

type ItemProps = { title: string };

const Pill = ({ title }: ItemProps) => (
  <View className="m-2 rounded-full bg-slate-200	p-3">
    <Text>{title}</Text>
  </View>
);

const PillList = () => {
  return (
    <View className="mx-3 my-2">
      <FlatList
        horizontal
        data={GENRE_DATA}
        renderItem={({ item }) => <Pill title={item.title} />}
      />
    </View>
  );
};

export default PillList;
