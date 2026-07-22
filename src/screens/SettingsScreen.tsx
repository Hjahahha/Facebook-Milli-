import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { useTodos } from '../hooks/useTodos';

const SettingsScreen: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { stats, clearCompleted } = useTodos();

  const theme = {
    bg: isDark ? '#111827' : '#ffffff',
    card: isDark ? '#1f2937' : '#f3f4f6',
    text: isDark ? '#f3f4f6' : '#111827',
    subtext: isDark ? '#9ca3af' : '#6b7280',
    border: isDark ? '#374151' : '#e5e7eb',
  };

  const handleClearCompleted = () => {
    Alert.alert(
      'Clear Completed Tasks',
      `Delete ${stats.completed} completed task(s)?`,
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Clear',
          onPress: () => {
            clearCompleted();
            Alert.alert('Success', 'Completed tasks cleared');
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Data',
      'This will delete ALL tasks and cannot be undone',
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Clear All',
          onPress: async () => {
            await AsyncStorage.removeItem('@todos_storage');
            Alert.alert('Success', 'All data cleared');
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <ScrollView>
        {/* Theme */}
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Appearance
            </Text>
          </View>
          <View style={[styles.settingItem, { borderBottomColor: theme.border }]}>
            <View style={styles.settingInfo}>
              <MaterialCommunityIcons
                name={isDark ? 'moon-waning-crescent' : 'white-balance-sunny'}
                size={20}
                color="#f59e0b"
              />
              <Text style={[styles.settingLabel, { color: theme.text }]}>
                Dark Mode
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#d1d5db', true: '#6366f1' }}
              thumbColor={isDark ? '#818cf8' : '#e5e7eb'}
            />
          </View>
        </View>

        {/* Data Management */}
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Data
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.settingItem, { borderBottomColor: theme.border }]}
            onPress={handleClearCompleted}
            disabled={stats.completed === 0}
          >
            <View style={styles.settingInfo}>
              <MaterialCommunityIcons
                name="trash-can"
                size={20}
                color={stats.completed === 0 ? theme.subtext : '#ef4444'}
              />
              <View>
                <Text
                  style={[
                    styles.settingLabel,
                    {
                      color:
                        stats.completed === 0 ? theme.subtext : theme.text,
                    },
                  ]}
                >
                  Clear Completed Tasks
                </Text>
                <Text style={[styles.settingDesc, { color: theme.subtext }]}>
                  {stats.completed} completed
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleClearAll}
          >
            <View style={styles.settingInfo}>
              <MaterialCommunityIcons
                name="delete-alert"
                size={20}
                color="#ef4444"
              />
              <View>
                <Text style={[styles.settingLabel, { color: '#ef4444' }]}>
                  Clear All Data
                </Text>
                <Text style={[styles.settingDesc, { color: theme.subtext }]}>
                  Delete all tasks permanently
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Statistics
            </Text>
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: '#6366f1' }]}>
                {stats.total}
              </Text>
              <Text style={[styles.statLabel, { color: theme.subtext }]}>
                Total Tasks
              </Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: '#10b981' }]}>
                {stats.active}
              </Text>
              <Text style={[styles.statLabel, { color: theme.subtext }]}>
                Active
              </Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: '#8b5cf6' }]}>
                {stats.completed}
              </Text>
              <Text style={[styles.statLabel, { color: theme.subtext }]}>
                Completed
              </Text>
            </View>
          </View>
        </View>

        {/* About */}
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              About
            </Text>
          </View>
          <View style={[styles.aboutItem, { borderBottomColor: theme.border }]}>
            <Text style={[styles.aboutLabel, { color: theme.subtext }]}>
              App Version
            </Text>
            <Text style={[styles.aboutValue, { color: theme.text }]}>
              1.0.0
            </Text>
          </View>
          <View style={styles.aboutItem}>
            <Text style={[styles.aboutLabel, { color: theme.subtext }]}>
              Built with
            </Text>
            <Text style={[styles.aboutValue, { color: theme.text }]}>
              React Native + Expo
            </Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    borderRadius: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    overflow: 'hidden',
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  settingDesc: {
    fontSize: 12,
    marginTop: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
  },
  aboutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  aboutLabel: {
    fontSize: 14,
  },
  aboutValue: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SettingsScreen;
