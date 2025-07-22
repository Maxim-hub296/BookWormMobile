// Sidebar.js
import React, {useEffect, useState, useRef} from 'react';
import {
    Animated,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
    Platform,
    StatusBar,
    PanResponder
} from 'react-native';

const {width} = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.75;

export default function Sidebar({isOpen, onClose}) {
    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [years, setYears] = useState([]);
    const translateX = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;

    // Подгружаем данные один раз
    useEffect(() => {
        getGenres();
        getAuthors();
        getYears();
    }, []);

    // Анимация открытия/закрытия
    useEffect(() => {
        Animated.timing(translateX, {
            toValue: isOpen ? 0 : -SIDEBAR_WIDTH,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isOpen]);

    // Обработчик жеста свайпа для закрытия
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => isOpen,
            onMoveShouldSetPanResponder: (_, gesture) => isOpen && Math.abs(gesture.dx) > 10,
            onPanResponderRelease: (_, gesture) => {
                if (gesture.dx < -50) {
                    onClose();
                }
            }
        })
    ).current;

    const getGenres = () => {
        fetch('http://192.168.0.143:8000/api/genres/')
            .then(res => {
                if (!res.ok) throw new Error("Ошибка при получении жанров: " + res.status);
                return res.json();
            })
            .then(setGenres)
            .catch(console.error);
    };

    const getAuthors = () => {
        fetch('http://192.168.0.143:8000/api/authors/')
            .then(res => {
                if (!res.ok) throw new Error("Ошибка при получении авторов: " + res.status);
                return res.json();
            })
            .then(setAuthors)
            .catch(console.error);
    };

    const getYears = () => {
        fetch('http://192.168.0.143:8000/api/years/')
            .then(res => {
                if (!res.ok) throw new Error("Ошибка при получении годов: " + res.status);
                return res.json();
            })
            .then(data => setYears(data))
            .catch(console.error);
    };

    return (
        <Animated.View
            style={[styles.container, {transform: [{translateX}]}]}
            {...panResponder.panHandlers}
        >
            <View style={styles.header}>
                <Text style={styles.headerText}>Фильтры</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Text style={styles.close}>×</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scroll}>
                <Text style={styles.section}>Жанры</Text>
                {genres.map(g => (
                    <TouchableOpacity key={g.slug} style={styles.item} onPress={() => console.log('Жанр:', g.name)}>
                        <Text style={styles.itemText}>{g.name}</Text>
                    </TouchableOpacity>
                ))}
                <Text style={styles.section}>Авторы</Text>
                {authors.map(a => (
                    <TouchableOpacity key={a.slug} style={styles.item} onPress={() => console.log('Автор:', a.name)}>
                        <Text style={styles.itemText}>{a.name}</Text>
                    </TouchableOpacity>
                ))}
                <Text style={styles.section}>Годы</Text>
                {years.map(y => (
                    <TouchableOpacity key={y.year.toString()} style={styles.item}
                                      onPress={() => console.log('Год:', y.year)}>
                        <Text style={styles.itemText}>{y.year}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        top: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        bottom: 0,
        width: SIDEBAR_WIDTH,
        backgroundColor: '#fdf6e3',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {width: 2, height: 0},
        shadowRadius: 4,
        elevation: 5,
        zIndex: 1000,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#e0d9c4',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4b3e2b',
    },
    close: {
        fontSize: 24,
        color: '#4b3e2b',
    },
    closeButton: {
        padding: 8,
        borderRadius: 4,
    },
    scroll: {
        padding: 16,
    },
    section: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 12,
        marginBottom: 4,
        color: '#4b3e2b',
    },
    item: {
        paddingVertical: 8,
        borderBottomWidth: 1,       // лёгкий разделитель
        borderBottomColor: '#e0d9c4',
    },
    itemText: {
        fontSize: 14,
        color: '#6e5d42',           // серо‑коричневый для пунктов
    },
});
