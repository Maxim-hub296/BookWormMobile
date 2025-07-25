import {StatusBar, StyleSheet, View} from 'react-native';
import HomeScreen from './components/shop/HomeScreen';
import Header from './components/shop/Header';
import Sidebar from "./components/shop/Sidebar";
import {useState} from "react";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import GenreScreen from "./components/shop/GenreScreen";
import AuthorScreen from "./components/shop/AuthorScreen";
import YearScreen from "./components/shop/YearScreen";
import SearchResultScreen from "./components/shop/SearchResultScreen";


const Stack = createNativeStackNavigator()

export default function App() {
    const [isSideBarOpen, setSideBarOpen] = useState(false)


    return (
        <NavigationContainer>
            <Header onFilterPress={() => setSideBarOpen(true)}/>
            <Sidebar isOpen={isSideBarOpen} onClose={() => setSideBarOpen(false)}/>
            <StatusBar style={'auto'}/>
            <Stack.Navigator initialRouteName={'Home'} screenOptions={{headerShown: false}}>
                <Stack.Screen name={"Home"} component={HomeScreen}/>
                <Stack.Screen name={'Genre'} component={GenreScreen}/>
                <Stack.Screen name={'Author'} component={AuthorScreen}/>
                <Stack.Screen name={'Year'} component={YearScreen}/>
                <Stack.Screen name={'Search'} component={SearchResultScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});