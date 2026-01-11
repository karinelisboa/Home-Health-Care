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

export default function EsqueciSenhaScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>


      <Image
        source={require('../../assets/images/waves.png')}
        style={styles.waves}
        resizeMode="cover"
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/auth/login')}
        activeOpacity={0.8}
      >
        <Ionicons name="arrow-back" size={26} color="#00897B" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Esqueci minha senha</Text>

        <Text style={styles.description}>
          Informe seu e-mail para receber as instruções de recuperação.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="email@email.com"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity
          style={styles.botaoEnviar}
          activeOpacity={0.85}
          onPress={() => router.push('/auth/esqueci-minha-senha2')}
        >
          <Text style={styles.textoBotao}>Enviar</Text>
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
    marginTop: -130,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 32,
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
    marginBottom: 32,
    elevation: 2,
  },

  botaoEnviar: {
    height: 56,
    borderRadius: 28,
    backgroundColor: '#00BFA5',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
