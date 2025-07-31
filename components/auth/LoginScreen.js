import React, {useState} from 'react';
import {View, TextInput, Button, Text, Alert, StyleSheet} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
    const navigation = useNavigation();

    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const data = {
        username: userName,
        password: userPassword
    };

    const login = () => {
        fetch('http://192.168.0.143:8000/api/login/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
            .then(res => {
                if (!res.ok) {
                    Alert.alert('Ошибка входа', "Неверное имя или пароль")
                    throw new Error(`Ошибка входа: ${res.status}`)

                }
                return res.json();
            })
            .then(async data => {
                if (data.token) {
                    await AsyncStorage.setItem('authToken', data.token);
                    navigation.navigate('Profile');
                } else {
                    Alert.alert('Ошибка', 'Токен не получен');
                }
            })

    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Вход</Text>

            <TextInput
                style={styles.input}
                placeholder="Введите ваше имя"
                onChangeText={(text) => setUserName(text)}
                value={userName}
            />

            <TextInput
                style={styles.input}
                placeholder="Введите ваш пароль"
                secureTextEntry
                onChangeText={(text) => setUserPassword(text)}
                value={userPassword}
            />

            <View style={styles.buttonContainer}>
                <Button title="Войти!" onPress={login}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        paddingVertical: 50,
        justifyContent: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: 10,
    },
});
