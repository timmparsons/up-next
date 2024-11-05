import AntDesign from '@expo/vector-icons/AntDesign';
import { Stack } from 'expo-router';
import { useState, useEffect } from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  SafeAreaView,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';

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
        .neq('id', session.user.id);

      if (error) {
        setAppError(error.message);
      } else {
        setAppUsers(users ?? []);
        setAppError(null);
      }
    }

    fetchData();
  }, []);

  const addFriend = async (friendId: string) => {
    try {
      const { data, error } = await supabase
        .from('friends')
        .insert([{ user_id: session.user.id, friend_id: friendId, status: 'pending' }]);

      if (error) {
        throw error;
      }

      Alert.alert('Friend request sent!');
    } catch (error) {
      console.error('Error sending friend request:', error.message);
      Alert.alert('Failed to send friend request');
    }
  };

  return (
    <SafeAreaView className="mt-3 px-3">
      <Stack.Screen options={{ title: 'List', headerShown: false }} />
      <SearchBar />
      <Text className="m-5 font-bold">Add friends</Text>
      {appError ? (
        <View>
          <Text>You don't have any friends in your list. Try searching for them:</Text>
          <Button title="Search" onPress={() => {}} />
        </View>
      ) : (
        <FlatList
          data={appUsers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <View className="my-2 flex-row items-center rounded-lg border border-slate-200 bg-white p-4">
                {/* Profile Picture */}
                <Image
                  source={{
                    uri: item.avatar_url || 'https://reactnative.dev/img/tiny_logo.png',
                  }}
                  className="h-16 w-16 rounded-full"
                />

                {/* Profile Info */}
                <View className="ml-4 flex-1">
                  <Text className="font-bold">{item.full_name}</Text>
                  <Text className="text-slate-500">@{item.username}</Text>
                </View>

                {/* Add Friend Button */}
                <TouchableOpacity onPress={() => addFriend(item.id)} className="ml-auto p-2">
                  <AntDesign name="pluscircleo" size={24} color="black" />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}
