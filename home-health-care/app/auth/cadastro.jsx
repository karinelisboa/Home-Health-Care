import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { CardAutenticacao } from '../../components/CardAutenticacao';

export default function CadastroScreen() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    crm: "",
    nascimento: "",
    cpf: "",
    email: "",
    senha: "",
  });

  const handleChange = (key, value) => setForm((s) => ({ ...s, [key]: value }));

  const handleSubmit = () => {

      console.log("Enviar:", form);

      router.replace('/'); 
    };

  return (
    <View style={styles.mainContainer}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            
            <View style={styles.headerContainer}>
              <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={28} color="#00897B" />
              </TouchableOpacity>

              <View style={styles.logoArea}>
                <Image 
                  source={require('../../assets/images/logo.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
                <Text style={styles.appName}>HomeHeart ECG</Text>
                <Text style={styles.subtitle}>Crie sua conta</Text>
              </View>
            </View>

            <CardAutenticacao style={{ paddingBottom: 60, minHeight: 'auto' }}>
              
              <View style={styles.formContent}>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Nome completo</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Nome do Médico"
                    value={form.nome}
                    onChangeText={(t) => handleChange("nome", t)}
                    placeholderTextColor="#aaa"
                  />
                </View>


                <View style={styles.inputGroup}>
                  <Text style={styles.label}>CRM</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="000.000.000-00"
                    value={form.crm}
                    onChangeText={(t) => handleChange("crm", t)}
                    placeholderTextColor="#aaa"
                  />
                </View>


                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Data de nascimento</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="00/00/0000"
                    value={form.nascimento}
                    onChangeText={(t) => handleChange("nascimento", t)}
                    placeholderTextColor="#aaa"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>CPF</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="000.000.000-00"
                    value={form.cpf}
                    onChangeText={(t) => handleChange("cpf", t)}
                    placeholderTextColor="#aaa"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>E-mail</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="email@email.com"
                    keyboardType="email-address"
                    value={form.email}
                    onChangeText={(t) => handleChange("email", t)}
                    placeholderTextColor="#aaa"
                    autoCapitalize="none"
                  />
                </View>


                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Senha</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="senha12345"
                    secureTextEntry
                    value={form.senha}
                    onChangeText={(t) => handleChange("senha", t)}
                    placeholderTextColor="#aaa"
                  />
                </View>


                <View style={styles.botaoWrapper}>
                  <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
                    <Text style={styles.botaoTexto}>Confirmar</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </CardAutenticacao>

          </ScrollView>
        </TouchableWithoutFeedback>
        <View style={styles.floatingWarning} pointerEvents="none">
          <Text style={styles.warningText}>Role para confirmar</Text>
          <Ionicons name="chevron-down" size={16} color="#999" />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },

  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingBottom: 30,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 60,
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
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00897B',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 2,
    fontWeight: '400',
  },

  formContent: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#444",
    marginBottom: 8,
    fontWeight: "600",
    paddingLeft: 10,
  },
  input: {
    width: '100%',
    height: 55,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    backgroundColor: "#FAFAFA",
    borderRadius: 30,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#333",
  },
  
  botaoWrapper: {
    marginTop: 30,
    alignItems: 'center',
  },
  floatingWarning: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
    zIndex: 10,
    paddingBottom: 5,
  },
  warningText: {
    color: '#999',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: -2,
  },
  botao: {
    backgroundColor: "#00897B",
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    width: '100%',
    elevation: 4,
    shadowColor: '#00897B',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});