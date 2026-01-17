import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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

  const alerts: Alert[] = [
    {
      date: "09/07/2025",
      time: "13:44",
      classification: "Sem classificação",
      bpm: 56,
      patient: "Karine Lisboa",
      showIcon: false
    },
    {
      date: "09/07/2025",
      time: "13:44",
      classification: "Sem classificação",
      bpm: 57,
      patient: "Raphael",
      showIcon: true
    },
    {
      date: "09/07/2025",
      time: "13:44",
      classification: "Sem classificação",
      bpm: 58,
      patient: "Maria Silva",
      showIcon: false
    },
    {
      date: "09/07/2025",
      time: "14:12",
      classification: "Sem classificação",
      bpm: 62,
      patient: "João Pedro",
      showIcon: false
    },
    {
      date: "09/07/2025",
      time: "14:30",
      classification: "Sem classificação",
      bpm: 71,
      patient: "Ana Paula",
      showIcon: true
    },
    {
      date: "09/07/2025",
      time: "15:05",
      classification: "Sem classificação",
      bpm: 65,
      patient: "Carlos Eduardo",
      showIcon: false
    }
  ];

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
        <Text style={styles.greeting}>Bom dia, Gustavo</Text>
        <Text style={styles.subtitle}>
          Monitore os alertas sobre os sinais coletados dos pacientes
        </Text>

        <Text style={styles.sectionTitle}>Seus últimos alertas</Text>
        <Text style={styles.sectionSubtitle}>
          Monitore os alertas sobre os sinais coletados dos pacientes
        </Text>
      </View>

      {/* Lista de Alertas - Apenas esta parte rola */}
      <ScrollView 
        style={styles.alertsScrollView}
        contentContainerStyle={styles.alertsScrollContent}
        showsVerticalScrollIndicator={false}
      >
        {alerts.map((alert, index) => (
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
        ))}
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