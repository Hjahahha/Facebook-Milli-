import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface SafeAreaProps {
  children: React.ReactNode;
}

export const SafeContainer: React.FC<SafeAreaProps> = ({ children }) => {
  const { isDark } = useTheme();
  const bg = isDark ? '#111827' : '#ffffff';

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
