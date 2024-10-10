import { View, Text } from 'react-native';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

type Props = {
  title: string;
};

type ItemProps = { id?: number; title: string };

const data = [
  {
    id: 1,
    name: 'Godfather',
  },
  {
    id: 2,
    name: 'Usual Suspects',
  },
];

const Item = ({ title }) => (
  <View>
    <Text>{title}</Text>
  </View>
);

const ShowsList = ({ title }: Props) => {
  return (
    <View className="p-8">
      <Text className="text-2xl font-extrabold">{title}</Text>
      <FlatList
        data={data}
        renderItem={
          <View>
            <Text>{title}</Text>
          </View>
        }
      />
    </View>
  );
};

export default ShowsList;
