import { MaterialCommunityIcons, FontAwesome, Feather } from '@expo/vector-icons';
import React from 'react';
import { View, Text, Pressable } from 'react-native';

type GenreItem = {
  id: number;
  title: string;
  icon: string;
  iconType: string;
  size: number;
};

type GenreProps = {
  data: GenreItem;
  setGenreSelected: (id: number) => void;
};

const ICON_MAP: Record<string, any> = {
  MaterialCommunityIcons,
  FontAwesome,
  Feather,
};

const Pill: React.FC<GenreProps> = ({ data, setGenreSelected }) => {
  const { id, title, icon, iconType, size } = data;
  const IconComponent = ICON_MAP[iconType];

  return (
    <Pressable
      className="m-2 flex-row items-center rounded-full bg-slate-200 p-3"
      onPress={() => setGenreSelected(id)}>
      {IconComponent && <IconComponent name={icon} size={size} color="black" />}
      <Text className="ml-2">{title}</Text>
    </Pressable>
  );
};

export default Pill;
