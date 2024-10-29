import { Stack } from 'expo-router';
import { useState, useEffect } from 'react';
import { FlatList, Text, View, Image, SafeAreaView } from 'react-native';
import SearchBar from '~/components/SearchBar';

import { supabase } from '~/utils/supabase';

interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  fullName: string;
}

export default function List() {
  const [appUsers, setAppUsers] = useState<User[]>([]);
  const [appError, setAppError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data: users, error } = await supabase.from('profiles').select('*');
      if (error) {
        setAppError(error.message);
      } else {
        setAppUsers(users ?? []);
        setAppError(null);
      }
    }

    fetchData();
  }, []);
  console.log('qqq ', appUsers);
  return (
    <SafeAreaView className="mt-3 px-3">
      <Stack.Screen options={{ title: 'List', headerShown: false }} />
      <Text>Friends List page</Text>
      <SearchBar />
      {appError ? (
        <Text>Error loading users</Text>
      ) : (
        <FlatList
          data={appUsers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="my-2 items-center rounded-lg border border-slate-200 bg-white p-2">
              <Image
                source={{
                  uri: 'https://reactnative.dev/img/tiny_logo.png',
                }}
                className="mb-2 h-16 w-16 rounded-full"
              />

              <Text className="font-bold">{item.full_name}</Text>
              <Text className="">@{item.username}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
