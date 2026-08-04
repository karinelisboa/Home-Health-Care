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

interface PatientItem {
  id: number;
  name: string;
  info: string;
}

const PatientsListScreen = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  // Estado para armazenar os pacientes do médico que vierem da API
  const [patients, setPatients] = useState<PatientItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Gatilho: Puxa a lista da API assim que a tela abre
  useEffect(() => {
    const buscarPacientes = async () => {
      try {
        // Se testar no celular físico, troque localhost pelo IP da sua máquina
        const resposta = await fetch('http://localhost:3000/api/pacientes');
        if (resposta.ok) {
          const dados = await resposta.json();
          setPatients(dados);
        }
      } catch (error) {
        console.error("Erro ao buscar a lista de pacientes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    buscarPacientes();
  }, []);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Home Health Care</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={styles.pageTitle}>Lista de Informações</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar paciente"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Filter Button */}
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Todos</Text>
        </TouchableOpacity>

        {/* Patients List Dinâmica */}
        <View style={styles.patientsList}>
          {isLoading ? (
            <Text style={{ textAlign: 'center', padding: 20, color: '#666' }}>
              Carregando lista de pacientes...
            </Text>
          ) : filteredPatients.length === 0 ? (
            <Text style={{ textAlign: 'center', padding: 20, color: '#666' }}>
              Nenhum paciente cadastrado encontrado.
            </Text>
          ) : (
            filteredPatients.map((patient, index) => (
              <TouchableOpacity
                key={patient.id}
                style={[
                  styles.patientItem,
                  index !== filteredPatients.length - 1 && styles.patientItemBorder
                ]}
                activeOpacity={0.7}
              >
                <View style={styles.patientInfo}>
                  <Text style={styles.patientName}>{patient.name}</Text>
                  <Text style={styles.patientDetail}>{patient.info}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem} onPress={() => router.push('/')}>
          <Ionicons name="home-outline" size={26} color="#999" />
          <Text style={styles.footerTextInactive}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerItem} onPress={() => router.push('/(tabs)/session')}>
          <Ionicons name="swap-horizontal-outline" size={26} color="#999" />
          <Text style={styles.footerTextInactive}>Sessão</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerItem} onPress={() => router.push('/(tabs)/stats')}>
          <Ionicons name="stats-chart" size={26} color="#4DB6AC" />
          <Text style={styles.footerTextActive}>Estatísticas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerItem} onPress={() => router.push('/(tabs)/profile')}>
          <Ionicons name="person-outline" size={26} color="#999" />
          <Text style={styles.footerTextInactive}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 1,
    textAlign: 'center',
    marginRight: 40,
  },
  /* Page Title */
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  /* Search Bar */
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
  },
  /* Filter Button */
  filterButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 20,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  /* Patients List */
  patientsList: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  patientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
  },
  patientItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  patientDetail: {
    fontSize: 14,
    color: '#666',
  },
  bottomSpacer: {
    height: 100,
  },
  /* Footer */
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 8,
  },
  footerItem: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 4,
  },
  footerTextActive: {
    fontSize: 11,
    color: '#4DB6AC',
    fontWeight: '600',
    marginTop: 4,
  },
  footerTextInactive: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },
});

export default PatientsListScreen;