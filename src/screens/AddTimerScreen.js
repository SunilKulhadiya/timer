import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTimer } from '../store/timerSlice';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../components/ThemeContext';

export default function AddTimerScreen({ navigation }) {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('Workout');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();

  const saveTimer = () => {
    const parsedDuration = parseInt(duration);
    if (!name.trim() || isNaN(parsedDuration) || parsedDuration <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid name and duration in seconds.');
      return;
    }

    setLoading(true);

    const timer = {
      id: Date.now().toString(),
      name,
      duration: parsedDuration,
      remaining: parsedDuration,
      category,
      status: 'Paused',
    };

    dispatch(addTimer(timer));

    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Home');
    }, 500);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>⏱️ New Timer</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Timer Name"
        placeholderTextColor="#999"
        style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
      />

      <TextInput
        value={duration}
        onChangeText={setDuration}
        placeholder="Duration (seconds)"
        placeholderTextColor="#999"
        keyboardType="numeric"
        style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
      />

      <Text style={[styles.label, { color: colors.text }]}>Category</Text>
      <View style={[styles.pickerWrapper, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={{ color: colors.text }}
        >
          <Picker.Item label="Workout" value="Workout" />
          <Picker.Item label="Study" value="Study" />
          <Picker.Item label="Break" value="Break" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={saveTimer}>
          <Text style={styles.buttonText}>💾 Save Timer</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  label: {
    marginBottom: 6,
    fontSize: 16,
    fontWeight: '500',
  },
  pickerWrapper: {
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
