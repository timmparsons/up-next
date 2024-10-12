import { View, Text, FlatList } from 'react-native';
import React from 'react';

type Props = {
  title: string;
};

type ItemProps = { id?: number; title: string };

const data = [
  {
    id: 1,
    title: 'Godfather',
  },
  {
    id: 2,
    title: 'Usual Suspects',
  },
];

type ShowProps = { title: string };

const Shows = ({ title }: ShowProps) => (
  <View>
    <Text>{title}</Text>
  </View>
);

const ShowsList = ({ title }: ItemProps) => {
  return (
    <View className="p-8">
      <Text className="text-2xl font-extrabold">{title}</Text>
      <FlatList data={data} renderItem={({ item }) => <Shows title={item.title} />} />
    </View>
  );
};

export default ShowsList;
