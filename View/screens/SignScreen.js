import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import Register from "../controller/Sign";
import { useNavigation } from '@react-navigation/native';
import * as Icon from "react-native-feather";
import { Picker } from '@react-native-picker/picker';
import { SelectList } from 'react-native-dropdown-select-list'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    KeyboardAvoidingView
} from "react-native";

export default function SignScreen() {
    const [selectedCategories, setSelectedCategories] = React.useState("");
    const [selectedValue, setSelectedValue] = useState("clients");
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
    const [inputValue, setInputValue] = useState("");
    const renderConditionalInput = () => {
        switch (selectedValue) {
            case 'clients':
                return (
                    <View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Enter your full name"
                                // PlaceholderTextColor to understand that we have to enter the text
                                placeholderTextColor="#003f5c"
                                onChangeText={(name) => setName(name)}
                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Enter your email"
                                placeholderTextColor="#003f5c"
                                onChangeText={(email) => setEmail(email)}
                            />
                        </View>

                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Enter your phone number"
                                placeholderTextColor="#003f5c"
                                onChangeText={(phone) => setPhone(phone)}
                            />
                        </View>

                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Enter your street number"
                                placeholderTextColor="#003f5c"
                                onChangeText={(streetNumber) => setStreetNumber(streetNumber)}
                            />
                        </View>

                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Enter your street name"
                                placeholderTextColor="#003f5c"
                                onChangeText={(streetName) => setStreetName(streetName)}
                            />
                        </View>

                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Enter your city"
                                placeholderTextColor="#003f5c"
                                onChangeText={(city) => setCity(city)}
                            />
                        </View>

                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Enter your postal code"
                                placeholderTextColor="#003f5c"
                                onChangeText={(postalCode) => setPostalCode(postalCode)}
                            />
                        </View>

                        <View style={{
                            width: 300,
                            backgroundColor: "#E8E8E8",
                            borderRadius: 10,
                            height: 45
                        }}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Enter your password"
                                placeholderTextColor="#003f5c"
                                secureTextEntry={true}
                                onChangeText={(password) => setPassword(password)}
                            />
                        </View>
                    </View>
                );
            case 'restaurants':
                const Data = [
                    { key: '1', value: 'Italien', disabled: true },
                    { key: '2', value: 'Mexicain' },
                    { key: '3', value: 'Japonais' },
                    { key: '4', value: 'Indien' },
                    { key: '5', value: 'Chinois' },
                    { key: '6', value: 'Fast-food' },
                    { key: '7', value: 'Divers' },
                ]
                return (
                    <View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Enter restaurant name"
                                // PlaceholderTextColor to understand that we have to enter the text
                                placeholderTextColor="#003f5c"
                                onChangeText={(name) => setName(name)}
                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Enter restaurant email"
                                placeholderTextColor="#003f5c"
                                onChangeText={(email) => setEmail(email)}
                            />
                        </View>

                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Enter the restaurant phone number"
                                placeholderTextColor="#003f5c"
                                onChangeText={(phone) => setPhone(phone)}
                            />
                        </View>

                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Enter your restaurant street number"
                                placeholderTextColor="#003f5c"
                                onChangeText={(streetNumber) => setStreetNumber(streetNumber)}
                            />
                        </View>

                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Enter your restaurant street name"
                                placeholderTextColor="#003f5c"
                                onChangeText={(streetName) => setStreetName(streetName)}
                            />
                        </View>

                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Enter your restaurant city"
                                placeholderTextColor="#003f5c"
                                onChangeText={(city) => setCity(city)}
                            />
                        </View>

                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Enter your restaurant postal code"
                                placeholderTextColor="#003f5c"
                                onChangeText={(postalCode) => setPostalCode(postalCode)}
                            />
                        </View>
                        <View className="mb-2">
                            <SelectList
                                setSelectedCategories={(val) => setSelectedCategories(val)}
                                data={Data}
                                save="value"
                                style={{ backgroundColor: "#E8E8E8", marginBottom: 10 }}
                            />
                        </View>

                        <View style={{
                            width: 300,
                            backgroundColor: "#E8E8E8",
                            borderRadius: 10,
                            height: 45
                        }}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Enter your password"
                                placeholderTextColor="#003f5c"
                                secureTextEntry={true}
                                onChangeText={(password) => setPassword(password)}
                            />
                        </View>
                    </View>
                );
            case 'commercial':
                return (
                    <View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Enter your Commercial name"
                                // PlaceholderTextColor to understand that we have to enter the text
                                placeholderTextColor="#003f5c"
                                onChangeText={(name) => setName(name)}
                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Enter your Commercial email"
                                placeholderTextColor="#003f5c"
                                onChangeText={(email) => setEmail(email)}
                            />
                        </View>

                        <View style={{
                            width: 300,
                            backgroundColor: "#E8E8E8",
                            borderRadius: 10,
                            height: 45
                        }}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Enter your password"
                                placeholderTextColor="#003f5c"
                                secureTextEntry={true}
                                onChangeText={(password) => setPassword(password)}
                            />
                        </View>
                    </View>
                );
            case 'livreurs':
                return (
                    <View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Enter your Driver name"
                                // PlaceholderTextColor to understand that we have to enter the text
                                placeholderTextColor="#003f5c"
                                onChangeText={(name) => setName(name)}
                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Enter your Driver email"
                                placeholderTextColor="#003f5c"
                                onChangeText={(email) => setEmail(email)}
                            />
                        </View>

                        <View style={{
                            width: 300,
                            backgroundColor: "#E8E8E8",
                            borderRadius: 10,
                            height: 45
                        }}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Enter your password"
                                placeholderTextColor="#003f5c"
                                secureTextEntry={true}
                                onChangeText={(password) => setPassword(password)}
                            />
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="auto" />
            <Picker
                selectedValue={selectedValue}
                style={{ width: 240, marginTop: -70 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="Client" value="clients" />
                <Picker.Item label="Restaurateur" value="restaurants" />
                <Picker.Item label="Service commercial" value="commercial" />
                <Picker.Item label="Livreur" value="livreurs" />
            </Picker>
            {renderConditionalInput()}




            <TouchableOpacity className="mt-5" onPress={() => navigation.navigate('Login')}>
                <Text style={styles.login_button}>Already a Member?</Text>
            </TouchableOpacity>
            <Text style={{ color: 'red' }}>{error}</Text>
            <TouchableOpacity onPress={handleSign} style={{
                width: "50%",
                borderRadius: 8,
                height: 50,
                marginBottom: 20,
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#20CFBE",
                // Center horizontally the text in the button
                justifyContent: "center",
                flexDirection: "row",
            }}>
                <Text style={{ color: 'black', fontSize: 20 }}>   Sign Up   </Text>
                <Icon.Check style={{ color: 'black', fontSize: 20 }} />
            </TouchableOpacity>
        </KeyboardAvoidingView >
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",

    },
    image: {
        marginBottom: 0,
        width: 150,
        height: 150,
    },
    inputView: {
        width: 300,
        backgroundColor: "#E8E8E8",
        borderRadius: 10,
        height: 45,
        marginBottom: 10
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 10,
    },
    login_button: {
        height: 30,
    }
});