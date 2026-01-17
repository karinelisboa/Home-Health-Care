import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AlertCardProps {
  date: string;
  time: string;
  classification: string;
  bpm: number;
  patient: string;
  showIcon?: boolean;
  onPress: () => void;
}

const AlertCard: React.FC<AlertCardProps> = ({ 
  date, 
  time, 
  classification, 
  bpm, 
  patient, 
  showIcon = false,
  onPress
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {showIcon && (
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="pulse" size={28} color="#ef5350" />
          </View>
        </View>
      )}
      
      <Text style={styles.dateTime}>{date}, às {time}</Text>
      <Text style={styles.classification}>{classification}</Text>
      <Text style={styles.bpm}>{bpm} bpm</Text>
      <Text style={styles.patient}>Paciente: {patient}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#00897B',
    padding: 20,
    marginBottom: 16,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  iconCircle: {
    width: 48,
    height: 48,
    backgroundColor: '#ffebee',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTime: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  classification: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  bpm: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  patient: {
    fontSize: 14,
    color: '#555',
  },
});

export default AlertCard;