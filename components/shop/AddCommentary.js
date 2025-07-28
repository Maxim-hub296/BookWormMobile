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

            fetch('http://192.168.0.143:8000/api/add-comment/', {
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
        flex: 1, backgroundColor: '#fff', paddingHorizontal: 30, paddingVertical: 50, justifyContent: 'center',
    }, title: {
        fontSize: 26, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#333',
    }, input: {
        borderWidth: 1, borderColor: '#bbb', borderRadius: 8, padding: 10, marginBottom: 20, fontSize: 16,
    }, buttonContainer: {
        marginTop: 10,
    },
});
