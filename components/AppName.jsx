
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';

export default function AppName({ title, onLogout }) {
  return (
    <View style={styles.header}>
      <Text style={styles.appName}>{title}</Text>
      {onLogout && (
        <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
          <MaterialIcons name="logout" size={24} color="red" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    borderBottomEndRadius: 25,
    borderStartEndRadius: 25,
    marginBottom: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appName: {
    fontSize: 32,
    fontWeight: '900',
    color: '#222',
    letterSpacing: 1.1,
  },
  logoutButton: {
    padding: 4,
    borderRadius: 20,
  },
});
