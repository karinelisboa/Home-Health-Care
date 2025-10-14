import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Login', headerTitleAlign: 'center' }} />

      {/* Ícone de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Campo de e-mail */}
      <Text style={styles.label}>E-mail</Text>
      <TextInput
        placeholder="email@email.com"
        style={styles.input}
        keyboardType="email-address"
      />

      {/* Campo de senha */}
      <Text style={styles.label}>Senha</Text>
      <TextInput
        placeholder="senha12345"
        secureTextEntry
        style={styles.input}
      />

      {/* Link de esqueci minha senha */}
      <TouchableOpacity>
        <Text style={styles.forgotText}>Esqueci a minha senha</Text>
      </TouchableOpacity>

      {/* Botão Entrar */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  forgotText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#555',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 12,
    marginTop: 60,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
