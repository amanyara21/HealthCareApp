import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AppointmentTypeSelector = ({
  types,
  selectedTypes,
  onChange,
  multiple = false,
}) => {
  const handlePress = (type) => {
    if (multiple) {
      if (selectedTypes.includes(type)) {
        onChange(selectedTypes.filter((t) => t !== type));
      } else {
        onChange([...selectedTypes, type]);
      }
    } else {
      onChange(type);
    }
  };

  return (
    <View style={styles.container}>
      {types.map((type, index) => {
        const isSelected = selectedTypes && selectedTypes.includes(type);
        return (
          <View key={index} style={styles.chipWrapper}>
            <TouchableOpacity
              key={index}
              style={[styles.chip, isSelected && styles.selectedChip]}
              onPress={() => handlePress(type)}
            >
              <Text style={isSelected ? styles.selectedText : styles.text}>
                {type}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
    gap: 10,
  },
  chipWrapper: {
    flex: 1,
    minWidth: 0,
  },
  chip: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#EAF2FD',
    borderColor: '#007BFF',
    borderWidth: 1,
    alignItems: 'center',
  },
  selectedChip: {
    backgroundColor: '#007BFF',
  },
  text: {
    color: '#007BFF',
    fontWeight: '500',
  },
  selectedText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default AppointmentTypeSelector;
