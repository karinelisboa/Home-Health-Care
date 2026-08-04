import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Footer from '../../components/Footer';

interface AlertItem {
  id: number;
  name: string;
  condition: string;
  time: string;
}

const StatsScreen = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  
  // 1. ESTADOS PARA GUARDAR OS DADOS QUE VÊM DA API
  const [cards, setCards] = useState({
    pacientesTotais: 0,
    urgentes: 0,
    atencao: 0,
    semClassificacao: 0
  });
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  // 2. O GATILHO: Dispara a busca na API toda vez que 'searchText' mudar (quando você digitar)
  useEffect(() => {
    const carregarDadosEstatisticos = async () => {
      try {
        // Se testar no celular físico, troque localhost pelo seu IP
        const resposta = await fetch(`http://localhost:3000/api/estatisticas?busca=${searchText}`);
        if (resposta.ok) {
          const dados = await resposta.json();
          setCards(dados.cards);
          setAlerts(dados.alertasRecentes);
        }
      } catch (error) {
        console.error("Erro ao buscar dados estatísticos:", error);
      }
    };

    carregarDadosEstatisticos();
  }, [searchText]); // <-- Escuta a barra de pesquisa

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Estatísticas</Text>
          <Text style={styles.headerSubtitle}>Visão geral dos pacientes</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar paciente"
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Stats Cards Grid Dinâmico */}
        <View style={styles.statsGrid}>
          {/* Total Patients */}
          <TouchableOpacity 
            style={[styles.card, styles.cardWhite]}
            onPress={() => router.push('/patients-list')}
            activeOpacity={0.7}
          >
            <View style={styles.cardContent}>
              <Ionicons name="person" size={32} color="#4DB6AC" />
              <Text style={styles.cardNumber}>{cards.pacientesTotais}</Text>
            </View>
            <Text style={styles.cardLabel}>Pacientes totais</Text>
          </TouchableOpacity>

          {/* Unread Notifications (Urgentes) */}
          <View style={[styles.card, styles.cardRed]}>
            <View style={styles.cardContent}>
              <Ionicons name="alarm" size={32} color="#fff" />
              <Text style={[styles.cardNumber, styles.textWhite]}>{cards.urgentes}</Text>
            </View>
            <Text style={[styles.cardLabel, styles.textWhite]}>Notificações não vistas</Text>
          </View>

          {/* Warning Notifications (Atenção) */}
          <View style={[styles.card, styles.cardYellow]}>
            <View style={styles.cardContent}>
              <View style={styles.hexagonIcon}>
                <Ionicons name="alert" size={24} color="#000" />
              </View>
              <Text style={[styles.cardNumber, styles.textDark]}>{cards.atencao}</Text>
            </View>
            <Text style={[styles.cardLabel, styles.textDark]}>Notificações{'\n'}não vistas</Text>
          </View>

          {/* Unclassified */}
          <View style={[styles.card, styles.cardWhite]}>
            <View style={styles.cardContent}>
              <Ionicons name="search" size={32} color="#4DB6AC" />
              <Text style={styles.cardNumber}>{cards.semClassificacao}</Text>
            </View>
            <Text style={styles.cardLabel}>Sem classificação</Text>
          </View>
        </View>

        {/* Recent Alerts Section Dinâmica */}
        <View style={styles.alertsSection}>
          <Text style={styles.alertsTitle}>Alertas recentes</Text>
          
          {alerts.length === 0 ? (
            <Text style={{ color: '#666', textAlign: 'center', marginVertical: 10 }}>
              Nenhum alerta para esta busca.
            </Text>
          ) : (
            alerts.map((alert, index) => (
              <View 
                key={alert.id} 
                style={[
                  styles.alertItem,
                  index !== alerts.length - 1 && styles.alertItemBorder
                ]}
              >
                <View style={styles.alertInfo}>
                  <Text style={styles.alertName}>{alert.name}</Text>
                  <Text style={styles.alertCondition}>{alert.condition}</Text>
                </View>
                <Text style={styles.alertTime}>{alert.time}</Text>
              </View>
            ))
          )}
        </View>

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Footer */}
      <Footer activeTab="stats" />
    </SafeAreaView>
  );
};

// Mantive exatamente todos os seus estilos visuais intactos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8DED9',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 20,
    backgroundColor: '#C8DED9',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B8CEC9',
    marginHorizontal: 24,
    marginBottom: 20,
    borderRadius: 30,
    paddingHorizontal: 18,
    height: 56,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  cardWhite: {
    backgroundColor: '#F5F5F5',
  },
  cardRed: {
    backgroundColor: '#FF5757',
  },
  cardYellow: {
    backgroundColor: '#FFD952',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  hexagonIcon: {
    width: 36,
    height: 36,
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '45deg' }],
  },
  cardNumber: {
    fontSize: 40,
    fontWeight: '700',
    color: '#1A1A1A',
    marginLeft: 10,
  },
  cardLabel: {
    fontSize: 14,
    color: '#1A1A1A',
    lineHeight: 19,
    fontWeight: '400',
  },
  textWhite: {
    color: '#fff',
  },
  textDark: {
    color: '#1A1A1A',
  },
  alertsSection: {
    backgroundColor: '#F5F5F5',
    marginHorizontal: 24,
    marginTop: 10,
    borderRadius: 20,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  alertsTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 18,
  },
  alertItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
  },
  alertItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#D0D0D0',
  },
  alertInfo: {
    flex: 1,
  },
  alertName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 5,
  },
  alertCondition: {
    fontSize: 15,
    color: '#666',
  },
  alertTime: {
    fontSize: 15,
    color: '#666',
  },
  bottomSpacer: {
    height: 100,
  },
});

export default StatsScreen;