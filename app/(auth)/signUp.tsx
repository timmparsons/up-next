import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  View,
  Text,
  SafeAreaView,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import CustomTextInput from '~/components/CustomTextInput';
import { supabase } from '~/utils/supabase';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (confirmPassword && text !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
    }
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    if (password && text !== password) {
      setError('Passwords do not match');
    } else {
      setError('');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white pt-5">
      <Stack.Screen options={{ title: 'Sign Up', headerBackTitleVisible: false }} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
          keyboardShouldPersistTaps="handled">
          <View className="mx-4 mt-52">
            <Text className="pb-3 text-xl font-extrabold">Register</Text>

            <CustomTextInput
              value={name}
              placeholder="Name"
              secureTextEntry={false}
              onChangeText={(text) => setName(text)}
            />

            <CustomTextInput
              value={username}
              placeholder="Username"
              secureTextEntry={false}
              onChangeText={(text) => setUsername(text)}
            />

            <CustomTextInput
              value={email}
              placeholder="email@address.com"
              secureTextEntry={false}
              onChangeText={(text) => setEmail(text)}
            />

            <CustomTextInput
              value={password}
              placeholder="Password"
              secureTextEntry
              onChangeText={handlePasswordChange}
            />

            <CustomTextInput
              value={confirmPassword}
              placeholder="Confirm Password"
              secureTextEntry
              onChangeText={handleConfirmPasswordChange}
            />

            {error ? <Text className="pb-4 text-rose-600">{error}</Text> : null}

            <View className="w-full flex-row gap-4">
              <Pressable
                onPress={() => signUpWithEmail()}
                disabled={loading}
                className="flex-1 items-center rounded-xl bg-orange-500 p-5">
                <Text className="text-lg font-bold text-white">Sign Up</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
