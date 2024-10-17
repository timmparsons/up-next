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
  genreSelected: number | null;
};

const ICON_MAP: Record<string, any> = {
  MaterialCommunityIcons,
  FontAwesome,
  Feather,
};

const Pill: React.FC<GenreProps> = ({ data, setGenreSelected, genreSelected }) => {
  const { id, title, icon, iconType, size } = data;
  const IconComponent = ICON_MAP[iconType];

  // Check if this pill is selected
  const isSelected = genreSelected === id;

  return (
    <Pressable
      className={`m-2 flex-row items-center rounded-full p-3 ${
        isSelected ? 'bg-slate-400' : 'bg-slate-200'
      }`}
      onPress={() => setGenreSelected(id)}>
      {IconComponent && (
        <IconComponent name={icon} size={size} color={isSelected ? 'white' : 'black'} />
      )}
      <Text className={`ml-2 ${isSelected ? 'text-white' : 'text-black'}`}>{title}</Text>
    </Pressable>
  );
};

export default Pill;
