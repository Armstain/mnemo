import React from 'react';
import { Tabs } from 'expo-router';
import { Home, History, Settings, FileText } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#F5B82A',
        tabBarInactiveTintColor: '#0A0A0A',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 2,
          borderTopColor: '#0A0A0A',
          height: 90,
          paddingBottom: 30,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontFamily: 'SpaceMono',
          fontSize: 10,
          textTransform: 'uppercase',
          fontWeight: '900',
          letterSpacing: 1,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dash',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="archive"
        options={{
          title: 'Index',
          tabBarIcon: ({ color }) => <History size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="context"
        options={{
          title: 'Report',
          href: null, // Hide from tab bar, only access via push
        }}
      />
    </Tabs>
  );
}
