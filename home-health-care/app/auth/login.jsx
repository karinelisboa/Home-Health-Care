import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header com título */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.centerContainer}>
          <Text style={styles.titulo}>Login</Text>
        </View>
        <View style={{ width: 24}} />
      </View>

      {/* Área sombreada com inputs e botão */}
      <View style={styles.content}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="email@email.com"
          keyboardType="email-address"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="senha12345"
          secureTextEntry
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity>
          <Text style={styles.link}>Esqueci a minha senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoEntrar} onPress={() => router.push('/(tabs)')}>
          <Text style={styles.textoBotao}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: 60,
  paddingBottom: 10,
  paddingHorizontal: 20,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
    alignItems: 'flex-start',
  },
  titulo: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },

  content: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 120,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 6,
    elevation: 8,
  },

  label: {
    fontSize: 18,
    marginBottom: 15,
    color: '#000',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 14,
    marginBottom: 30,
    fontSize: 15,
  },
  link: {
    textAlign: 'center',
    fontSize: 14,
    color: '#555',
    marginTop: -2,
  },
  botaoEntrar: {
    backgroundColor: '#007BDF',
    width: '85%',
    paddingVertical: 25,
    borderRadius: 14,
    alignItems: 'center',
    position: 'absolute',
    bottom: 70,
    alignSelf: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
