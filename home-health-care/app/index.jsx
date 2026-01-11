import { useRouter } from "expo-router";
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { CardAutenticacao } from '../components/CardAutenticacao';


export default function PaginaInicial() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      
      <View style={styles.topContent}>
        <Image
          source={require('../assets/images/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>Home Health Care</Text>
        <Text style={styles.tagline}>Saúde em casa, conectada.</Text>
      </View>
      <CardAutenticacao>
        
        <View style={{ marginBottom: 10 }} />

        <TouchableOpacity 
          style={styles.botaoLogin}
          onPress={() => router.push("/auth/login")}
        >
          <Text style={styles.textoBotaoLogin}>Faça login</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.botaoCriarConta}
          onPress={() => router.push("/auth/cadastro")}
        >
          <Text style={styles.textoBotaoCriarConta}>Crie sua conta</Text>
        </TouchableOpacity>

      </CardAutenticacao>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'flex-end',
  },
  topContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20, 
  },
  logo: {
    width: 180, 
    height: 180,
    marginBottom: 15,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00897B',
    marginBottom: 5,
  },
  tagline: {
    fontSize: 16,
    color: '#555',
    fontWeight: '400',
  },

  botaoLogin: {
    backgroundColor: '#00897B',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
    elevation: 2,
  },
  textoBotaoLogin: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  botaoCriarConta: {
    backgroundColor: 'transparent',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#00897B',
  },
  textoBotaoCriarConta: {
    color: '#00897B',
    fontSize: 18,
    fontWeight: 'bold',
  },
});