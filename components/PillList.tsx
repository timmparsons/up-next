import React from 'react';
import { View, FlatList } from 'react-native';

import Pill from './Pill';

import { GENRE_DATA } from '~/helpers/data';

const PillList = () => {
  return (
    <View className="mx-3 my-2">
      <FlatList horizontal data={GENRE_DATA} renderItem={({ item }) => <Pill data={item} />} />
    </View>
  );
};

export default PillList;
