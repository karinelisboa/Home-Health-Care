import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

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
    // fazer requisição de cadastro aqui
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* Fecha teclado ao tocar fora */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {/* ScrollView com contentContainerStyle de flexGrow para ocupar a tela inteira */}
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Conteúdo principal organizado com espaço entre para empurrar o botão para o fim */}
            <View style={styles.inner}>
              {/* Header */}
              <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.titulo}>Cadastro</Text>
                <View style={{ width: 24 }} /> {/* espaço para alinhar */}
              </View>

              {/* Form (campos) */}
              <View style={styles.content}>
                <Text style={styles.label}>Nome completo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nome do Médico"
                  value={form.nome}
                  onChangeText={(t) => handleChange("nome", t)}
                />

                <Text style={styles.label}>CRM</Text>
                <TextInput
                  style={styles.input}
                  placeholder="000.000.000-00"
                  value={form.crm}
                  onChangeText={(t) => handleChange("crm", t)}
                />

                <Text style={styles.label}>Data de nascimento</Text>
                <TextInput
                  style={styles.input}
                  placeholder="00/00/0000"
                  value={form.nascimento}
                  onChangeText={(t) => handleChange("nascimento", t)}
                />

                <Text style={styles.label}>CPF</Text>
                <TextInput
                  style={styles.input}
                  placeholder="000.000.000-00"
                  value={form.cpf}
                  onChangeText={(t) => handleChange("cpf", t)}
                />

                <Text style={styles.label}>E-mail</Text>
                <TextInput
                  style={styles.input}
                  placeholder="email@email.com"
                  keyboardType="email-address"
                  value={form.email}
                  onChangeText={(t) => handleChange("email", t)}
                />

                <Text style={styles.label}>Senha</Text>
                <TextInput
                  style={styles.input}
                  placeholder="senha12345"
                  secureTextEntry
                  value={form.senha}
                  onChangeText={(t) => handleChange("senha", t)}
                />
              </View>

              {/* Espaçador flexível para empurrar o botão até o final do scroll */}
              <View style={{ flex: 1 }} />

              {/* Botão NO FINAL do conteúdo rolável */}
              <View style={styles.botaoWrapper}>
                <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
                  <Text style={styles.botaoTexto}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: {
    flexGrow: 1,
    padding: 2,
  },
  inner: {
    flex: 1,
    minHeight: 700,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 35,
    marginTop: 30,
    fontSize: 20,
  },
  titulo: {
    fontSize: 20,
    textAlign: 'center',
  },
  backButton: {
    marginRight: 10,
    alignItems: 'flex-start',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10,
    paddingTop: 50,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: -3, height: -3 }, // aqui controla direção da sombra
    shadowRadius: 6,
    elevation: 8,
  },

  label: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 6,
  },
  botaoWrapper: {
    paddingTop: 50,
    paddingBottom: Platform.OS === "ios" ? 30 : 20,
  },
  botao: {
    backgroundColor: "#0586d6",
    paddingVertical: 20,
    borderRadius: 26,
    alignItems: "center",
    width: '85%',
    alignSelf: 'center',
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
