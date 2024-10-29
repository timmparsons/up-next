import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, View, Text, SafeAreaView, Pressable, TextInput } from 'react-native';

import CustomTextInput from '~/components/CustomTextInput';
import { supabase } from '~/utils/supabase';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert('Error signing up ', error.message);
    if (!data.session) Alert.alert('Please check your inbox for email verification!');
    const userId = data?.user?.id;

    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{ id: userId, username, avatar_url: '', full_name: name, created_at: new Date() }]);

    if (profileError) {
      console.error('Error inserting profile data:', profileError);
    } else {
      console.log('Profile created successfully');
    }
    setLoading(false);
  }

  return (
    <SafeAreaView className="flex-1 bg-white pt-5">
      <Stack.Screen options={{ title: 'Sign Up', headerBackTitleVisible: false }} />
      <View className="mx-4 mt-52">
        <CustomTextInput value={name} placeholder="Name" onChangeText={(text) => setName(text)} />
        <CustomTextInput
          value={username}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
        />
        <CustomTextInput
          value={email}
          placeholder="email@address.com"
          onChangeText={(text) => setEmail(text)}
        />
        <CustomTextInput
          value={password}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
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
