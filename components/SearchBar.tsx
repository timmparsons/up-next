import Feather from '@expo/vector-icons/Feather';
import { TextInput, View } from 'react-native';

import PillList from './PillList';

const SearchBar = () => {
  return (
    <View className="mx-5 flex-row items-center rounded-full bg-slate-200 p-3">
      <Feather name="search" size={18} color="darkgray" />
      <TextInput className="ml-2 flex-1" placeholder="Search" />
    </View>
  );
};

export default SearchBar;
