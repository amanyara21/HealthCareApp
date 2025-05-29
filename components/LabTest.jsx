import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
  Image,
  Dimensions,
} from 'react-native';
import Pdf from 'react-native-pdf';
import EmptyComponent from './EmptyComponent';

const LabTests = ({ prescriptions, scrollEnabled }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  if (!Array.isArray(prescriptions)) return null;

  const allLabTests = prescriptions.flatMap(prescription =>
    prescription.labTests.map(test => ({
      ...test,
      prescriptionDate: prescription.date,
      doctorName: prescription.doctor.name,
      id: `${prescription.id}-${test.testName}`,
    }))
  );

  const openPDF = (url) => {
    setPdfUrl(url);
    setModalVisible(true);
  };

  const closePDF = () => {
    setModalVisible(false);
    setPdfUrl(null);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => openPDF(item.fileUrl)}>
      <Image
        source={require('../assets/pdf_icon.png')}
        style={styles.thumbnail}
      />
      <View style={styles.cardContent}>
        <Text style={styles.testName}>{item.testName}</Text>
        <Text style={styles.meta}>👨‍⚕️ {item.doctorName}</Text>
        <Text style={styles.meta}>📅 {item.prescriptionDate}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🧪 Lab Test Reports</Text>

      <FlatList
        data={allLabTests}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<EmptyComponent title="No lab tests available." />}
        numColumns={2}
        scrollEnabled={scrollEnabled} 
        contentContainerStyle={styles.grid}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closePDF}
      >
        <View style={styles.modalHeader}>
          <Button title="Close" onPress={closePDF} />
          <Text style={styles.modalTitle}>PDF Viewer</Text>
          <View style={{ width: 60 }} />
        </View>

        {pdfUrl && (
          <Pdf
            trustAllCerts={false}
            source={{ uri: pdfUrl }}
            onLoadProgress={(percent) => console.log(`Loading: ${pdfUrl * 100}%`)}
            onLoadComplete={(pages) => console.log(`Loaded ${pages} pages`)}
            onError={(error) => console.error('PDF load error:', error, pdfUrl)}
            style={styles.pdf}
          />
        )}
      </Modal>
    </View>
  );
};

const CARD_WIDTH = Dimensions.get('window').width / 2 - 24;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: '#F9FAFB',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#1e293b',
    textAlign: 'center',
  },
  grid: {
    paddingBottom: 20,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 6,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  thumbnail: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 10,
  },
  testName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 4,
  },
  meta: {
    fontSize: 12,
    color: '#475569',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#e0e7ff',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
});

export default LabTests;
