import React, { useState } from 'react';
import { View, FlatList, Text } from 'react-native';

import Pill from './Pill';

import { GENRE_DATA } from '~/helpers/data';
import PendingWatches from './PendingWatches';
import MovieGenre from './MovieGenre';

const PillList = () => {
  const [genreSelected, setGenreSelected] = useState<number | null>(null);

  return (
    <View>
      <View className="mx-3 my-2">
        <FlatList
          horizontal
          data={GENRE_DATA}
          renderItem={({ item }) => <Pill data={item} setGenreSelected={setGenreSelected} />}
        />
      </View>
      <View>{genreSelected ? <MovieGenre id={genreSelected} /> : <PendingWatches />}</View>
    </View>
  );
};

export default PillList;
