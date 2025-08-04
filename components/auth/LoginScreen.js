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
        fetch('https://bookworm.pythonanywhere.com/api/login/', {
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
        backgroundColor: '#f8f5e4', // старая бумага
        paddingHorizontal: 30,
        paddingVertical: 50,
        justifyContent: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: '600',
        marginBottom: 30,
        textAlign: 'center',
        color: '#3e2f1c', // винтажный текст
        fontFamily: 'serif',
    },
    input: {
        borderWidth: 1,
        borderColor: '#a67c52', // теплый коричневый
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: '#fffaf0', // слегка желтоватый фон
        color: '#3e2f1c',
        fontFamily: 'serif',
    },
    buttonContainer: {
        marginTop: 10,
        backgroundColor: '#a67c52',
        borderRadius: 6,
        overflow: 'hidden',
    },
});
