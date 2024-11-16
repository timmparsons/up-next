import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';

import { imageStyle } from '../constants';

type Tab = {
  name: string;
  title: string;
  IconType?: typeof Feather | typeof FontAwesome;
  iconName?: string;
  customIcon?: boolean;
};

type IconProps = {
  IconType: typeof Feather | typeof FontAwesome;
  name: string;
  color: string;
  focused: boolean;
};

const Icon = ({ IconType, name, color, focused }: IconProps) => (
  <IconType name={name} size={20} color={focused ? color : 'lightgray'} />
);

const tabs: Tab[] = [
  {
    name: 'index',
    title: 'Home',
    IconType: Feather,
    iconName: 'home',
  },
  {
    name: 'friends',
    title: 'Friends',
    IconType: Feather,
    iconName: 'list',
  },
  {
    name: 'myShows',
    title: 'Shows',
    IconType: FontAwesome,
    iconName: 'file-movie-o',
  },
  {
    name: 'profile',
    title: 'Profile',
    customIcon: true,
  },
];

const renderIcon = (tab: Tab, focused: boolean) => {
  if (tab.customIcon) {
    return (
      <Image
        style={[imageStyle, { marginTop: 4 }]}
        source={{ uri: 'https://img.icons8.com/forma-regular/24/1A1A1A/user.png' }}
        tintColor={focused ? 'lightsalmon' : 'lightgray'}
      />
    );
  }
  return (
    <Icon IconType={tab.IconType!} name={tab.iconName!} color="lightsalmon" focused={focused} />
  );
};

const TabLayout = () => {
  return (
    <Tabs>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) => renderIcon(tab, focused),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;
