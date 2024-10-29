import React from 'react';
import { TextInput } from 'react-native';

type Props = {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
};

const CustomTextInput = ({ value, placeholder, onChangeText }: Props) => (
  <TextInput
    onChangeText={onChangeText}
    value={value}
    placeholder={placeholder}
    autoCapitalize="none"
    className="mb-4 w-full rounded-xl border border-gray-200 p-4"
  />
);

export default CustomTextInput;
