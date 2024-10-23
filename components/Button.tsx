import { View, Text, Pressable } from 'react-native';
import React from 'react';

interface PropList {
  onPress: () => void;
  title: string;
  style: string;
}

const Button = (props: PropList) => {
  const { onPress, title, style } = props;

  return (
    <View>
      <Pressable className={style} onPress={onPress}>
        <Text>{title}</Text>
      </Pressable>
    </View>
  );
};

export default Button;
