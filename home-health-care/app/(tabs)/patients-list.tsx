import React, { useState } from 'react';
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

const PatientsListScreen = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  const patients = [
    { id: 1, name: 'João Silva', info: 'Alguma informação' },
    { id: 2, name: 'Maria Oliveira', info: 'Alguma informação' },
    { id: 3, name: 'Carlos Mendes', info: 'Alguma informação' },
    { id: 4, name: 'Maria de Fátima', info: 'Alguma informação' },
    { id: 5, name: 'Afonso Roitman', info: 'Alguma informação' },
    { id: 6, name: 'Odete Roitman', info: 'Alguma informação' },
  ];

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

        {/* Patients List */}
        <View style={styles.patientsList}>
          {filteredPatients.map((patient, index) => (
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
          ))}
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