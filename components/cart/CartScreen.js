import {Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";

export default function CartScreen() {

    const navigation = useNavigation()

    const [authData, setAuthData] = useState(
        {
            is_authenticated: null,
            username: ''
        }
    )
    const [cartData, setCartData] = useState()


    const getCartData = async () => {
        const token = await AsyncStorage.getItem('authToken')

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${token}`
        }

        fetch('https://bookworm.pythonanywhere.com/api/cart', {
            method: 'GET',
            headers: headers
        })
            .then(res => {

                return res.json()
            })
            .then(data => {
                setCartData(data)
            })
            .catch(error => {
                console.error(error)
            })


    }

    const checkAuth = async () => {
        const token = await AsyncStorage.getItem('authToken');

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        if (token) {
            headers['Authorization'] = `Token ${token}`;
        }

        fetch('https://bookworm.pythonanywhere.com/api/auth-status/', {
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
    }

    const removeFromCart = async (id) => {

        const token = await AsyncStorage.getItem('authToken');


        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        if (token) {
            headers['Authorization'] = `Token ${token}`;
        }


        const body = {
            'book_id': id
        }

        fetch(`https://bookworm.pythonanywhere.com/api/cart-remove/`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Ошибка удаления товара из корзины: ${res.status}`)
                }
                return getCartData()
            })
            .catch(err => {
                console.error(err)
            })
    }


    useEffect(() => {
        checkAuth()
        getCartData()
    }, []); //Благодаря пустому deps вызовется один раз


    useEffect(() => {
        if (authData.is_authenticated === false) {
            Alert.alert('Ошибка авторизации', "Для просмотра корзины нужно войти. Иначе как мы поймем чью корзину показывать? :)",
                [
                    {
                        text: 'Отмена',
                        style: "cancel"
                    },
                    {
                        text: 'Войти',
                        onPress: () => navigation.navigate('Login')

                    }
                ])
        }
    }, [authData.is_authenticated]) //А этот только при изменении переменной (но т.к checkAuth вызывается один раз то и здесь будет так же. Это совпадение :) )

    if (!cartData || cartData.items.length === 0) {
        return (
            <View style={styles.centered}>
                <Text style={styles.empty}>Корзина пуста</Text>
            </View>
        );
    }


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Корзина пользователя {authData.username}</Text>

            {cartData.items.map((item) => (
                <View key={item.id} style={styles.card}>
                    {item.book.image && (
                        <Image
                            source={{uri: item.book.image}}
                            style={styles.image}
                        />
                    )}
                    <View style={styles.info}>
                        <Text style={styles.title}>{item.book.title}</Text>
                        <Text style={styles.description} numberOfLines={2}>{item.book.description}</Text>
                        <Text style={styles.detail}>Год: {item.book.year}</Text>
                        <Text style={styles.detail}>Количество: {item.quantity}</Text>
                        <Text style={styles.detail}>Цена за 1: {item.book.price}₽</Text>
                        <Text style={styles.total}>Итого: {item.total_price}₽</Text>
                    </View>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => removeFromCart(item.book.id)}>
                        <Ionicons name={'trash-outline'} size={22} color={"#a33"}/>
                    </TouchableOpacity>
                </View>
            ))}

            <View style={styles.summary}>
                <Text style={styles.summaryText}>Всего товаров: {cartData.total_count}</Text>
                <Text style={styles.summaryText}>Общая сумма: {cartData.total_sum}₽</Text>
            </View>

            <TouchableOpacity style={styles.orderButton} onPress={() => navigation.navigate('GoodBye')}>

                <Text style={styles.orderButtonText}>Оформить заказ</Text>
            </TouchableOpacity>

        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f8f4e3", // фон всей страницы
    },
    centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#4a3f2c", // тёмно-коричневый для заголовков
    },
    empty: {
        fontSize: 18,
        color: "#7a6c57", // приглушённый серо-коричневый
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#fff8e8", // светлая карточка
        borderRadius: 10,
        marginBottom: 16,
        elevation: 2,
        padding: 10,
        borderWidth: 1,
        borderColor: "#e6dcc9",
    },
    image: {
        width: 90,
        height: 130,
        borderRadius: 8,
        marginRight: 10,
        backgroundColor: "#e6dcc9", // placeholder цвет
    },
    info: {
        flex: 1,
        justifyContent: "space-between",
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#5c4b30",
    },
    description: {
        fontSize: 12,
        color: "#776957",
        marginTop: 4,
    },
    detail: {
        fontSize: 13,
        color: "#6e5e45",
        marginTop: 4,
    },
    total: {
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 6,
        color: "#8a5d00", // насыщенный тёплый цвет акцента
    },
    summary: {
        marginTop: 20,
        backgroundColor: "#f0e6d2",
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#dfd3bd",
    },
    summaryText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#4a3f2c",
        marginBottom: 5,
    },
    orderButton: {
        backgroundColor: "#8a5d00",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 15,
        alignItems: 'center',
    },
    orderButtonText: {
        color: "#fff8e8",
        fontSize: 16,
        fontWeight: "bold",
    },
    deleteButton: {
        position: 'absolute',
        right: 8,
        top: '40%',
        backgroundColor: '#ffe6e6',
        padding: 6,
        borderRadius: 20,
        elevation: 2,
    },

});






