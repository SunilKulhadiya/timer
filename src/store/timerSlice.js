import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  timers: [],
  history: [],
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    addTimer: (state, action) => {
      state.timers.push(action.payload);
    },
    updateTimer: (state, action) => {
      const index = state.timers.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.timers[index] = action.payload;
      }
    },
    removeTimer: (state, action) => {
      state.timers = state.timers.filter(t => t.id !== action.payload);
    },
    resetTimers: (state, action) => {
      state.timers = action.payload;
    },
    addHistory: (state, action) => {
      state.history.push(action.payload);
    },
    resetHistory: (state, action) => {
      state.history = action.payload;
    },
  },
});

export const {
  addTimer,
  updateTimer,
  removeTimer,
  resetTimers,
  addHistory,
  resetHistory,
} = timerSlice.actions;

export default timerSlice.reducer;
