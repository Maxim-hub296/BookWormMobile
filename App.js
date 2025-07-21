import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './components/HomeScreen';
import Header from './components/Header';

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f4e3',
  },
});