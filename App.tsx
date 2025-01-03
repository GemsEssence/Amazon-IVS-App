// src/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import BroadcastScreen from './src/screens/BroadcastScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'IVS Broadcasting' }}
        />
        <Stack.Screen 
          name="Broadcast" 
          component={BroadcastScreen}
          options={{
            title: 'Live Broadcast',
            headerBackTitle: 'Leave',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;