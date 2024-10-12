import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Text, View } from 'react-native';

const Header = () => {
  return (
    <View className="flex-row items-center justify-between p-8">
      <Text className="text-2xl">Hello, Tim!</Text>
      <View className="flex-row">
        <Feather name="bell" className="px-3" size={22} color="gray" />
        <MaterialCommunityIcons name="face-man-profile" className="px-3" size={22} color="gray" />
      </View>
    </View>
  );
};

export default Header;
