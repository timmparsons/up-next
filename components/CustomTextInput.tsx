import React from 'react';
import { TextInput } from 'react-native';

type Props = {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  secureTextEntry: boolean;
};

const CustomTextInput = ({ value, placeholder, onChangeText, secureTextEntry }: Props) => (
  <TextInput
    onChangeText={onChangeText}
    value={value}
    placeholder={placeholder}
    autoCapitalize="none"
    secureTextEntry={secureTextEntry}
    className="mb-4 w-full rounded-xl border border-gray-200 p-4"
  />
);

export default CustomTextInput;
