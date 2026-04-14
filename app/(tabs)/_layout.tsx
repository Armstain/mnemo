import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Archive } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#8B9E7E',
        tabBarInactiveTintColor: '#9E9890',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#F5F0EB',
          borderTopWidth: 0.5,
          borderTopColor: '#DDD6CD',
          height: 88,
          paddingBottom: 32,
          paddingTop: 12,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter_500Medium',
          fontSize: 11,
          letterSpacing: 0.3,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={22} color={color} strokeWidth={1.8} />,
        }}
      />
      <Tabs.Screen
        name="archive"
        options={{
          title: 'Archive',
          tabBarIcon: ({ color }) => <Archive size={22} color={color} strokeWidth={1.8} />,
        }}
      />
      <Tabs.Screen
        name="context"
        options={{
          title: 'Detail',
          href: null,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
