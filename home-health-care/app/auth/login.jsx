import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Platform } from 'react-native';

import { CardAutenticacao } from '../../components/CardAutenticacao';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    // 1. Isso aqui vai provar que o botão foi clicado
    console.log("=== BOTÃO ENTRAR CLICADO ==="); 
    console.log("Tentando logar com:", email);

    try {
      const resposta = await fetch('http://localhost:3000/login', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        console.log("Sucesso:", dados.mensagem);
        router.push('/(tabs)'); 
      } else {
        // 2. Força o alerta aparecer no Navegador do Computador
        const mensagemErro = dados.erro || "Falha no login";
        console.log("A API recusou:", mensagemErro);
        
        if (Platform.OS === 'web') {
          window.alert("Erro de Login: " + mensagemErro);
        } else {
          Alert.alert("Erro", mensagemErro);
        }
      }
    } catch (error) {
      console.error("Erro fatal de conexão:", error);
      const falhaServidor = "Servidor offline. Você esqueceu de rodar 'node server.js' no outro terminal?";
      
      if (Platform.OS === 'web') {
        window.alert("Erro: " + falhaServidor);
      } else {
        Alert.alert("Erro", falhaServidor);
      }
    }
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/')}>
          <Ionicons name="arrow-back" size={28} color="#00897B" />
        </TouchableOpacity>

        <View style={styles.logoArea}>
          <Image 
            source={require('../../assets/images/logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>HomeHeart ECG</Text>
          <Text style={styles.loginSubtitle}>Faça login para continuar</Text>
        </View>
      </View>

      <CardAutenticacao style={{ minHeight: '60%' }}>
        
        <Text style={styles.cardTitle}>Bem-vindo de volta!</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="email@exemplo.com"
            keyboardType="email-address"
            placeholderTextColor="#aaa"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="********"
            secureTextEntry
            placeholderTextColor="#aaa"
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <TouchableOpacity style={styles.forgotPassword} onPress={() => router.push('/auth/esqueci-minha-senha1')}>
          <Text style={styles.link}>Esqueci a minha senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoEntrar} onPress={handleLogin}>
          <Text style={styles.textoBotao}>Entrar</Text>
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
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  logoArea: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 5, 
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00897B',
  },
  loginSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
    fontWeight: '400',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
    fontWeight: '600',
    paddingLeft: 10,
  },
  input: {
    width: '100%',
    height: 55,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
    borderRadius: 30,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
  },
  forgotPassword: {
    alignSelf: 'center', 
    marginBottom: 30,
    marginTop: -5,
  },
  link: {
    fontSize: 14,
    color: '#00897B',
    fontWeight: '600',
  },
  botaoEntrar: {
    backgroundColor: '#00897B',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#00897B',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});