import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// 1. MANTIVE SUA ESTRUTURA ORIGINAL DE EXAME
interface ExamRecord {
  id: number;
  date: string;
  time: string;
  type: string;
  classification: string;
  bpm: number;
}

// 2. AJUSTE NA PROPS: Agora o modal aceita a lista que vem da API externa
interface PatientHistoryModalProps {
  visible: boolean;
  onClose: () => void;
  patient: string;
  age: number;
  currentClassification: string;
  currentBpm: number;
  examHistory: ExamRecord[]; // RECEBE OS DADOS DA API
  onExamPress: (exam: ExamRecord) => void;
}

const { height } = Dimensions.get('window');

const PatientHistoryModal: React.FC<PatientHistoryModalProps> = ({
  visible,
  onClose,
  patient,
  age,
  currentClassification,
  currentBpm,
  examHistory, // PUXA O DADO DAQUI
  onExamPress
}) => {
  
  // AQUELE COMENTÁRIO FIXO COM OS EXAMES FOI APAGADO DAQUI
  // POIS AGORA OS DADOS VÊM DIRETO DO SERVIDOR

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Histórico do Paciente</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Card do Paciente */}
          <View style={styles.patientCard}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={40} color="#00897B" />
              </View>
            </View>
            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>{patient}</Text>
              <Text style={styles.patientDetails}>
                {currentClassification} · {currentBpm} bpm · {age} anos
              </Text>
            </View>
          </View>

          {/* Título dos Exames */}
          <Text style={styles.sectionTitle}>Exames Recentes</Text>

          {/* Lista de Exames Dinâmica baseada no que vem da API */}
          {!examHistory || examHistory.length === 0 ? (
            <Text style={{ textAlign: 'center', color: '#666', marginTop: 20 }}>
              Nenhum exame histórico encontrado no servidor.
            </Text>
          ) : (
            examHistory.map((exam) => (
              <TouchableOpacity 
                key={exam.id}
                style={styles.examCard}
                onPress={() => {
                  onExamPress(exam);
                  onClose();
                }}
                activeOpacity={0.7}
              >
                <View style={styles.examContent}>
                  <View style={styles.examInfo}>
                    <Text style={styles.examDate}>{exam.date}, às {exam.time}</Text>
                    <Text style={styles.examType}>{exam.type}</Text>
                    <Text style={styles.examDetails}>
                      {exam.classification} · {exam.bpm} bpm
                    </Text>
                  </View>
                  <View style={styles.examIconContainer}>
                    <View style={styles.examIcon}>
                      <Ionicons name="pulse" size={28} color="#ef5350" />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

// MANTIVE TODOS OS SEUS ESTILOS LINDOS DO JEITO QUE ESTAVAM
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F4F3',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00897B',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 30,
  },
  patientCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00897B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#E0F2F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  patientDetails: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00897B',
    marginBottom: 16,
  },
  examCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#00897B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  examContent: {
    flexDirection: 'row',
    padding: 18,
    alignItems: 'center',
  },
  examInfo: {
    flex: 1,
  },
  examDate: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  examType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  examDetails: {
    fontSize: 13,
    color: '#666',
  },
  examIconContainer: {
    marginLeft: 12,
  },
  examIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#ffebee',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PatientHistoryModal;