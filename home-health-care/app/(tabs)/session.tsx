import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../../components/Footer';

const SessionScreen = () => {
  const handleConnect = () => {
    console.log('Conectando ao paciente...');
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Sessão de monitoramento
        </Text>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <View style={styles.card}>
          
          {/* Icon */}
          <View style={styles.iconContainer}>
            <Ionicons name="swap-horizontal" size={48} color="#fff" />
          </View>

          {/* Card Title */}
          <Text style={styles.cardTitle}>
            Conecte-se a{'\n'}um paciente
          </Text>

          {/* Card Subtitle */}
          <Text style={styles.cardSubtitle}>
            Acompanhe os exames feitos{'\n'}em casa, em tempo real.
          </Text>

          {/* Button */}
          <TouchableOpacity
            style={styles.connectButton}
            onPress={handleConnect}
            activeOpacity={0.85}
          >
            <Text style={styles.connectButtonText}>
              Conectar agora
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <Footer activeTab="session" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8DED9',
  },

  /* Header */
  header: {
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 12,
    backgroundColor: '#C8DED9',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1A1A1A',
    lineHeight: 30,
  },

  /* Content */
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 80,
  },

  /* Card */
  card: {
    backgroundColor: '#F0F0F0',
    borderRadius: 28,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  iconContainer: {
    backgroundColor: '#4DB6AC',
    width: 88,
    height: 88,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#4DB6AC',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 28,
  },

  cardSubtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 22,
  },

  connectButton: {
    backgroundColor: '#00897B',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 50,
    minWidth: 200,
    alignItems: 'center',
    shadowColor: '#00897B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },

  connectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SessionScreen;
