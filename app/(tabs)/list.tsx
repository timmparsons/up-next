import { Stack } from 'expo-router';
import { useState, useEffect } from 'react';
import { FlatList, Text, View, Image, SafeAreaView, Button } from 'react-native';

import SearchBar from '~/components/SearchBar';
import { useAuth } from '~/context/AuthProvider';
import { supabase } from '~/utils/supabase';

interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  full_name: string;
}

export default function List() {
  const [appUsers, setAppUsers] = useState<User[]>([]);
  const [appError, setAppError] = useState<string | null>(null);
  const { session } = useAuth();

  useEffect(() => {
    async function fetchData() {
      const { data: users, error } = await supabase
        .from('profiles')
        .select('*')
        .not('id', 'is', session?.user);
      if (error) {
        setAppError(error.message);
      } else {
        setAppUsers(users ?? []);
        setAppError(null);
      }
    }

    fetchData();
  }, []);

  return (
    <SafeAreaView className="mt-3 px-3">
      <Stack.Screen options={{ title: 'List', headerShown: false }} />
      <SearchBar />
      <Text>Friends List page</Text>
      {appError ? (
        <View>
          <Text>You don't have any friends in your list. Try searching for them:</Text>
          <Button title="Search" onPress={() => {}} />
        </View>
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
