// src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeModules } from 'react-native';

const { BroadcastManager } = NativeModules;

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');

  const handleCreateStage = async () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Please enter a username');
      return;
    }

    try {
      const response = await BroadcastManager.createStage();
      if (response.success) {
        navigation.navigate('Broadcast', {
          stageData: response,
          username,
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create stage');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>IVS Broadcasting</Text>
      
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your username"
        placeholderTextColor="#999"
      />

      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCreateStage}
      >
        <Text style={styles.buttonText}>Create Stage</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    color: '#FFF',
    backgroundColor: '#1A1A1A',
  },
  createButton: {
    backgroundColor: '#FF0000',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;