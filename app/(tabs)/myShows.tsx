import { Stack } from 'expo-router'; // Assuming you're using Expo Router
import { useState, useEffect } from 'react';

import { supabase } from '~/utils/supabase';

export default async function MyShows() {
  const [appUsers, setappUsers] = useState(null);
  const [appError, setAppError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let { data: users, error } = await supabase.from('users').select('*');
      setappUsers(users);
      setAppError(error);
      console.log('QQQ ', appUsers);
      console.log('QQQ-error ', appError);
    }

    fetchData();
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: 'Shows' }} />
      {/* Render something meaningful like a list of users */}
    </>
  );
}
