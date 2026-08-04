
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import PatientHistoryModal from './PatientHistoryModal';

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
  const [ecgData, setEcgData] = useState<number[]>([]);

  const [detalhesApi, setDetalhesApi] = useState({
    phone: 'Carregando...',
    address: 'Carregando...',
    age: 0,
    history: [] as any[],
  });

  useEffect(() => {
    const buscarDetalhesNaApi = async () => {
      try {
        const resposta = await fetch(
          `http://localhost:3000/paciente/detalhes?nome=${patient}`
        );

        if (resposta.ok) {
          const dados = await resposta.json();
          setDetalhesApi(dados);
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes:', error);
      }
    };

    if (visible && patient) {
      buscarDetalhesNaApi();
    }
  }, [visible, patient]);

  useEffect(() => {
    const buscarEcg = async () => {
      try {
        const resposta = await fetch(
          'http://localhost:3000/get/ecg?id=1&crm=12345'
        );

        const dados = await resposta.json();

        console.log(
          'Quantidade de pontos ECG:',
          dados.dados_onda_ecg?.length
        );

        setEcgData(
          dados.dados_onda_ecg?.slice(0, 500) || []
        );
      } catch (erro) {
        console.error('Erro ao buscar ECG:', erro);
      }
    };

    if (visible) {
      buscarEcg();
    }
  }, [visible]);

  const handleCall = () => {
    const phoneLimpo = detalhesApi.phone.replace(/\D/g, '');
    Linking.openURL(`tel:${phoneLimpo}`);
  };

  const handleCopyPhone = async () => {
    await Clipboard.setStringAsync(detalhesApi.phone);
    Alert.alert(
      'Copiado!',
      'Telefone copiado para a área de transferência'
    );
  };

  const handleCopyAddress = async () => {
    await Clipboard.setStringAsync(detalhesApi.address);
    Alert.alert(
      'Copiado!',
      'Endereço copiado para a área de transferência'
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onClose}
            style={styles.backButton}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color="#333"
            />
          </TouchableOpacity>

          <View style={styles.headerInfo}>
            <Text style={styles.patientName}>
              {patient}
            </Text>
            <Text style={styles.headerSubtitle}>
              {date} às {time}
            </Text>
          </View>

          <TouchableOpacity style={styles.moreButton}>
            <Ionicons
              name="ellipsis-horizontal"
              size={24}
              color="#333"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.quickInfo}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>BPM</Text>
            <Text style={styles.infoBpm}>{bpm}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>
              Classificação
            </Text>
            <Text style={styles.infoValue}>
              {classification}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoItem}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() =>
                setContactModalVisible(true)
              }
            >
              <Ionicons
                name="call-outline"
                size={20}
                color="#00897B"
              />
            </TouchableOpacity>

            <Text style={styles.iconLabel}>
              Contato
            </Text>
          </View>

          <View style={styles.infoItem}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() =>
                setHistoryModalVisible(true)
              }
            >
              <Ionicons
                name="time-outline"
                size={20}
                color="#00897B"
              />
            </TouchableOpacity>

            <Text style={styles.iconLabel}>
              Histórico
            </Text>
          </View>
        </View>

        <View style={styles.ecgSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            style={styles.ecgScrollView}
            contentContainerStyle={
              styles.ecgScrollContent
            }
          >
            <LineChart
              data={{
                datasets: [
                  {
                    data:
                      ecgData.length > 0
                        ? ecgData
                        : [0],
                  },
                ],
              }}
              width={1500}
              height={300}
              withDots={false}
              withInnerLines={false}
              withOuterLines={false}
              withVerticalLabels={false}
              withHorizontalLabels={false}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 0,
                color: () => '#00897B',
              }}
            />
          </ScrollView>

          <Text style={styles.ecgHint}>
            ← Arraste para visualizar →
          </Text>
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
            <View style={styles.contactHeader}>
              <TouchableOpacity 
                onPress={() => setContactModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="arrow-back" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.contactTitle}>Contato de {patient}</Text>
              <View style={{ width: 24 }} />
            </View>

            <View style={styles.contactContent}>
              <View style={styles.contactItem}>
                <View style={styles.contactInfo}>
                  <Ionicons name="call" size={22} color="#00897B" />
                  <Text style={styles.contactText}>{detalhesApi.phone}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.copyButton}
                  onPress={handleCopyPhone}
                >
                  <Ionicons name="copy-outline" size={20} color="#666" />
                  <Text style={styles.copyText}>Copiar</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.contactItem}>
                <View style={styles.contactInfo}>
                  <Ionicons name="location" size={22} color="#00897B" />
                  <Text style={styles.contactText}>{detalhesApi.address}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.copyButton}
                  onPress={handleCopyAddress}
                >
                  <Ionicons name="copy-outline" size={20} color="#666" />
                  <Text style={styles.copyText}>Copiar</Text>
                </TouchableOpacity>
              </View>

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
        age={detalhesApi.age}
        currentClassification={classification}
        currentBpm={bpm}
        /* AQUI ESTÁ A MÁGICA: Repassamos o histórico da API para o modal filho */
        examHistory={detalhesApi.history} 
        onExamPress={(exam: any) => {
          console.log('Exame selecionado:', exam);
        }}
      />
      </View>
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