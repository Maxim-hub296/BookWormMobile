import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, Button} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert} from "react-native";

export default function BookDetailScreen({route}) {
    const navigation = useNavigation()


    const {book_id} = route.params
    const [bookData, setBookData] = useState([])
    const [authData, setAuthData] = useState({
        is_authenticated: false,
        username: ''
    })
    const onPublish = () => {

        if (authData.is_authenticated) {
            navigation.navigate('AddCommentary', {book_id: book_id})

        } else {
            Alert.alert('Ошибка авторизации', "Пожалуйста, войдите в профиль, чтобы добавить комментарий",
                [
                    {
                        text: 'Отмена',
                        style: 'cancel'
                    },
                    {
                        text: 'Войти',
                        onPress: () => navigation.navigate('Login'),
                    },
                ],
                {cancelable: true}
            )
        }



    }

    useEffect(() => {
        fetch(`http://192.168.0.143:8000/api/books/${book_id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Ошибка при получении данных о книге: ${res.status}: ${res.statusText}`)
                }
                return res.json()
            })
            .then(data => {
                setBookData(data)
            })
            .catch(error => {
                console.error("Ошибка: ", error)
            })
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


    return (
        <ScrollView style={styles.container}>
            <View style={styles.coverContainer}>
                <Image source={{uri: bookData.image}} style={styles.cover}/>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{bookData.title}</Text>
                <Text style={styles.author}>Автор: {bookData.author}</Text>
                <Text style={styles.genre}>Жанр: {bookData.genre}</Text>
                <Text style={styles.year}>Год издания: {bookData.year}</Text>
                <Text style={styles.description}>{bookData.description}</Text>
                <Text style={styles.price}>Цена: {bookData.price}</Text>

                <TouchableOpacity style={styles.buyButton}>
                    <Text style={styles.buyButtonText}>Добавить в корзину</Text>
                </TouchableOpacity>

                <View style={styles.commentsContainer}>
                    <Text style={styles.commentsTitle}>Комментарии</Text>

                    {bookData.comments && bookData.comments.length > 0 ? (
                        bookData.comments.map((comment, index) => (
                            <View key={index} style={styles.comment}>
                                <Text style={styles.commentUser}>{comment.user}</Text>
                                <Text style={styles.commentText}>{comment.content}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noComments}>Нет комментариев</Text>
                    )}
                    <Button title={'Добавить комментарий'} onPress={onPublish}/>
                </View>


            </View>
        </ScrollView>
    );
}

const {width} = Dimensions.get('window');
const COVER_WIDTH = width * 0.9;     // 90% ширины экрана
const COVER_ASPECT = 2 / 3;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f4e3',
    },
    coverContainer: {
        alignItems: 'center',
        marginVertical: 16,
    },
    cover: {
        width: COVER_WIDTH,
        height: COVER_WIDTH / COVER_ASPECT,  // высота по аспекту
        borderRadius: 8,
        resizeMode: 'cover',
        backgroundColor: '#eee',
    },
    infoContainer: {
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4b3e2b',
        marginBottom: 8,
    },
    author: {
        fontSize: 16,
        marginBottom: 4,
        color: '#5a4c3d',
    },
    genre: {
        fontSize: 16,
        marginBottom: 4,
        color: '#5a4c3d',
    },
    year: {
        fontSize: 16,
        marginBottom: 12,
        color: '#5a4c3d',
    },
    description: {
        fontSize: 16,
        color: '#3e3e3e',
        marginBottom: 12,
        lineHeight: 22,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#8c5a2e',
        marginBottom: 16,
    },
    buyButton: {
        backgroundColor: '#9e6b3f',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 24,
    },
    buyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    commentsContainer: {
        paddingHorizontal: 16,
        marginBottom: 30,
    },

    commentsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#4b3e2b',
    },

    comment: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#dcd2c0',
    },

    commentUser: {
        fontWeight: 'bold',
        color: '#4b3e2b',
        marginBottom: 4,
    },

    commentText: {
        fontSize: 16,
        color: '#2e2e2e',
    },

    noComments: {
        fontSize: 16,
        color: '#6e6e6e',
        fontStyle: 'italic',
    },
});