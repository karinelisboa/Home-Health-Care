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

export default function CodigoRecuperacaoScreen() {
  const router = useRouter();
  const [codigo, setCodigo] = useState('');

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
        <Text style={styles.title}>Verificação</Text>

        <Text style={styles.description}>
          Enviamos um e-mail com um código de verificação.
          {'\n'}Digite o código abaixo para continuar.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Código de verificação"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={codigo}
          onChangeText={setCodigo}
          maxLength={6}
        />

        <TouchableOpacity
          style={styles.botaoConfirmar}
          activeOpacity={0.85}
          onPress={() => router.push('/auth/redefinirsenha')}
        >
          <Text style={styles.textoBotao}>Confirmar código</Text>
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
    fontSize: 18,
    letterSpacing: 4,
    textAlign: 'center',
    marginBottom: 32,
    elevation: 2,
  },

  botaoConfirmar: {
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
