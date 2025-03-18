import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Camera, Star, Plus, X } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

type Work = {
  id: string;
  image: string;
  title: string;
  description: string;
  rating?: number;
  provider: {
    name: string;
    image: string;
  };
};

const initialWorks: Work[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&h=600&fit=crop',
    title: 'Vestido de Festa',
    description: 'Vestido sob medida para casamento',
    rating: 5,
    provider: {
      name: 'Ana Silva',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    },
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=600&fit=crop',
    title: 'Ajuste de Blazer',
    description: 'Ajuste de blazer social',
    rating: 4,
    provider: {
      name: 'Beatriz Santos',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    },
  },
];

export default function Portfolio() {
  const [works, setWorks] = useState<Work[]>(initialWorks);
  const [modalVisible, setModalVisible] = useState(false);
  const [newWork, setNewWork] = useState({
    title: '',
    description: '',
    image: '',
  });
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewWork({ ...newWork, image: result.assets[0].uri });
    }
  };

  const handleAddWork = () => {
    if (!newWork.title || !newWork.description || !newWork.image) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    // Simulação de uma requisição de publicação
    setTimeout(() => {
      const work: Work = {
        id: Date.now().toString(),
        ...newWork,
        provider: {
          name: 'Maria Silva',
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
        },
      };
      setWorks([work, ...works]);
      setNewWork({ title: '', description: '', image: '' });
      setModalVisible(false);
      setLoading(false);
      Alert.alert('Sucesso', 'Trabalho publicado com sucesso!');
    }, 2000);
  };

  const handleRate = (work: Work) => {
    setSelectedWork(work);
    setRatingModalVisible(true);
  };

  const submitRating = () => {
    if (!selectedWork || rating === 0) {
      Alert.alert('Erro', 'Por favor, selecione uma avaliação.');
      return;
    }

    setLoading(true);

    // Simulação de uma requisição de avaliação
    setTimeout(() => {
      const updatedWorks = works.map((w) =>
        w.id === selectedWork.id ? { ...w, rating } : w
      );
      setWorks(updatedWorks);
      setRatingModalVisible(false);
      setRating(0);
      setSelectedWork(null);
      setLoading(false);
      Alert.alert('Sucesso', 'Avaliação enviada com sucesso!');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Portfólio</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
          accessibilityLabel="Adicionar novo trabalho"
        >
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {works.map((work) => (
          <WorkCard key={work.id} work={work} onRate={handleRate} />
        ))}
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Novo Trabalho</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              {newWork.image ? (
                <Image
                  source={{ uri: newWork.image }}
                  style={styles.pickedImage}
                />
              ) : (
                <>
                  <Camera size={32} color="#666" />
                  <Text style={styles.imagePickerText}>
                    Adicionar foto do trabalho
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Título"
              value={newWork.title}
              onChangeText={(text) => setNewWork({ ...newWork, title: text })}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descrição"
              value={newWork.description}
              onChangeText={(text) =>
                setNewWork({ ...newWork, description: text })
              }
              multiline
              numberOfLines={4}
            />

            <TouchableOpacity
              style={[
                styles.submitButton,
                (!newWork.title ||
                  !newWork.description ||
                  !newWork.image) &&
                styles.submitButtonDisabled,
              ]}
              onPress={handleAddWork}
              disabled={!newWork.title || !newWork.description || !newWork.image}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Publicar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={ratingModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setRatingModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Avaliar Trabalho</Text>
              <TouchableOpacity onPress={() => setRatingModalVisible(false)}>
                <X size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.ratingStars}>
              {[...Array(5)].map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setRating(index + 1)}
                >
                  <Star
                    size={32}
                    color={index < rating ? '#FFB800' : '#e1e1e1'}
                    fill={index < rating ? '#FFB800' : 'none'}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.submitButton, !rating && styles.submitButtonDisabled]}
              onPress={submitRating}
              disabled={!rating}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Enviar Avaliação</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const WorkCard = ({ work, onRate }: { work: Work; onRate: (work: Work) => void }) => (
  <View style={styles.workCard}>
    <Image source={{ uri: work.image }} style={styles.workImage} />
    <View style={styles.workInfo}>
      <Text style={styles.workTitle}>{work.title}</Text>
      <Text style={styles.workDescription}>{work.description}</Text>
      <View style={styles.providerContainer}>
        <Image
          source={{ uri: work.provider.image }}
          style={styles.providerImage}
        />
        <Text style={styles.providerName}>{work.provider.name}</Text>
      </View>
      {work.rating ? (
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              color={i < work.rating! ? '#FFB800' : '#e1e1e1'}
              fill={i < work.rating! ? '#FFB800' : 'none'}
            />
          ))}
        </View>
      ) : (
        <TouchableOpacity
          style={styles.rateButton}
          onPress={() => onRate(work)}
          accessibilityLabel="Avaliar trabalho"
        >
          <Text style={styles.rateButtonText}>Avaliar</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  title: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 28,
    color: '#1a1a1a',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  workCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
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
    height: 200,
  },
  workInfo: {
    padding: 16,
  },
  workTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#1a1a1a',
    marginBottom: 8,
  },
  workDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  providerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  providerImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  providerName: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#1a1a1a',
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  rateButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  rateButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    color: '#1a1a1a',
  },
  imagePicker: {
    width: '100%',
    height: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  imagePickerText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  pickedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  input: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#6366f1',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#e1e1e1',
  },
  submitButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#fff',
  },
  ratingStars: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
  },
});