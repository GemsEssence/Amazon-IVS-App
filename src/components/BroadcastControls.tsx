// src/components/BroadcastControls.tsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  isBroadcasting: boolean;
  isAudioMuted: boolean;
  isVideoMuted: boolean;
  onFlipCamera: () => void;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  onToggleBroadcast: () => void;
}

const BroadcastControls: React.FC<Props> = ({
  isBroadcasting,
  isAudioMuted,
  isVideoMuted,
  onFlipCamera,
  onToggleAudio,
  onToggleVideo,
  onToggleBroadcast,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.controlButton} 
        onPress={onToggleAudio}
      >
        <Icon 
          name={isAudioMuted ? 'mic-off' : 'mic'} 
          size={24} 
          color="#FFFFFF" 
        />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.controlButton, styles.broadcastButton]} 
        onPress={onToggleBroadcast}
      >
        <Icon 
          name={isBroadcasting ? 'stop' : 'play-arrow'} 
          size={30} 
          color="#FFFFFF" 
        />
        <Text style={styles.buttonText}>
          {isBroadcasting ? 'Stop' : 'Start'} Broadcast
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.controlButton} 
        onPress={onToggleVideo}
      >
        <Icon 
          name={isVideoMuted ? 'videocam-off' : 'videocam'} 
          size={24} 
          color="#FFFFFF" 
        />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.controlButton} 
        onPress={onFlipCamera}
      >
        <Icon 
          name="flip-camera-ios" 
          size={24} 
          color="#FFFFFF" 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  broadcastButton: {
    width: 120,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF0000',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 4,
  },
});

export default BroadcastControls;