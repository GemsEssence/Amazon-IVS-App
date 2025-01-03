// src/screens/BroadcastScreen.tsx
import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { NativeModules, NativeEventEmitter } from 'react-native';
import StageView from '../components/StageView';
import BroadcastControls from '../components/BroadcastControls';
import ParticipantGrid from '../components/ParticipantGrid';

const { BroadcastManager } = NativeModules;
const broadcastEventEmitter = new NativeEventEmitter(BroadcastManager);

const BroadcastScreen = ({ route, navigation }) => {
  const { stageData, username } = route.params;
  const stageViewRef = useRef(null);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const stateSubscription = broadcastEventEmitter.addListener(
      'onBroadcastStateChanged',
      (event) => {
        if (event.state === 'connected') {
          setIsBroadcasting(true);
        } else if (event.state === 'disconnected') {
          setIsBroadcasting(false);
        }
      }
    );

    const errorSubscription = broadcastEventEmitter.addListener(
      'onBroadcastError',
      (event) => {
        Alert.alert('Broadcast Error', event.error);
      }
    );

    return () => {
      stateSubscription.remove();
      errorSubscription.remove();
      handleStopBroadcast();
    };
  }, []);

  const handleToggleBroadcast = async () => {
    try {
      if (!isBroadcasting) {
        await BroadcastManager.initializeBroadcast(
          stageData.ingestEndpoint,
          stageData.streamKey
        );
      } else {
        await BroadcastManager.stopBroadcast();
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleFlipCamera = () => {
    stageViewRef.current?.flipCamera();
  };

  const handleToggleAudio = () => {
    stageViewRef.current?.toggleAudio(!isAudioMuted);
    setIsAudioMuted(!isAudioMuted);
  };

  const handleToggleVideo = () => {
    setIsVideoMuted(!isVideoMuted);
  };

  return (
    <View style={styles.container}>
      <View style={styles.previewContainer}>
        <StageView
          ref={stageViewRef}
          style={styles.stageView}
        />
      </View>
      
      <ParticipantGrid
        participants={[
          {
            id: 'local',
            username,
            isHost: true,
            videoView: <StageView style={styles.participantView} />,
          },
          ...participants,
        ]}
      />

      <BroadcastControls
        isBroadcasting={isBroadcasting}
        isAudioMuted={isAudioMuted}
        isVideoMuted={isVideoMuted}
        onFlipCamera={handleFlipCamera}
        onToggleAudio={handleToggleAudio}
        onToggleVideo={handleToggleVideo}
        onToggleBroadcast={handleToggleBroadcast}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  previewContainer: {
    flex: 0.5,
  },
  stageView: {
    flex: 1,
  },
  participantView: {
    flex: 1,
  },
});

export default BroadcastScreen;