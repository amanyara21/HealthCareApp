import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { getRecords } from 'react-native-health-connect';
import AppName from '../components/AppName';

const recordTypes = [
  { type: 'Steps', label: 'Steps' },
  { type: 'HeartRate', label: 'Heart Rate (bpm)' },
  { type: 'BodyTemperature', label: 'Body Temperature (°C)' },
  { type: 'OxygenSaturation', label: 'SpO₂ (%)' },
  { type: 'Distance', label: 'Distance (m)' },
  { type: 'SleepSession', label: 'Sleep Duration (hrs)' },
];

const HealthConnect = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getTodayRange = () => {
    const now = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    return { startTime: startOfDay.toISOString(), endTime: now.toISOString() };
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { startTime, endTime } = getTodayRange();
      const results = [];

      for (const item of recordTypes) {
        let value = 0;

        try {
          const records = await getRecords(item.type, { startTime, endTime });

          switch (item.type) {
            case 'Steps':
              value = records.reduce((sum, r) => sum + (r.count || 0), 0);
              break;
            case 'HeartRate':
              const heartRates = records.map(r => r.samples[0]?.beatsPerMinute || 0);
              value = heartRates.length
                ? Math.round(heartRates.reduce((a, b) => a + b, 0) / heartRates.length)
                : 0;
              break;
            case 'BodyTemperature':
              const temps = records.map(r => r.temperatureInCelsius);
              value = temps.length
                ? (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1)
                : 0;
              break;
            case 'OxygenSaturation':
              const spo2 = records.map(r => r.percentage);
              value = spo2.length
                ? (spo2.reduce((a, b) => a + b, 0) / spo2.length).toFixed(1)
                : 0;
              break;
            case 'Distance':
              value = records.reduce((sum, r) => sum + (r.distance?.inMeters || 0), 0).toFixed(0);
              break;
            case 'SleepSession':
              value = records.reduce((sum, r) => {
                const duration =
                  (new Date(r.endTime).getTime() - new Date(r.startTime).getTime()) /
                  (1000 * 60 * 60);
                return sum + duration;
              }, 0).toFixed(1);
              break;
          }
        } catch (err) {
          console.warn(`Error reading ${item.type}:`, err);
        }

        results.push({ key: item.type, label: item.label, value: value || 0 });
      }

      setData(results);
    } catch (error) {
      console.error('Error fetching Health Connect data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardLabel}>{item.label}</Text>
      <Text style={styles.cardValue}>{item.value}</Text>
    </View>
  );

  return (
    <>
      <AppName title="Today's Data" />
      <FlatList
        contentContainerStyle={styles.container}
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={loading && <ActivityIndicator size="large" color="#007BFF" />}
      />
    </>

  );
};

export default HealthConnect;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F7F9FC',
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});
