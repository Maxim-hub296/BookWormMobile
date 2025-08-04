import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Alert, ToastAndroid} from 'react-native';
import BookCard from './BookCard';
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function HomeScreen() {
    const [books, setBooks] = useState([])

    const navigation = useNavigation()


    useEffect(() => {
        fetch('https://bookworm.pythonanywhere.com/api/books/')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Ошибка при получение списка книг:  ${res.status}: ${res.statusText}`)
                }
                return res.json()
            })
            .then(data => {
                setBooks(data)
            })
            .catch(error => {
                console.error('Ошибка: ', error)
            })
    }, [])

    const handlePress = (item) => {
        console.log(`Открыть книгу: ${item.title}`);
        navigation.navigate('DetailBook', {book_id: item.id})
        // Здесь можно использовать навигацию, например: navigation.navigate('Details', { book: item })
    };

    const addToCart = async (item) => {
        console.log('Нажата')
        const token = await AsyncStorage.getItem('authToken')

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        const body = {
            'book_id': item.id,
            'quantity': 1,
        }

        if (!token) {
            Alert.alert("Ошибка авторизации", "Для добавления в корзину нужно войти, иначе как мы поймем кому в корзину добавлять книгу? :)",
                [
                    {
                        text: 'Отмена',
                        style: 'cancel'
                    },
                    {
                        text: "Войти",
                        onPress: () => navigation.navigate('Login')
                    }
                ])
        } else  {
            console.log("Токен есть")
            headers['Authorization'] = `Token ${token}`
        }

        fetch("https://bookworm.pythonanywhere.com/api/cart-add/", {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        })

            .then(res => {
                console.log(res)
            if (!res.ok) {
                throw new Error(`Ошибка добавления в корзину: ${res.status}`)
            } ToastAndroid.show('Товар добавлен в корзину', ToastAndroid.SHORT)
        })


    }

    const renderItem = ({item}) => (
        <BookCard
            book={item}
            onPress={() => handlePress(item)}
            onAddToCart={() => addToCart(item)}/>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={books}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.list}
                numColumns={2}
                showsVerticalScrollIndicator={false}
            />
            <StatusBar style="auto"/>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f4e3',
    },
    list: {
        padding: 16,
    },
});
