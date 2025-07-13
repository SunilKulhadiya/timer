import React, { useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import TimerCard from '../components/TimerCard';
import { startTimersInCategory, pauseTimersInCategory, resetTimersInCategory } from '../store/timerSlice';
import { useTheme } from '../components/ThemeContext';

export default function HomeScreen() {
  const timers = useSelector(state => state.timer.timers);
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const categories = [...new Set(timers.map(timer => timer.category))];
  const [expanded, setExpanded] = useState(categories.reduce((acc, cur) => ({ ...acc, [cur]: true }), {}));

  return (
    <View style={[styles.containerMain, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>Timers</Text>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        {categories.map(category => (
          <View key={category} style={styles.categorySection}>
            <TouchableOpacity onPress={() => setExpanded({ ...expanded, [category]: !expanded[category] })}>
              <Text style={[styles.categoryHeader, { color: colors.text }]}>
                {expanded[category] ? '▼' : '►'} {category}
              </Text>
            </TouchableOpacity>
            <View style={styles.actionsRow}>
              <Button title="Start All" onPress={() => dispatch(startTimersInCategory(category))} />
              <Button title="Pause All" onPress={() => dispatch(pauseTimersInCategory(category))} />
              <Button title="Reset All" onPress={() => dispatch(resetTimersInCategory(category))} />
            </View>
            {expanded[category] && timers.filter(t => t.category === category).map(timer => (
              <TimerCard key={timer.id} timer={timer} />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerMain: { flex: 1, padding: 2 },
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  categorySection: { marginBottom: 20 },
  categoryHeader: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
});
