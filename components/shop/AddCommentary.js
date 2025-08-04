import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddCommentaryScreen({route}) {
    const navigation = useNavigation();

    const [content, setContent] = useState('')
    const {book_id} = route.params


    const publish = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken')

            fetch('https://bookworm.pythonanywhere.com/api/add-comment/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify({
                    content: content,
                    book: book_id,
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log('Комментарий создан: ', data)
                    navigation.navigate('DetailBook', {book_id: book_id})
                })
                .catch(err => {
                    console.error("Ошибка при создании комментария: ", err)
                })
        } catch (error) {
            console.error(error)
        }


    }

    return (<View style={styles.container}>
        <Text style={styles.title}>Публикация комментария</Text>

        <TextInput
            style={styles.input}
            placeholder="Введите ваш комменатрий"
            onChangeText={setContent}
            value={content}
        />


        <View style={styles.buttonContainer}>
            <Button title="Опубликовать!" onPress={publish}/>
        </View>
    </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f5e4', // фон старой бумаги
        paddingHorizontal: 30,
        paddingVertical: 50,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 30,
        textAlign: 'center',
        color: '#3e2f1c', // тёмно-коричневый
        fontFamily: 'serif',
    },
    input: {
        borderWidth: 1,
        borderColor: '#a67c52', // тёплый коричневый
        borderRadius: 6,
        paddingVertical: 12,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: '#fffaf0', // светло-желтоватый
        color: '#3e2f1c',
        fontFamily: 'serif',
        textAlignVertical: 'top',
        minHeight: 120, // чтобы поле было похоже на «заметку»
    },
    buttonContainer: {
        marginTop: 10,
        backgroundColor: '#a67c52',
        borderRadius: 6,
        overflow: 'hidden',
    },
});
