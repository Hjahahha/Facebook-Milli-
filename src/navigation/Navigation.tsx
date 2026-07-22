import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TodoScreen from '../screens/TodoScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useTheme } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const { isDark } = useTheme();

  const colors = {
    bg: isDark ? '#111827' : '#ffffff',
    card: isDark ? '#1f2937' : '#f3f4f6',
    text: isDark ? '#f3f4f6' : '#111827',
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = 'check-circle';
            if (route.name === 'Todos') iconName = 'check-circle';
            else if (route.name === 'Categories') iconName = 'tag-multiple';
            else if (route.name === 'Settings') iconName = 'cog';
            return (
              <MaterialCommunityIcons name={iconName} size={size} color={color} />
            );
          },
          tabBarActiveTintColor: '#6366f1',
          tabBarInactiveTintColor: '#9ca3af',
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.card,
            borderBottomWidth: 1,
            borderBottomColor: isDark ? '#374151' : '#e5e7eb',
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
            color: colors.text,
          },
          tabBarStyle: {
            backgroundColor: colors.card,
            borderTopColor: isDark ? '#374151' : '#e5e7eb',
            borderTopWidth: 1,
          },
        })}
      >
        <Tab.Screen
          name="Todos"
          component={TodoScreen}
          options={{
            title: 'My Tasks',
            tabBarLabel: 'Tasks',
          }}
        />
        <Tab.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{
            title: 'Categories',
            tabBarLabel: 'Categories',
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Settings',
            tabBarLabel: 'Settings',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
