import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { height } = Dimensions.get('window');

export default function RedefinirSenhaScreen() {
  const router = useRouter();
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  function handleRedefinirSenha() {
    if (!senha || !confirmarSenha) {
      console.log('Preencha todos os campos');
      return;
    }

    if (senha !== confirmarSenha) {
      console.log('As senhas não coincidem');
      return;
    }

    console.log('Senha redefinida com sucesso');

    router.replace('/');
  }

  return (
    <View style={styles.container}>
      
      <Image
        source={require('../../assets/images/waves.png')}
        style={styles.waves}
        resizeMode="cover"
        pointerEvents="none"
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        activeOpacity={0.8}
      >
        <Ionicons name="arrow-back" size={26} color="#00897B" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Redefinir senha</Text>

        <Text style={styles.description}>
          Crie uma nova senha para sua conta.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nova senha"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar nova senha"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />

        <TouchableOpacity
          style={styles.botaoConfirmar}
          activeOpacity={0.85}
          onPress={() => router.push('/')}
        >
          <Text style={styles.textoBotao}>Salvar nova senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF7F6',
  },

  waves: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 1,
  },

  backButton: {
    marginTop: 60,
    marginLeft: 20,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    zIndex: 10,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginTop: -120,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 24,
  },

  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 36,
  },

  input: {
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 22,
    fontSize: 16,
    marginBottom: 20,
    elevation: 2,
  },

  botaoConfirmar: {
    height: 56,
    borderRadius: 28,
    backgroundColor: '#00BFA5',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    marginTop: 16,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
