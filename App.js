import {StyleSheet, View} from 'react-native';
import HomeScreen from './components/shop/HomeScreen';
import Header from './components/shop/Header';
import Sidebar from "./components/shop/Sidebar";
import {useState} from "react";

export default function App() {
  const [isSideBarOpen, setSideBarOpen] = useState(false)


    return (
        <View style={styles.container}>
            <Header onFilterPress={() => setSideBarOpen(true)}/>
            <HomeScreen/>
            <Sidebar isOpen={isSideBarOpen} onClose={() => setSideBarOpen(false)}/>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f4e3',
    },
});