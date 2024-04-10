import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import Register from "../controller/Sign";
import { useNavigation } from '@react-navigation/native';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
} from "react-native";

export default function SignScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [streetNumber, setStreetNumber] = useState("");
    const [streetName, setStreetName] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigation = useNavigation();
    const handleSign = async () => {
        const response = await Register(name, email, phone, streetNumber, streetName, city, postalCode, password, navigation);

        console.log(response);
        if (response === 'Invalid name') {
            setError('Invalid name');
            setName('');
        } else if (response === 'Invalid email') {
            setError('Invalid email');
            setEmail('');
        } else if (response === 'Invalid phone') {
            setError('Invalid phone');
            setPhone('');
        } else if (response === 'Invalid street number') {
            setError('Invalid street number');
            setStreetNumber('');
        } else if (response === 'Invalid street name') {
            setError('Invalid street name');
            setStreetName('');
        } else if (response === 'Invalid city') {
            setError('Invalid city');
            setCity('');
        } else if (response === 'Invalid postal code') {
            setError('Invalid postal code');
            setPostalCode('');
        } else if (response === 'Invalid password') {
            setError('Invalid password');
            setPassword('');
        } else if (response === 'Success registration') {
            setError('Success registration');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }
    }
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../assets/icon.png")} />
            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Name"
                    placeholderTextColor="#003f5c"
                    onChangeText={(name) => setName(name)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="email"
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Phone"
                    placeholderTextColor="#003f5c"
                    onChangeText={(phone) => setPhone(phone)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="streetNumber."
                    placeholderTextColor="#003f5c"
                    onChangeText={(streetNumber) => setStreetNumber(streetNumber)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="streetName."
                    placeholderTextColor="#003f5c"
                    onChangeText={(streetName) => setStreetName(streetName)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="city."
                    placeholderTextColor="#003f5c"
                    onChangeText={(city) => setCity(city)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="postalCode."
                    placeholderTextColor="#003f5c"
                    onChangeText={(postalCode) => setPostalCode(postalCode)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="password."
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.forgot_button}>Already a Member?</Text>
            </TouchableOpacity>
            <Text style={{ color: 'red' }}>{error}</Text>
            <TouchableOpacity onPress={handleSign} style={styles.loginBtn}>
                <Text style={styles.loginText}>Sign In</Text>
            </TouchableOpacity>
        </View >
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
    inputView: {
        backgroundColor: "#20CFBE",
        borderRadius: 10,
        width: "70%",
        height: 45,
        marginBottom: 10,
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 10,
    },
    forgot_button: {
        height: 30,
        marginBottom: 30,
    },
    loginBtn: {
        width: "50%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#20CFBE",
    },
});