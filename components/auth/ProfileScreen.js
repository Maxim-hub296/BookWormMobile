import {View, Button, Text, StyleSheet} from 'react-native';
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


    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('authToken');
            if (!token) {
                return; // нет токена — пользователь не авторизован
            }

            fetch('http://192.168.0.143:8000/api/auth-status/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`Ошибка: ${res.status}: ${res.statusText}`);
                    }
                    return res.json();
                })
                .then(data => {
                    setAuthData(data);
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
        paddingHorizontal: 30,
        paddingVertical: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        marginBottom: 30,
        fontWeight: 'bold',
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    buttonContainer: {
        width: '80%',
        marginVertical: 10,
    },
});