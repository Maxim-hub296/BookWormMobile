import React from "react";
import {ScrollView, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";


export default function GoodBye() {
    const navigation = useNavigation()
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>
                    🎉 УРА! ВАШ ЗАКАЗ УЛЕТЕЛ В ДЕМО-КОСМОС!
                </Text>

                <Text style={styles.paragraph}>Дорогой со-испытатель,</Text>

                <Text style={styles.paragraph}>
                    Это нажатие кнопки – для меня гораздо больше, чем код. Это финальный аккорд в симфонии, которую я
                    писал ночами, вдохновляясь шелестом страниц (пусть пока и виртуальных).
                </Text>

                <View style={styles.highlight}>
                    <Text style={styles.paragraph}>
                        ⚡ Я безумно горжусь этим магазином. Каждая строчка кода – это кирпичик в моём книжном замке, и
                        видеть, как вы в него "зашли"... Это волшебство! Ваше действие – как первые аплодисменты после
                        долгих репетиций.
                    </Text>
                </View>

                <Text style={styles.subtitle}>✨ Что теперь? Магия в действии!</Text>

                <Text style={styles.paragraph}>
                    Ваши книги уже "упакованы" в облака фантазии, а наш невидимый курьер-демон (с опытом работы в
                    параллельных мирах) уже мчится по цифровому эфиру. Оплата? Оплачена щедростью вашего любопытства!
                </Text>

                <View style={styles.secret}>
                    <Text style={styles.paragraphItalic}>
                        Но по секрету:{"\n"}Я жду не дождусь, когда эти полки наполнятся настоящими историями для
                        настоящих книголюбов – вроде вас!
                    </Text>
                </View>

                <View style={styles.feedback}>
                    <Text style={styles.subtitle}>💬 Ваши мысли – мой самый ценный код:</Text>
                    <Text style={styles.paragraph}>
                        Нашли баг? Есть идея? Просто хотите сказать "Привет!"? Пишите! Я здесь, открыт и очень
                        благодарен за ваше участие в этой "премьере".
                    </Text>
                    <Text style={styles.telegram}>📨 Я в Telegram: @Wanderer2754</Text>
                </View>

                <Text style={styles.paragraph}>
                    Спасибо, что стали частью моей истории!{"\n"}Без вас эта глава была бы куда менее вдохновляющей.
                </Text>

                <View style={styles.signature}>
                    <Text style={styles.paragraph}>С теплом и книжной пылью (пока виртуальной),</Text>
                    <Text style={styles.author}>Максим, магазин BookWorm</Text>
                    <Text style={styles.footerNote}>
                        ⚠️ P.S. Если вдруг реальная книга таки прилетела – считайте, что это не баг, а бета-тест
                        волшебства!
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={styles.buttonText}>🏠 Вернуться в книжную галактику</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#f8f4e3",
        padding: 20,
    },
    card: {
        backgroundColor: "#fffaf0",
        padding: 20,
        borderRadius: 12,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#37474f",
        textAlign: "center",
        marginBottom: 16,
    },
    paragraph: {
        fontSize: 16,
        color: "#4e342e",
        marginBottom: 14,
    },
    paragraphItalic: {
        fontSize: 16,
        color: "#4e342e",
        fontStyle: "italic",
        marginBottom: 14,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#3e2723",
        marginTop: 20,
        marginBottom: 10,
    },
    highlight: {
        backgroundColor: "rgba(128, 206, 255, 0.1)",
        borderLeftWidth: 4,
        borderColor: "#00bcd4",
        padding: 12,
        borderRadius: 6,
        marginBottom: 16,
    },
    secret: {
        backgroundColor: "#ffffffcc",
        borderStyle: "dashed",
        borderWidth: 1,
        borderColor: "#00bcd4",
        padding: 14,
        borderRadius: 6,
        marginBottom: 16,
    },
    feedback: {
        backgroundColor: "#fefaf0",
        borderWidth: 1,
        borderColor: "#d7ccc8",
        padding: 14,
        borderRadius: 6,
        marginBottom: 16,
    },
    telegram: {
        fontSize: 16,
        marginTop: 10,
        color: "#1976d2",
        fontWeight: "500",
    },
    signature: {
        marginTop: 20,
        borderTopWidth: 1,
        borderColor: "#ccc",
        paddingTop: 12,
    },
    author: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#3e2723",
        marginTop: 6,
    },
    footerNote: {
        marginTop: 10,
        fontSize: 14,
        color: "#6d4c41",
    },
    button: {
        marginTop: 30,
        backgroundColor: "#007aff",
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
})

