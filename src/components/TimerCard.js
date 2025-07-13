import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, ProgressBarAndroid, StyleSheet, Modal, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateTimer, addHistory } from '../store/timerSlice';
import { useTheme } from '../components/ThemeContext';

export default function TimerCard({ timer }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [remaining, setRemaining] = useState(timer.remaining);
  const intervalRef = useRef(null);
  const { colors } = useTheme();

  useEffect(() => {
    if (timer.status === 'Running') {
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - (timer.startedAt || Date.now())) / 1000);
        const newRemaining = Math.max(timer.duration - elapsed, 0);
        setRemaining(newRemaining);

        if (newRemaining === 0) {
          clearInterval(interval);
          dispatch(updateTimer({ ...timer, remaining: 0, status: 'Completed' }));
          dispatch(addHistory({ name: timer.name, completedAt: Date.now() }));
          setShowModal(true);
        }
      }, 500);
      intervalRef.current = interval;
      return () => clearInterval(interval);
    } else {
      setRemaining(timer.remaining);
    }
  }, [timer.status]);

  const start = () => {
    dispatch(updateTimer({ ...timer, status: 'Running', startedAt: Date.now() }));
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    dispatch(updateTimer({ ...timer, status: 'Paused', remaining }));
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    dispatch(updateTimer({ ...timer, remaining: timer.duration, status: 'Paused' }));
    setRemaining(timer.duration);
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Text style={[styles.title, { color: colors.text }]}>{timer.name}</Text>
      <Text style={[styles.category, { color: colors.text }]}>Category: {timer.category}</Text>
      <Text style={[styles.text, { color: colors.text }]}>Time Left: {remaining}s</Text>
      <Text style={[styles.text, { color: colors.text }]}>Status: {timer.status}</Text>
      <View style={styles.progressWrapper}>
        <ProgressBarAndroid
          styleAttr="Horizontal"
          progress={remaining / timer.duration}
          indeterminate={false}
          color="#4CAF50"
        />
      </View>
      <View style={styles.buttonRow}>
        {timer.status !== 'Running' ? (
          <Button title="Start" color="#4CAF50" onPress={start} />
        ) : (
          <Button title="Pause" color="#FFC107" onPress={pause} />
        )}
        <Button title="Reset" color="#F44336" onPress={reset} />
      </View>
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalText, { color: colors.text }]}>🎉 {timer.name} Completed!</Text>
            <Pressable style={styles.modalButton} onPress={() => setShowModal(false)}>
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  category: { fontSize: 14, marginBottom: 8 },
  text: { fontSize: 14, marginBottom: 4 },
  progressWrapper: { marginVertical: 12 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { padding: 20, borderRadius: 12, alignItems: 'center' },
  modalText: { fontSize: 18, marginBottom: 12 },
  modalButton: { backgroundColor: '#4CAF50', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  modalButtonText: { color: '#fff', fontWeight: '600' },
});
