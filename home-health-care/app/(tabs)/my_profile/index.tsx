import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Footer from '../../../components/Footer';

const MyProfileScreen = () => {
  const router = useRouter();

  const profileData = [
    { 
      id: 1, 
      icon: 'person',
      label: 'Nome completo', 
      value: 'Gustavo Chagas Pereira',
    },
    { 
      id: 2, 
      icon: 'calendar',
      label: 'Data de nascimento', 
      value: '23/06/2003',
    },
    { 
      id: 3, 
      icon: 'medical',
      label: 'CRM/RJ', 
      value: 'CRM/RJ 123456',
    },
    { 
      id: 4, 
      icon: 'call',
      label: 'Telefone', 
      value: '122.145.023-90',
    },
    { 
      id: 5, 
      icon: 'mail',
      label: 'Email', 
      value: 'gustavochagas@gmail.com',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <View style={styles.backButtonCircle}>
            <Ionicons name="arrow-back" size={24} color="#00897B" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Photo Section */}
        <View style={styles.photoSection}>
          <View style={styles.photoContainer}>
            <View style={styles.photoPlaceholder}>
              <View style={styles.photoGradient}>
                <Text style={styles.photoInitials}>GC</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editPhotoButton} activeOpacity={0.8}>
              <View style={styles.editPhotoGradient}>
                <Ionicons name="camera" size={18} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>Gustavo Chagas</Text>
          <View style={styles.badge}>
            <Ionicons name="shield-checkmark" size={12} color="#00897B" />
            <Text style={styles.badgeText}>Verificado</Text>
          </View>
        </View>

        {/* Profile Info Cards */}
        <View style={styles.infoContainer}>
          {profileData.map((item) => (
            <View key={item.id} style={styles.infoCardWrapper}>
              <View style={styles.infoCard}>
                <View style={styles.iconCircle}>
                  <Ionicons name={item.icon} size={20} color="#fff" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>{item.label}</Text>
                  <Text style={styles.infoValue}>{item.value}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Edit Button */}
        <TouchableOpacity 
          style={styles.editButtonWrapper} 
          activeOpacity={0.8}
          onPress={() => router.push('/(tabs)/my_profile/edit_profile')}
        >
          <View style={styles.editButton}>
            <Ionicons name="create-outline" size={20} color="#fff" style={styles.editIcon} />
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </View>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7}>
          <Ionicons name="log-out-outline" size={20} color="#DC2626" />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>

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
  /* Header */
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
  /* Photo Section */
  photoSection: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: '#E8F4F2',
  },
  photoContainer: {
    position: 'relative',
    marginBottom: 16,
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
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    gap: 5,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#00897B',
  },
  /* Info Cards */
  infoContainer: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
  infoCardWrapper: {
    marginBottom: 10,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#00897B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 4,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '600',
  },
  /* Edit Button */
  editButtonWrapper: {
    marginHorizontal: 24,
    marginTop: 24,
    borderRadius: 14,
  },
  editButton: {
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: '#00897B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    marginRight: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  /* Logout Button */
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    gap: 8,
  },
  logoutText: {
    color: '#DC2626',
    fontSize: 15,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 100,
  },
});

export default MyProfileScreen;