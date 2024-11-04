import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Alert, TextInput, View, Pressable, Text, SafeAreaView } from 'react-native';

import { supabase } from '~/utils/supabase';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }
  console.log('qqq ', isFocused);
  return (
    <SafeAreaView className="flex-1 bg-white pt-5">
      <Stack.Screen options={{ title: 'Log In', headerBackTitleVisible: false }} />
      <View className="mx-4 mt-52">
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoCapitalize="none"
          className="mb-4 w-full rounded-xl border border-gray-200 p-4"
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry
          className="mb-8 w-full rounded-xl border border-gray-200 p-4"
        />

        <View className="w-full flex-row gap-4">
          <Pressable
            onPress={() => signInWithEmail()}
            disabled={loading}
            className="flex-1 items-center rounded-xl border border-orange-500 bg-white p-5">
            <Text className="text-lg font-bold text-orange-500">Log In</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
