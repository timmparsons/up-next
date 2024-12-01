import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Text, View, Pressable } from 'react-native';

const Header = () => {
  return (
    <View className="flex-row items-center justify-between p-5">
      <Text className="text-2xl">Hello, Tim!</Text>
      <View className="flex-row">
        <Pressable>
          <Feather name="bell" className="px-3" size={26} color="gray" />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;
