import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { store, persistor } from './src/store/store';
import HomeScreen from './src/screens/HomeScreen';
import AddTimerScreen from './src/screens/AddTimerScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import SettingsScreen from './src/screens/SettingScreen'; // ✅ Correct
import { ThemeProvider } from './src/components/ThemeContext'; // ✅ Correct

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  headerShown: true,
                  tabBarShowLabel: true,
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
                    else if (route.name === 'Add') iconName = focused ? 'add-circle' : 'add-circle-outline';
                    else if (route.name === 'History') iconName = focused ? 'time' : 'time-outline';
                    else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';

                    return <Ionicons name={iconName} size={size} color={color} />;
                  },
                  tabBarActiveTintColor: '#0EBFF4',
                  tabBarInactiveTintColor: 'gray',
                })}
              >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Add" component={AddTimerScreen} />
                <Tab.Screen name="History" component={HistoryScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
              </Tab.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
