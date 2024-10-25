import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, View, Text, SafeAreaView, Pressable, TextInput } from 'react-native';

import { supabase } from '~/utils/supabase';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });
    console.log('here');
    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <SafeAreaView className="flex-1 bg-white pt-5">
      <Stack.Screen options={{ title: 'Sign In', headerBackTitleVisible: false }} />
      <View className="mx-4 mt-52">
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
          className="mb-4 w-full rounded-xl border border-gray-200 p-4"
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Password"
          autoCapitalize="none"
          className="mb-8 w-full rounded-xl border border-gray-200 p-4"
        />

        <View className="w-full flex-row gap-4">
          <Pressable
            onPress={() => signUpWithEmail()}
            disabled={loading}
            className="flex-1 items-center rounded-xl bg-orange-500 p-5">
            <Text className="text-lg font-bold text-white">Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
