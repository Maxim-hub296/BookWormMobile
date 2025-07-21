// Header.js
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, StatusBar, Platform } from 'react-native';

export default function Header() {
  return (
    <View style={styles.safeArea}>
        <View style={styles.header}>
        <Text style={styles.logo}>BookWorm</Text>
        <TouchableOpacity>
            <Text style={styles.cart}>Корзина</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#fdf6e3',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fdf6e3',
    borderBottomWidth: 1,
    borderBottomColor: '#e0d9c4',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4b3e2b',
  },
  cart: {
    fontSize: 16,
    color: '#9e6b3f',
    fontWeight: 'bold',
  },
});
