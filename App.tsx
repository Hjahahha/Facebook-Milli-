import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@react-native-vector-icons/material-community';
import { useTodos } from './src/hooks/useTodos';
import { ThemeProvider } from './src/context/ThemeContext';
import TodoScreen from './src/screens/TodoScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
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
            backgroundColor: '#1f2937',
          },
          headerTintColor: '#f3f4f6',
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
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
