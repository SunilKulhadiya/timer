import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import timerReducer from './timerSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['timer'], // persist only timer slice
};

const rootReducer = combineReducers({
  timer: timerReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // necessary for redux-persist
    }),
});

export const persistor = persistStore(store);
