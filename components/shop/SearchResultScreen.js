import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import BookCard from './BookCard';
import {useNavigation} from "@react-navigation/native";


export default function SearchResultScreen({route}) {
    const [books, setBooks] = useState([])
    const navigation = useNavigation()
    const {search_query} = route.params

    useEffect(() => {
        fetch(`http://192.168.0.143:8000/api/search/?q=${search_query}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Ошибка при получение списка книг: ", res.status)
                }
                return res.json()
            })
            .then(data => {
                setBooks(data)
            })
            .catch(error => {
                console.error('Ошибка: ', error)
            })
    }, [search_query])

    const handlePress = (item) => {
        console.log(`Открыть книгу: ${item.title}`);
        navigation.navigate('DetailBook', {book_id: item.id})
        // Здесь можно использовать навигацию, например: navigation.navigate('Details', { book: item })
    };

    const addToCart = (item) => {
        console.log(`Добавлена в корзину книга: ${item.title}`)
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
