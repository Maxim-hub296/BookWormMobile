import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet, Alert} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegistrationScreen() {
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

    const register = () => {
        fetch('http://192.168.0.143:8000/api/register/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
            .then(res => {
                if (!res.ok) {
                    Alert.alert('Регистрация не удалась', "Пользователь с таким именем уже существует")

                    throw new Error('Ошибка при регистрации')

                }
                console.log('Регистрация прошла успешно');
                login()
                return res.json();
            })

            .catch(error => {
                if (error.message !== 'Ошибка при регистрации') {
                    console.error('Ошибка: ', error)
                    Alert.alert('Ошибка', "Что-то пошло не так")
                }

            })


    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Регистрация</Text>

            <TextInput
                style={styles.input}
                placeholder="Введите ваше имя"
                onChangeText={setUserName}
                value={userName}
            />

            <TextInput
                style={styles.input}
                placeholder="Введите пароль"
                secureTextEntry
                onChangeText={setUserPassword}
                value={userPassword}
            />

            <View style={styles.buttonContainer}>
                <Button title="Зарегистрировать!" onPress={register}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f5e4',
        paddingHorizontal: 30,
        paddingVertical: 50,
        justifyContent: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: '600',
        marginBottom: 30,
        textAlign: 'center',
        color: '#3e2f1c',
        fontFamily: 'serif',
    },
    input: {
        borderWidth: 1,
        borderColor: '#a67c52',
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: '#fffaf0',
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


