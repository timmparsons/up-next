import { Tabs } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { TabBarIcon } from '../../components/TabBarIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          bottom: 30,
          height: 60,
          width: '80%',
          left: '10%',
          alignSelf: 'center',
          borderRadius: 30,
          backgroundColor: '#ffffff',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
          paddingBottom: 0,
        },
        tabBarActiveTintColor: '#007aff',
        tabBarInactiveTintColor: 'gray',
        tabBarIconStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 0,
        },
        tabBarLabelStyle: {
          fontSize: 9,
          fontWeight: 'bold',
          paddingTop: 0,
          marginTop: -7,
          marginBottom: 5,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Feather name="home" size={20} color="lightgray" />,
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <HeaderButton />
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: 'List',
          tabBarIcon: ({ color }) => <Feather name="list" size={20} color="lightgray" />,
        }}
      />
      <Tabs.Screen
        name="myMovies"
        options={{
          title: 'My Movies',
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
