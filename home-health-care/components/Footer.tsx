import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Footer: React.FC = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item}>
        <Ionicons name="home" size={28} color="#00897B" />
        <Text style={styles.textActive}>Início</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.item}>
        <Ionicons name="swap-horizontal" size={28} color="#999" />
        <Text style={styles.textInactive}>Sessão</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.item}>
        <Ionicons name="stats-chart" size={28} color="#999" />
        <Text style={styles.textInactive}>Estatísticas</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.item}>
        <Ionicons name="person" size={28} color="#999" />
        <Text style={styles.textInactive}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

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