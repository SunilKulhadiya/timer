import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../components/ThemeContext';

export default function SettingsScreen() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <Text style={[styles.text, { color: isDark ? '#fff' : '#000' }]}>
        {isDark ? 'Dark Mode' : 'Light Mode'}
      </Text>
      <Switch value={isDark} onValueChange={toggleTheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 18, marginBottom: 12 },
});
