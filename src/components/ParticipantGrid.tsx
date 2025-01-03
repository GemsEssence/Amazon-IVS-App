// src/components/ParticipantGrid.tsx
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

interface Participant {
  id: string;
  username: string;
  isHost: boolean;
  videoView: React.ReactNode;
}

interface Props {
  participants: Participant[];
}

const ParticipantGrid: React.FC<Props> = ({ participants }) => {
  const getGridLayout = () => {
    const count = participants.length;
    if (count === 1) return styles.singleParticipant;
    if (count === 2) return styles.twoParticipants;
    return styles.multipleParticipants;
  };

  return (
    <View style={styles.container}>
      {participants.map((participant) => (
        <View 
          key={participant.id} 
          style={[styles.participantContainer, getGridLayout()]}
        >
          {participant.videoView}
        </View>
      ))}
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  participantContainer: {
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  singleParticipant: {
    width: width,
    height: '100%',
  },
  twoParticipants: {
    width: width / 2,
    height: '100%',
  },
  multipleParticipants: {
    width: width / 2,
    height: '50%',
  },
});

export default ParticipantGrid;