import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet} from 'react-native';
import {useNavigation} from "@react-navigation/native";

export default function RegistrationScreen() {
  const navigation = useNavigation();

  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const data = {
    username: userName,
    password: userPassword
  };

  const register = () => {
    fetch('http://192.168.0.143:8000/api/register/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Ошибка регистрации: ${res.status}`);
        }
        console.log('Регистрация прошла успешно');
        return res.json();
      })
      .then(() => navigation.navigate('Profile'))
      .catch(error => {
        console.error(`Ошибка: ${error}`);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>

      <TextInput
        style={styles.input}
        placeholder="Введите ваше имя"
        onChangeText={setUserName}
        value={userName}
      />

      <TextInput
        style={styles.input}
        placeholder="Введите пароль"
        secureTextEntry
        onChangeText={setUserPassword}
        value={userPassword}
      />

      <View style={styles.buttonContainer}>
        <Button title="Зарегистрировать!" onPress={register} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 50,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
