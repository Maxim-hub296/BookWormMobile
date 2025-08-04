import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

export default function BookCard({book, onPress, onAddToCart}) {



    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image
                source={{uri: book.image}}
                style={styles.image}
                resizeMode='cover'
            />
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>{book.authors?.[0]?.name || 'Неизвестный автор'}</Text>
            <Text style={styles.price}>{book.price} ₽</Text>

            <TouchableOpacity style={styles.button} onPress={onAddToCart}>
                <Text style={styles.buttonText}>Добавить в корзину</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )

}

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 48) / 2;


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fdf6e3',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        marginHorizontal: 8,
        width: cardWidth,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 2,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: '#eee',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4b3e2b',
        textAlign: 'center',
        marginBottom: 4,
    },
    author: {
        fontSize: 13,
        color: '#6e5d42',
        marginBottom: 6,
        textAlign: 'center',
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#9e6b3f',
        marginBottom: 8,
    },
    button: {
        backgroundColor: '#b78b56',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff8e7',
        fontSize: 13,
        fontWeight: 'bold',
    },
});