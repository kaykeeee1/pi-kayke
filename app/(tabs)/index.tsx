import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Platform } from 'react-native';
import { MapPin, Star } from 'lucide-react-native';

const featuredProviders = [
  {
    id: '1',
    name: 'Ana Silva',
    role: 'Costureira',
    rating: 4.8,
    location: 'São Paulo, SP',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    specialties: ['Vestidos', 'Ajustes', 'Alta Costura']
  },
  {
    id: '2',
    name: 'Beatriz Santos',
    role: 'Modelista',
    rating: 4.9,
    location: 'Rio de Janeiro, RJ',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    specialties: ['Modelagem', 'Desenho Técnico']
  }
];

const recentWorks = [
  {
    id: '1',
    title: 'Vestido de Noiva',
    image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&h=600&fit=crop',
    provider: 'Ana Silva'
  },
  {
    id: '2',
    title: 'Blazer Sob Medida',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=600&fit=crop',
    provider: 'Beatriz Santos'
  }
];

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AtelieConnect</Text>
        <Text style={styles.subtitle}>Encontre as melhores profissionais</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profissionais em Destaque</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.providersScroll}>
          {featuredProviders.map((provider) => (
            <TouchableOpacity key={provider.id} style={styles.providerCard}>
              <Image source={{ uri: provider.image }} style={styles.providerImage} />
              <View style={styles.providerInfo}>
                <Text style={styles.providerName}>{provider.name}</Text>
                <Text style={styles.providerRole}>{provider.role}</Text>
                <View style={styles.ratingContainer}>
                  <Star size={16} color="#FFB800" fill="#FFB800" />
                  <Text style={styles.rating}>{provider.rating}</Text>
                </View>
                <View style={styles.locationContainer}>
                  <MapPin size={14} color="#666" />
                  <Text style={styles.location}>{provider.location}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trabalhos Recentes</Text>
        <View style={styles.worksGrid}>
          {recentWorks.map((work) => (
            <TouchableOpacity key={work.id} style={styles.workCard}>
              <Image source={{ uri: work.image }} style={styles.workImage} />
              <View style={styles.workInfo}>
                <Text style={styles.workTitle}>{work.title}</Text>
                <Text style={styles.workProvider}>por {work.provider}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  title: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 32,
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#666',
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    color: '#1a1a1a',
    marginBottom: 16,
  },
  providersScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  providerCard: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      },
    }),
  },
  providerImage: {
    width: '100%',
    height: 200,
  },
  providerInfo: {
    padding: 16,
  },
  providerName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  providerRole: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  rating: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#1a1a1a',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#666',
  },
  worksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  workCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      },
    }),
  },
  workImage: {
    width: '100%',
    height: 150,
  },
  workInfo: {
    padding: 12,
  },
  workTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  workProvider: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#666',
  },
});