import {View, Button, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function ProfileScreen() {
    const navigation = useNavigation()
    const [authData, setAuthData] = useState({
        is_authenticated: false,
        username: ''
    })


    const onRegistration = () => {
        navigation.navigate('Registration')
    }

    const onLogin = () => {
        navigation.navigate('Login')
    }

    const onLogout = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (!token) {
                console.warn('Токен не найден');
                return;
            }

            const res = await fetch('http://192.168.0.143:8000/api/logout/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`
                }
            });

            if (!res.ok) {
                throw new Error(`Ошибка: ${res.status}: ${res.statusText}`);
            }

            // Удаляем токен из хранилища
            await AsyncStorage.removeItem('authToken');

            // Обнуляем данные авторизации
            setAuthData({
                is_authenticated: false,
                username: ''
            });

        } catch (error) {
            console.error('Ошибка при выходе:', error);
        }
    };


    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('authToken');

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };

            if (token) {
                headers['Authorization'] = `Token ${token}`;
            }

            fetch('http://192.168.0.143:8000/api/auth-status/', {
                method: 'GET',
                headers: headers
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`Ошибка: ${res.status}: ${res.statusText}`);
                    }
                    return res.json();
                })
                .then(data => {
                    setAuthData(data); // например: { is_authenticated: true, username: "admin" }
                })
                .catch(error => {
                    console.error(`Ошибка: ${error}`);
                });
        };

        checkAuth();
    }, []);


    if (authData.is_authenticated) {
        return (
            <View style={styles.container}>
                <Text style={styles.welcomeText}>{`Добро пожаловать, ${authData.username}`}!</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
                    <Text style={styles.logoutButtonText}>Выйти</Text>
                </TouchableOpacity>

            </View>
        )
    }


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Добро пожаловать!</Text>
            <View style={styles.buttonContainer}>
                <Button title={'Регистрация'} onPress={onRegistration}/>
            </View>
            <View style={styles.buttonContainer}>
                <Button title={'Войти'} onPress={onLogin}/>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f5e4', // фон как у книжной страницы
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 26,
        marginBottom: 30,
        fontWeight: '600',
        color: '#3e2f1c', // тёмно-коричневый
        fontFamily: 'serif',
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: '500',
        color: '#3e2f1c',
        marginBottom: 20,
        fontFamily: 'serif',
    },
    buttonContainer: {
        width: '80%',
        marginVertical: 10,
        borderRadius: 6,
        overflow: 'hidden',
    },
    logoutButton: {
        backgroundColor: '#a67c52',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 6,
        marginTop: 20,
    },
    logoutButtonText: {
        color: '#fffaf0',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'serif',
    },
});
