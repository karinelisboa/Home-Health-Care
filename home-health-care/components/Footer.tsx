import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface FooterProps {
  activeTab?: 'home' | 'session' | 'stats' | 'profile';
}

const Footer: React.FC<FooterProps> = ({ activeTab = 'home' }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item} onPress={() => router.push('/')}>
        <Ionicons name="home" size={28} color={activeTab === 'home' ? '#00897B' : '#999'} />
        <Text style={activeTab === 'home' ? styles.textActive : styles.textInactive}>Início</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => router.push('/(tabs)/session')}>
        <Ionicons name="swap-horizontal" size={28} color={activeTab === 'session' ? '#00897B' : '#999'} />
        <Text style={activeTab === 'session' ? styles.textActive : styles.textInactive}>Sessão</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => router.push('/(tabs)/stats')}>
        <Ionicons name="stats-chart" size={28} color={activeTab === 'stats' ? '#00897B' : '#999'} />
        <Text style={activeTab === 'stats' ? styles.textActive : styles.textInactive}>Estatísticas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => router.push('/(tabs)/profile')}>
        <Ionicons name="person" size={28} color={activeTab === 'profile' ? '#00897B' : '#999'} />
        <Text style={activeTab === 'profile' ? styles.textActive : styles.textInactive}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

// ... (mantenha os estilos iguais)

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  item: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  textActive: {
    fontSize: 12,
    color: '#00897B',
    fontWeight: '500',
    marginTop: 4,
  },
  textInactive: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});

export default Footer;