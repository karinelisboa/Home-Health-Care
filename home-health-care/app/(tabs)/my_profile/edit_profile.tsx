import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Footer from '../../../components/Footer';

const EditProfileScreen = () => {
  const router = useRouter();
  
  // 1. ESTADO INICIAL
  const [formData, setFormData] = useState({
    fullName: '',
    crm: '',
    birthDate: '',
    cpf: '',
    email: '',
    phone: '',
  });

  // 2. GATILHO PARA BUSCAR OS DADOS DO MÉDICO NA API AO ABRIR A TELA
  useEffect(() => {
    const buscarPerfilParaEdicao = async () => {
      try {
        const resposta = await fetch('http://localhost:3000/perfil');
        if (resposta.ok) {
          const dados = await resposta.json();
          setFormData({
            fullName: dados.nome || '',
            crm: dados.crm || '',
            birthDate: dados.nascimento || '',
            cpf: dados.cpf || '',
            email: dados.email || '',
            phone: '(21) 90000-0000',
          });
        }
      } catch (error) {
        console.error("Erro ao carregar o perfil para edição:", error);
      }
    };

    buscarPerfilParaEdicao();
  }, []);

  // 3. INTEGRAÇÃO DA FUNÇÃO DE SALVAR COM A API
  const handleSave = async () => {
    try {
      const resposta = await fetch('http://localhost:3000/perfil/atualizar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          crm: formData.crm,
          birthDate: formData.birthDate,
          cpf: formData.cpf,
          email: formData.email
        }),
      });

      if (resposta.ok) {
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
        router.back();
      } else {
        const dadosErro = await resposta.json();
        Alert.alert('Erro', dadosErro.erro || 'Falha ao atualizar o perfil.');
      }
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      Alert.alert('Erro de Conexão', 'Não foi possível conectar ao servidor.');
    }
  };

  const handleCancel = () => {
    router.back();
  };

  // Pega as iniciais do nome para o avatar da edição
  const iniciais = formData.fullName 
    ? formData.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : "";

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.backButton}>
          <View style={styles.backButtonCircle}>
            <Ionicons name="arrow-back" size={24} color="#00897B" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Perfil</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Photo Section Dinâmica */}
        <View style={styles.photoSection}>
          <View style={styles.photoContainer}>
            <View style={styles.photoPlaceholder}>
              <View style={styles.photoGradient}>
                <Text style={styles.photoInitials}>{iniciais}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editPhotoButton} activeOpacity={0.8}>
              <View style={styles.editPhotoGradient}>
                <Ionicons name="camera" size={18} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.photoHint}>Toque para alterar a foto</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          {/* Nome Completo */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Nome completo</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person" size={20} color="#00897B" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.fullName}
                onChangeText={(text) => setFormData({...formData, fullName: text})}
                placeholder="Digite seu nome completo"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* CRM */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>CRM</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="medical" size={20} color="#00897B" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.crm}
                onChangeText={(text) => setFormData({...formData, crm: text})}
                placeholder="CRM/UF 000000"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Data de Nascimento */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Data de nascimento</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="calendar" size={20} color="#00897B" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.birthDate}
                onChangeText={(text) => setFormData({...formData, birthDate: text})}
                placeholder="DD/MM/AAAA"
                placeholderTextColor="#9CA3AF"
                keyboardType="default"
              />
            </View>
          </View>

          {/* CPF */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>CPF</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="card" size={20} color="#00897B" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.cpf}
                onChangeText={(text) => setFormData({...formData, cpf: text})}
                placeholder="000.000.000-00"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Telefone */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Telefone</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="call" size={20} color="#00897B" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(text) => setFormData({...formData, phone: text})}
                placeholder="(00) 00000-0000"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail" size={20} color="#00897B" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => setFormData({...formData, email: text})}
                placeholder="seuemail@exemplo.com"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} activeOpacity={0.8} onPress={handleSave}>
            <Ionicons name="checkmark-circle" size={22} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.saveButtonText}>Salvar Alterações</Text>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity style={styles.cancelButton} activeOpacity={0.7} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Footer */}
      <Footer activeTab="profile" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F4F2',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#E8F4F2',
  },
  backButton: {
    padding: 4,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00897B',
  },
  placeholder: {
    width: 48,
  },
  photoSection: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: '#E8F4F2',
  },
  photoContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  photoPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#00897B',
  },
  photoGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#00897B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoInitials: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 18,
  },
  editPhotoGradient: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#00897B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#E8F4F2',
  },
  photoHint: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  formContainer: {
    paddingHorizontal: 24,
    marginTop: 10,
  },
  inputWrapper: {
    marginBottom: 18,
  },
  inputLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '500',
    paddingVertical: 12,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    marginTop: 16,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00897B',
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  buttonIcon: {
    marginRight: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cancelButtonText: {
    color: '#6B7280',
    fontSize: 15,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 100,
  },
});

export default EditProfileScreen;