import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import Login from "../controller/Login";
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    KeyboardAvoidingView,
} from "react-native";
import { Navigation } from "react-native-feather";
import { Picker } from '@react-native-picker/picker';
export default function LoginScreen() {
    const [selectedCategories, setSelectedCategories] = React.useState("");
    const [selectedValue, setSelectedValue] = useState("clients");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [wrongPassword, setWrongPassword] = useState("");
    const navigation = useNavigation();
    const handleLogin = async () => {
        const response = await Login(email, password, navigation, selectedValue);
        if (response === 'Login failed') {
            setWrongPassword('Wrong email or password');
        } else if (response === 'Login successful') {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        } else {
            console.log('An error occurred:', response);
        }
    };

    const Data = [
        { key: '1', value: 'clients' },
        { key: '2', value: 'restaurants' },
        { key: '3', value: 'commercial' },
        { key: '4', value: 'livreurs' },
    ];
    return (
        // Menu déroulant avec choix : client, restaurateur, service commercial, livreur
        <KeyboardAvoidingView style={styles.container} behavior="padding" className="mb-1">
            <Image style={styles.image} source={require("../assets/icon.png")} />
            <StatusBar style="auto" />

            <View style={styles.inputView1}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Enter your email"
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>
            <View style={styles.inputView2}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Enter your password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <Picker
                selectedValue={selectedValue}
                style={{ width: 240, fontSize: 10 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="Client" value="clients" />
                <Picker.Item label="Restaurateur" value="restaurants" />
                <Picker.Item label="Service commercial" value="commercial" />
                <Picker.Item label="Livreur" value="livreurs" />
            </Picker>


            <TouchableOpacity onPress={() => navigation.navigate('Sign')}>
                <Text style={styles.forgot_button}>New? Sign Up</Text>
            </TouchableOpacity>
            <Text style={{ color: 'red' }}>{wrongPassword}</Text>
            <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView >
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        marginBottom: 10,
        width: 200,
        height: 200,
    },
    inputView1: {
        backgroundColor: "#E8E8E8",
        borderRadius: 10,
        width: "50%",
        height: 45,
        marginBottom: 20,
        marginTop: 30,
    },
    inputView2: {
        backgroundColor: "#E8E8E8",
        borderRadius: 10,
        width: "50%",
        height: 45,
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 10,
    },
    forgot_button: {
        height: 30,
        marginBottom: 10,
        color: "black",
        marginTop: 10,
    },
    loginBtn: {
        width: "50%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#20CFBE",
    },
});