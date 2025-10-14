import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from "expo-router";


export default function PaginaInicial() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>

      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/heartblue.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.botoesContainer}>
        <TouchableOpacity style={styles.botaoLogin}
        onPress={() => router.push("/auth/login")}
        >
          <Text style={styles.textoBotaoLogin}>Faça login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoCriarConta}
        onPress={() => router.push("/auth/cadastro")}
        >
          <Text style={styles.textoBotaoCriarConta}>Crie sua conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 20,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 90,
    height: 90,
    tintColor: '#007BDF',
  },
  botoesContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 },
  },
  botaoLogin: {
    backgroundColor: '#007BDF',
    width: '85%',
    paddingVertical: 26,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 25,
  },
  textoBotaoLogin: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  botaoCriarConta: {
    backgroundColor: '#B5D6E5',
    width: '85%',
    paddingVertical: 26,
    borderRadius: 20,
    alignItems: 'center',
  },
  textoBotaoCriarConta: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
