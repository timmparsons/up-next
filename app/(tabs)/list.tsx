import { Stack } from 'expo-router';
import { useState, useEffect } from 'react';
import { FlatList, Text } from 'react-native';

import { supabase } from '~/utils/supabase';

interface User {
  id: string;
  email: string;
  name: string;
  username: string;
}

export default function List() {
  const [appUsers, setAppUsers] = useState<User[]>([]);
  const [appError, setAppError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data: users, error } = await supabase.from('users').select('*');
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
    <>
      <Stack.Screen options={{ title: 'List' }} />
      <Text>Friends List page</Text>
      {appError ? (
        <Text>Error loading users</Text>
      ) : (
        <FlatList
          data={appUsers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Text>{item.username}</Text>}
        />
      )}
    </>
  );
}
