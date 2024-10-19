import React, { useState } from 'react';
import { View, FlatList, Text } from 'react-native';

import MovieGenre from './MovieGenre';
import PendingWatches from './PendingWatches';
import Pill from './Pill';

import { GENRE_DATA } from '~/helpers/data';

const PillList = () => {
  const [genreSelected, setGenreSelected] = useState<number | null>(null);

  return (
    <View>
      <View className="mx-3 my-2">
        <FlatList
          horizontal
          data={GENRE_DATA}
          renderItem={({ item }) => (
            <Pill data={item} genreSelected={genreSelected} setGenreSelected={setGenreSelected} />
          )}
        />
      </View>
      {/* <View>{genreSelected ? <MovieGenre id={genreSelected} /> : <PendingWatches />}</View> */}
      <View>{/* <MovieGenre id={genreSelected} /> */}</View>
    </View>
  );
};

export default PillList;
