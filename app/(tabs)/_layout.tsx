import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {
            elevation: 0,
            borderTopWidth: 1,
            borderTopColor: colorScheme === 'dark' ? '#333' : '#ddd',
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="back"
        options={{
          title: 'Back',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="chevron.backward" color={color} />,
        }}
      />
      <Tabs.Screen
        name="forward"
        options={{
          title: 'Forward',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="chevron.forward" color={color} />,
        }}
      />
      <Tabs.Screen
        name="quit"
        options={{
          title: 'Quit',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="xmark.circle" color={color} />,
        }}
      />
    </Tabs>
  );
}
