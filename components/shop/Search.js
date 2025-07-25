import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity, Text, Platform, StatusBar, Button} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";

export default function SearchOverlay({visible, onClose}) {
    if (!visible) return null;

    const navigation = useNavigation()

    const [query, setSearchQuery] = useState('')


    const onPress = () => {
        navigation.navigate('Search', {search_query: query})
        onClose()
    }


    return (
        <View style={styles.overlay}>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Поиск..."
                    style={styles.input}
                    placeholderTextColor="#aaa"
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Ionicons name="close" size={24} color="#4b3e2b"/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.searchButton} onPress={onPress}>
                    <Text style={styles.searchButtonText}>🔍 Найти</Text>
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
    searchButton: {
        marginTop: 10,
        alignSelf: 'flex-end',
        backgroundColor: '#9e6b3f',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
    },
    searchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
