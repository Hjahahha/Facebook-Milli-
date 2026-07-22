import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { ThemeProvider } from './src/context/ThemeContext';
import Navigation from './src/navigation/Navigation';

export default function App() {
  return (
    <ThemeProvider>
      <Navigation />
      <StatusBar barStyle="light-content" />
    </ThemeProvider>
  );
}
