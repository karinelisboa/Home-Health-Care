import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import Footer from '../../components/Footer';
import AlertCard from '../../components/AlertCard';
import PatientDetailModal from '../../components/PatientDetail';

interface Alert {
  date: string;
  time: string;
  classification: string;
  bpm: number;
  patient: string;
  showIcon: boolean;
}

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  
  // 1. COMEÇAMOS COM UM ARRAY VAZIO
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // 2. O GATILHO: BUSCA OS DADOS DA API QUANDO A TELA ABRE
  useEffect(() => {
    const buscarAlertas = async () => {
      try {
        // ATENÇÃO: Se for rodar no celular físico, troque 'localhost' pelo seu IP (ex: 192.168.1.X)
        const resposta = await fetch('http://localhost:3000/alertas');
        
        if (resposta.ok) {
          const dadosDaApi = await resposta.json();
          setAlerts(dadosDaApi); // 3. PREENCHE A TELA COM OS DADOS DO BACKEND
        }
      } catch (error) {
        console.error("Erro ao buscar alertas da API:", error);
      }
    };

    buscarAlertas();
  }, []);

  const handleAlertPress = (alert: Alert) => {
    setSelectedAlert(alert);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Header - Fixo */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>HomeHeart ECG</Text>
      </View>

      {/* Conteúdo fixo - não rola */}
      <View style={styles.content}>
        <Text style={styles.greeting}>Bem-vindo, Doutor(a)</Text>
        <Text style={styles.subtitle}>
          Monitore os alertas sobre os sinais coletados dos pacientes
        </Text>

        <Text style={styles.sectionTitle}>Seus últimos alertas</Text>
        <Text style={styles.sectionSubtitle}>
          Listagem atualizada em tempo real via API
        </Text>
      </View>

      {/* Lista de Alertas Dinâmica */}
      <ScrollView 
        style={styles.alertsScrollView}
        contentContainerStyle={styles.alertsScrollContent}
        showsVerticalScrollIndicator={false}
      >
        {alerts.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>
            Buscando alertas no servidor...
          </Text>
        ) : (
          alerts.map((alert, index) => (
            <AlertCard
              key={index}
              date={alert.date}
              time={alert.time}
              classification={alert.classification}
              bpm={alert.bpm}
              patient={alert.patient}
              showIcon={alert.showIcon}
              onPress={() => handleAlertPress(alert)}
            />
          ))
        )}
      </ScrollView>

      {/* Footer - Fixo */}
      <Footer />

      {/* Modal de Detalhes */}
      {selectedAlert && (
        <PatientDetailModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          patient={selectedAlert.patient}
          date={selectedAlert.date}
          time={selectedAlert.time}
          bpm={selectedAlert.bpm}
          classification={selectedAlert.classification}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2F1',
  },
  header: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 24,
    backgroundColor: '#E0F2F1',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00897B',
  },
  content: {
    paddingHorizontal: 20,
    backgroundColor: '#E0F2F1',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#00897B',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  alertsScrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  alertsScrollContent: {
    paddingBottom: 20,
  },
});