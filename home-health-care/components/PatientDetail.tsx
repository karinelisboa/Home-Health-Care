import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Dimensions, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import PatientHistoryModal from './PatientHistoryModal.tsx';

interface PatientDetailModalProps {
  visible: boolean;
  onClose: () => void;
  patient: string;
  date: string;
  time: string;
  bpm: number;
  classification: string;
}

const { width, height } = Dimensions.get('window');

const PatientDetailModal: React.FC<PatientDetailModalProps> = ({
  visible,
  onClose,
  patient,
  date,
  time,
  bpm,
  classification
}) => {
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  
  // Dados de exemplo - você pode passar isso via props depois
  const phoneNumber = '(21) 989186684';
  const address = 'Rua Exemplo, Flamengo - RJ';
  const patientAge = 57;

  // Histórico de exames mockado
  const examHistory = [
    { id: 1, date: '09/08/2025', time: '13:44', type: 'Eletrocardiograma', classification: 'Sem classificação', bpm: 57 },
    { id: 2, date: '02/08/2025', time: '13:44', type: 'Eletrocardiograma', classification: 'Sem classificação', bpm: 57 },
    { id: 3, date: '28/07/2025', time: '13:44', type: 'Eletrocardiograma', classification: 'Sem classificação', bpm: 57 },
    { id: 4, date: '15/07/2025', time: '10:30', type: 'Eletrocardiograma', classification: 'Normal', bpm: 62 },
    { id: 5, date: '01/07/2025', time: '14:15', type: 'Eletrocardiograma', classification: 'Sem classificação', bpm: 59 },
  ];

  const handleCall = () => {
    const phone = phoneNumber.replace(/\D/g, '');
    Linking.openURL(`tel:${phone}`);
  };

  const handleCopyPhone = async () => {
    await Clipboard.setStringAsync(phoneNumber);
    Alert.alert('Copiado!', 'Telefone copiado para a área de transferência');
  };

  const handleCopyAddress = async () => {
    await Clipboard.setStringAsync(address);
    Alert.alert('Copiado!', 'Endereço copiado para a área de transferência');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header compacto */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.patientName}>{patient}</Text>
            <Text style={styles.headerSubtitle}>{date} às {time}</Text>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-horizontal" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Informações rápidas */}
        <View style={styles.quickInfo}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>BPM</Text>
            <Text style={styles.infoBpm}>{bpm}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Classificação</Text>
            <Text style={styles.infoValue}>{classification}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoItem}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => setContactModalVisible(true)}
            >
              <Ionicons name="call-outline" size={20} color="#00897B" />
            </TouchableOpacity>
            <Text style={styles.iconLabel}>Contato</Text>
          </View>
          <View style={styles.infoItem}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => setHistoryModalVisible(true)}
            >
              <Ionicons name="time-outline" size={20} color="#00897B" />
            </TouchableOpacity>
            <Text style={styles.iconLabel}>Histórico</Text>
          </View>
        </View>

        {/* ECG SCROLLÁVEL HORIZONTAL - OCUPA TODA A TELA */}
        <View style={styles.ecgSection}>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={true}
            style={styles.ecgScrollView}
            contentContainerStyle={styles.ecgScrollContent}
          >
            <Image 
              source={require('../assets/images/norm.png')} 
              style={styles.ecgImage}
              resizeMode="contain"
            />
          </ScrollView>
          <Text style={styles.ecgHint}>← Arraste para visualizar →</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerItem}>
            <Ionicons name="home" size={24} color="#00897B" />
            <Text style={styles.footerTextActive}>Início</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem}>
            <Ionicons name="swap-horizontal" size={24} color="#999" />
            <Text style={styles.footerText}>Sessão</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem}>
            <Ionicons name="stats-chart" size={24} color="#999" />
            <Text style={styles.footerText}>Estatísticas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem}>
            <Ionicons name="person" size={24} color="#999" />
            <Text style={styles.footerText}>Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal de Contato */}
      <Modal
        visible={contactModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setContactModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.contactModal}>
            {/* Header do Modal */}
            <View style={styles.contactHeader}>
              <TouchableOpacity 
                onPress={() => setContactModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="arrow-back" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.contactTitle}>Contato</Text>
              <View style={{ width: 24 }} />
            </View>

            {/* Conteúdo do Modal */}
            <View style={styles.contactContent}>
              {/* Telefone */}
              <View style={styles.contactItem}>
                <View style={styles.contactInfo}>
                  <Ionicons name="call" size={22} color="#00897B" />
                  <Text style={styles.contactText}>{phoneNumber}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.copyButton}
                  onPress={handleCopyPhone}
                >
                  <Ionicons name="copy-outline" size={20} color="#666" />
                  <Text style={styles.copyText}>Copiar</Text>
                </TouchableOpacity>
              </View>

              {/* Endereço */}
              <View style={styles.contactItem}>
                <View style={styles.contactInfo}>
                  <Ionicons name="location" size={22} color="#00897B" />
                  <Text style={styles.contactText}>{address}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.copyButton}
                  onPress={handleCopyAddress}
                >
                  <Ionicons name="copy-outline" size={20} color="#666" />
                  <Text style={styles.copyText}>Copiar</Text>
                </TouchableOpacity>
              </View>

              {/* Botão de Ligar */}
              <TouchableOpacity 
                style={styles.callButton}
                onPress={handleCall}
              >
                <Ionicons name="call" size={22} color="#fff" />
                <Text style={styles.callButtonText}>Ligar agora</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Histórico */}
      <PatientHistoryModal
        visible={historyModalVisible}
        onClose={() => setHistoryModalVisible(false)}
        patient={patient}
        age={patientAge}
        currentClassification={classification}
        currentBpm={bpm}
        onExamPress={(exam) => {
          console.log('Exame selecionado:', exam);
          // Aqui você pode abrir o detalhe do exame específico
        }}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 4,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  moreButton: {
    padding: 4,
  },
  quickInfo: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
  },
  infoBpm: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00897B',
  },
  infoValue: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: '#e0e0e0',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0F2F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  iconLabel: {
    fontSize: 10,
    color: '#00897B',
    fontWeight: '500',
  },
  ecgSection: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 8,
    paddingTop: 12,
  },
  ecgScrollView: {
    flex: 1,
  },
  ecgScrollContent: {
    paddingHorizontal: 10,
  },
  ecgImage: {
    width: width * 2.5,
    height: height - 270,
  },
  ecgHint: {
    textAlign: 'center',
    fontSize: 11,
    color: '#999',
    paddingVertical: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerItem: {
    alignItems: 'center',
  },
  footerTextActive: {
    fontSize: 10,
    color: '#00897B',
    fontWeight: '500',
    marginTop: 2,
  },
  footerText: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
  // Estilos do Modal de Contato
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  contactModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 300,
    maxHeight: height * 0.6,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  closeButton: {
    padding: 4,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  contactContent: {
    padding: 20,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  contactText: {
    fontSize: 15,
    color: '#333',
    flex: 1,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  copyText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00897B',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 12,
    gap: 10,
  },
  callButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});

export default PatientDetailModal;