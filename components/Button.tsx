import { View, Text, Pressable } from 'react-native';
import React from 'react';

interface PropList {
  onPress?: () => void;
  title?: string;
  style?: string;
  textStyle?: string;
}

const Button = (props: PropList) => {
  const { onPress, title, style, textStyle } = props;

  return (
    <View>
      <Pressable className={style} onPress={onPress}>
        <Text className={textStyle}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default Button;
