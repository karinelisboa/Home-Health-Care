import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Footer from '../../components/Footer';

export default function PatientDetail() {
  const router = useRouter();
  const { id, date, time, bpm, classification } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{id} Paciente</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Conteúdo scrollável */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Card de informações */}
        <View style={styles.infoCard}>
          <View style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={20} color="#666" />
            <Text style={styles.dateText}>{date}, às {time}</Text>
          </View>

          <Text style={styles.bpm}>{bpm} bpm</Text>
          <Text style={styles.classification}>{classification}</Text>
        </View>

        {/* Botões de ação */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIconCircle}>
              <Ionicons name="call-outline" size={24} color="#00897B" />
            </View>
            <Text style={styles.actionText}>Contato</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIconCircle}>
              <Ionicons name="time-outline" size={24} color="#00897B" />
            </View>
            <Text style={styles.actionText}>Histórico</Text>
          </TouchableOpacity>
        </View>

        {/* ECG Image */}
        <View style={styles.ecgContainer}>
          <Image 
            source={require('../../assets/images/norm.png')} 
            style={styles.ecgImage}
            resizeMode="contain"
          />
          
          {/* Player controls */}
          <View style={styles.playerControls}>
            <TouchableOpacity style={styles.playButton}>
              <Ionicons name="play" size={32} color="#00897B" />
            </TouchableOpacity>
            <View style={styles.progressBar}>
              <View style={styles.progress} />
            </View>
            <TouchableOpacity>
              <Ionicons name="ellipsis-vertical" size={20} color="#999" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  moreButton: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  infoCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  bpm: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00897B',
    marginBottom: 8,
  },
  classification: {
    fontSize: 16,
    color: '#666',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: '#E0F2F1',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 20,
    minWidth: 150,
  },
  actionIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 16,
    color: '#00897B',
    fontWeight: '500',
  },
  ecgContainer: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 0,
    padding: 15,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ecgImage: {
    width: '100%',
    height: 400,
    borderRadius: 8,
  },
  playerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 10,
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0F2F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginRight: 15,
  },
  progress: {
    width: '30%',
    height: '100%',
    backgroundColor: '#00897B',
    borderRadius: 2,
  },
});