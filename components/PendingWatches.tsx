import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import ShowsList from './ShowsList';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const PendingWatches = () => {
  const [getPendingMovies, setPendingMovies] = useState([]);

  // Get movie data and pass into ShowsList
  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const data = await res.json();
        console.log(data);
        setPendingMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    getMovies();
  }, []);

  return (
    <View>
      <ShowsList title="Pending Watches" data={[]} />
    </View>
  );
};

export default PendingWatches;
