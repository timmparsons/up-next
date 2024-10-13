import { MaterialCommunityIcons, FontAwesome, Feather } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';

type GenreItem = {
  id: string;
  title: string;
  icon: string;
  iconType: string;
  size: number;
};

type GenreProps = {
  data: GenreItem;
};

const ICON_MAP: Record<string, any> = {
  MaterialCommunityIcons,
  FontAwesome,
  Feather,
};

const Pill: React.FC<GenreProps> = ({ data }) => {
  const { title, icon, iconType, size } = data;
  const IconComponent = ICON_MAP[iconType];

  return (
    <View className="m-2 flex-row items-center rounded-full bg-slate-200 p-3">
      {IconComponent && <IconComponent name={icon} size={size} color="black" />}
      <Text className="ml-2">{title}</Text>
    </View>
  );
};

export default Pill;
