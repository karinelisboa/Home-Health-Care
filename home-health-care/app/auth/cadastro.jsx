import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
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

  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    setForm((s) => ({ ...s, [key]: value }));
    // Limpa o erro do campo assim que o usuário volta a digitar
    if (errors[key]) {
      setErrors((s) => ({ ...s, [key]: null }));
    }
  };

  const formatNome = (value) => {
    return value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
  };

  const formatCRM = (value) => {
    return value.replace(/[^0-9A-Za-z/-]/g, "");
  };

  const formatCPF = (value) => {
    const numbers = value.replace(/\D/g, "");
    return numbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  };

  const formatData = (value) => {
    const numbers = value.replace(/\D/g, "");
    return numbers
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .slice(0, 10);
  };

  const validarFormulario = () => {
    let novosErros = {};

    if (!form.nome || form.nome.trim().length < 3) {
      novosErros.nome = "Insira um nome válido completo.";
    }
    if (!form.crm || form.crm.trim().length < 4) {
      novosErros.crm = "O CRM é obrigatório.";
    }
    if (!form.nascimento || form.nascimento.length !== 10) {
      novosErros.nascimento = "Insira uma data completa (DD/MM/AAAA).";
    }
    if (!form.cpf || form.cpf.length !== 14) {
      novosErros.cpf = "Insira um CPF completo e válido.";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRegex.test(form.email)) {
      novosErros.email = "Insira um e-mail válido.";
    }
    if (!form.senha || form.senha.length < 6) {
      novosErros.senha = "A senha deve ter pelo menos 6 caracteres.";
    }

    setErrors(novosErros);
    // Retorna true se não houver erros (objeto vazio)
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async () => {
    if (!validarFormulario()) {
      return; // Interrompe o envio se houver erro
    }

    try {
      const resposta = await fetch('http://localhost:3000/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (resposta.ok) {
        Alert.alert("Sucesso", "Médico cadastrado! Faça o login.");
        router.replace('/');
      } else {
        const dados = await resposta.json();
        Alert.alert("Erro", dados.erro || "Falha ao cadastrar.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor da API.");
    }
  };

  return (
    <View style={styles.mainContainer}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
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
                  style={[styles.input, errors.nome && styles.inputError]}
                  placeholder="Nome do Médico"
                  value={form.nome}
                  onChangeText={(t) => handleChange("nome", formatNome(t))}
                  placeholderTextColor="#aaa"
                />
                {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>CRM</Text>
                <TextInput
                  style={[styles.input, errors.crm && styles.inputError]}
                  placeholder="CRM-RJ 123456"
                  value={form.crm}
                  onChangeText={(t) => handleChange("crm", formatCRM(t))}
                  placeholderTextColor="#aaa"
                  autoCapitalize="characters"
                />
                {errors.crm && <Text style={styles.errorText}>{errors.crm}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Data de nascimento</Text>
                <TextInput
                  style={[styles.input, errors.nascimento && styles.inputError]}
                  placeholder="00/00/0000"
                  value={form.nascimento}
                  onChangeText={(t) => handleChange("nascimento", formatData(t))}
                  placeholderTextColor="#aaa"
                  keyboardType="numeric"
                  maxLength={10}
                />
                {errors.nascimento && <Text style={styles.errorText}>{errors.nascimento}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>CPF</Text>
                <TextInput
                  style={[styles.input, errors.cpf && styles.inputError]}
                  placeholder="000.000.000-00"
                  value={form.cpf}
                  onChangeText={(t) => handleChange("cpf", formatCPF(t))}
                  placeholderTextColor="#aaa"
                  keyboardType="numeric"
                  maxLength={14}
                />
                {errors.cpf && <Text style={styles.errorText}>{errors.cpf}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>E-mail</Text>
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  placeholder="email@email.com"
                  keyboardType="email-address"
                  value={form.email}
                  onChangeText={(t) => handleChange("email", t)}
                  placeholderTextColor="#aaa"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Senha</Text>
                <TextInput
                  style={[styles.input, errors.senha && styles.inputError]}
                  placeholder="senha12345"
                  secureTextEntry
                  value={form.senha}
                  onChangeText={(t) => handleChange("senha", t)}
                  placeholderTextColor="#aaa"
                  maxLength={20}
                />
                {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}
              </View>

              <View style={styles.botaoWrapper}>
                <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
                  <Text style={styles.botaoTexto}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </CardAutenticacao>
        </ScrollView>
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
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  }
});