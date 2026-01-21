import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Footer from '../../components/Footer';

const ProfileScreen = () => {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const menuItems = [
    {
      id: 1,
      icon: 'person-outline',
      title: 'Perfil',
      subtitle: 'Gerencie suas informações pessoais',
      hasChevron: true,
      onPress: () => router.push('/my_profile'),
    },
    {
      id: 2,
      icon: 'notifications-outline',
      title: 'Notificações',
      subtitle: 'Controle suas preferências',
      hasSwitch: true,
      switchValue: notificationsEnabled,
      onToggle: setNotificationsEnabled,
    },
    {
      id: 3,
      icon: 'information-circle-outline',
      title: 'Sobre',
      subtitle: 'Conheça mais sobre o app',
      hasChevron: true,
      onPress: () => console.log('Sobre pressed'),
    },
    {
      id: 4,
      icon: 'headset-outline',
      title: 'Central de ajuda',
      subtitle: 'Tire suas dúvidas',
      hasChevron: true,
      onPress: () => console.log('Central de ajuda pressed'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerGradient}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Informações sobre o perfil</Text>
            <Text style={styles.headerSubtitle}>Monitore os alertas sobre os sinais coletados dos pacientes</Text>
          </View>
        </View>

        {/* Menu Cards */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <View key={item.id} style={styles.cardWrapper}>
              {item.hasSwitch ? (
                <View style={styles.menuCard}>
                  <View style={styles.iconGradient}>
                    <Ionicons name={item.icon} size={24} color="#fff" />
                  </View>
                  
                  <View style={styles.menuContent}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  </View>
                  
                  <Switch
                    value={item.switchValue}
                    onValueChange={item.onToggle}
                    trackColor={{ false: '#D1D5DB', true: '#00897B' }}
                    thumbColor="#fff"
                    ios_backgroundColor="#D1D5DB"
                  />
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.menuCard}
                  onPress={item.onPress}
                  activeOpacity={0.6}
                >
                  <View style={styles.iconGradient}>
                    <Ionicons name={item.icon} size={24} color="#fff" />
                  </View>
                  
                  <View style={styles.menuContent}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  </View>
                  
                  {item.hasChevron && (
                    <View style={styles.chevronContainer}>
                      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                    </View>
                  )}
                </TouchableOpacity>
              )}
            </View>
          ))}
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
  /* Header */
  headerGradient: {
    paddingTop: 50,
    paddingHorizontal: 24,
    paddingBottom: 40,
    backgroundColor: '#E8F4F2',
  },
  headerContent: {
    zIndex: 2,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#00897B',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '400',
  },
  /* Menu Cards */
  menuContainer: {
    paddingHorizontal: 24,
    marginTop: 8,
  },
  cardWrapper: {
    marginBottom: 12,
  },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  iconGradient: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#00897B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '400',
  },
  chevronContainer: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSpacer: {
    height: 100,
  },
});

export default ProfileScreen;