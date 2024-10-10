import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { Text, View } from 'react-native';

const Header = () => {
  return (
    <View className="flex-row items-center justify-between p-8">
      <Text className="text-2xl">Hello, Tim!</Text>
      <MaterialCommunityIcons name="face-man-profile" size={22} color="gray" />
    </View>
  );
};

export default Header;
