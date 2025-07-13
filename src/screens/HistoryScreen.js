import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '../components/ThemeContext';

export default function HistoryScreen() {
  const history = useSelector((state) => state.timer.history);
  const { colors } = useTheme();

  const renderItem = ({ item }) => {
    const date = new Date(item.completedAt).toLocaleString();
    return (
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.timerName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.timerDate, { color: colors.text }]}>{date}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>📋 Completed Timers</Text>

      {history.length === 0 ? (
        <Text style={[styles.empty, { color: colors.text }]}>No timers completed yet.</Text>
      ) : (
        <FlatList
          data={history}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  list: {
    paddingBottom: 30,
  },
  card: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  timerName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  timerDate: {
    fontSize: 14,
  },
  empty: {
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 80,
  },
});
