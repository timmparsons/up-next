import React from 'react';
import { View, Text } from 'react-native';

type ShowProps = { title: string };

const Shows = ({ title }: ShowProps) => (
  <View>
    <Text>{title}</Text>
  </View>
);

export default Shows;
