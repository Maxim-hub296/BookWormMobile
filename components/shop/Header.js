// Header.js
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, StatusBar, Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import SearchOverlay from "./Search";

export default function Header({onFilterPress, onCartPress}) {
    const navigation = useNavigation()
    const [showSearch, setShowSearch] = useState(false)
    return (
        <View style={styles.safeArea}>
            {showSearch && <SearchOverlay visible={showSearch} onClose={() => setShowSearch(false)} />}

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.logo}>BookWorm</Text>
                </TouchableOpacity>

                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => setShowSearch(true)} style={styles.iconButton}>
                        <Ionicons name="search" size={24} color="#4b3e2b"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onFilterPress} style={styles.iconButton}>
                        <Ionicons name="filter" size={24} color="#4b3e2b"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onCartPress} style={styles.iconButton}>
                        <Ionicons name="cart" size={24} color="#9e6b3f"/>
                    </TouchableOpacity>
                </View>
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
    buttons: {
        flexDirection: 'row',
    },
    iconButton: {
        marginLeft: 16,
    },
});
