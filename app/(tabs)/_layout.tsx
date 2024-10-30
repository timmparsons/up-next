import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Feather name="home" size={20} color="lightgray" />,
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: 'List',
          tabBarIcon: ({ color }) => <Fontisto name="favorite" size={24} color="lightgray" />,
        }}
      />
      <Tabs.Screen
        name="myShows"
        options={{
          title: 'Shows',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="file-movie-o" size={20} color="lightgray" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Feather name="meh" size={20} color="lightgray" />,
        }}
      />
    </Tabs>
  );
}
