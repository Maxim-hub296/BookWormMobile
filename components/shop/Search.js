import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchOverlay({ visible, onClose }) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Поиск..."
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#4b3e2b" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight : 44,
    left: 0,
    right: 0,
    backgroundColor: '#fdf6e3',
    zIndex: 100,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0d9c4',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 16,
    color: '#4b3e2b',
  },
  closeButton: {
    marginLeft: 8,
  },
});
