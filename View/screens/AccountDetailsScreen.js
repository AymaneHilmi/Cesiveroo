import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { themeColors } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import * as Icon from "react-native-feather";
import { launchImageLibrary } from 'react-native-image-picker';
import { UserInfos, modifyUserInfos, pickImageAndSave } from "../controller/AccountDetails";
import Login from "../controller/Login";

export default function AccountDetailsScreen() {
    const navigation = useNavigation();// Create state to hold user info.
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [imageUri, setImageUri] = useState(require("../assets/images/compte.png"));
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const data = await UserInfos();

                console.log(data)
                // Assuming data contains firstName and lastName for the full name
                setFirstName(data.firstName)
                setLastName(data.lastName);
                setEmail(data.email);
                setPhone(data.phone);
                const path = data.imgPath;

                if (!(path === "" || path === null || path === undefined)) {
                    setImageUri({ uri: path });
                }
            } catch (error) {
                // Handle error, e.g., show an alert or set an error message state.
                console.log('Error fetching user info:', error);
            }
        };
        fetchUserInfo();
    }, []);


    const handleSave = async () => {
        const response = await modifyUserInfos(firstName, lastName, email, phone, imageUri.uri);

        if (response === 'Invalid First Name') {
            setError('Invalid First Name');
        } else if (response === 'Invalid Last Name') {
            setError('Invalid Last Name');
        } else if (response === 'Invalid email') {
            setError('Invalid email');
        } else if (response === 'Invalid phone') {
            setError('Invalid phone');
        } else if (response === 'Invalid street number') {
            setError('Invalid street number');
        }
    };

    const handlePickImage = async () => {
        const uri = await pickImageAndSave();
        if (uri) setImageUri({ uri }); // Met à jour l'état si une image est choisie
    };

    return (
        <SafeAreaView style={{ backgroundColor: "#E8E8E8", height: "100%" }}>
            {/* top button */}
            < View style={{
                position: 'relative', paddingTop: 16, paddingBottom: 16, boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                backgroundColor: '#ffffff'
            }} >
                <TouchableOpacity
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Account' }],
                        });
                    }}
                    style={{
                        backgroundColor: themeColors.bgColor(1), position: 'absolute',
                        left: 8, top: 15, zIndex: 10, padding: 4, borderRadius: 9999,
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                    }}>
                    <Icon.ArrowLeft strokeWidth={3} stroke="white" />
                </TouchableOpacity>
                <View>
                    <Text className="text-center font-bold text-xl">Account Details</Text>
                </View>
            </View >
            <Image source={imageUri}
                style={{ width: 150, height: 150, borderRadius: 10, alignSelf: 'center', marginTop: 30 }} />

            <TouchableOpacity style={{
                marginTop: 20, backgroundColor: '#20CFBE', padding: 10, borderRadius: 10,
                alignSelf: 'center'
            }} onPress={handlePickImage}>
                <Text className="">Change Image</Text>
            </TouchableOpacity>

            <View style={{ marginTop: 20, marginBottom: 10, display: 'flex', alignItems: 'center' }}>
                <View className="flex-row">
                    <Icon.User className="h-20 w-20 mt-2 mr-2" stroke={themeColors.bgColor(1)} />
                    <TextInput
                        placeholder="First Name"
                        defaultValue={firstName}
                        onChangeText={(firstName) => setFirstName(firstName)}
                        style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, width: '60%' }}
                    />
                </View>
            </View>
            <View style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
                <View className="flex-row">
                    <Icon.User className="h-20 w-20 mt-2 mr-2" stroke={themeColors.bgColor(1)} />
                    <TextInput
                        placeholder="Last Name"
                        defaultValue={lastName}
                        onChangeText={(lastName) => setLastName(lastName)}
                        style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, width: '60%' }}
                    />
                </View>
            </View>
            <View style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
                <View className="flex-row">
                    <Icon.Mail className="h-20 w-20 mt-2 mr-2" stroke={themeColors.bgColor(1)} />
                    <TextInput
                        placeholder="Email"
                        defaultValue={email}
                        onChangeText={(email) => setEmail(email)}
                        style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, width: '60%' }}
                    />
                </View>
            </View>
            <View style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
                <View className="flex-row">
                    <Icon.Phone className="h-20 w-20 mt-2 mr-2" stroke={themeColors.bgColor(1)} />
                    <TextInput
                        placeholder="Phone"
                        defaultValue={phone}
                        onChangeText={(phone) => setPhone(phone)}
                        style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, width: '60%' }}
                    />
                </View>
            </View>
            <View style={{ display: 'flex', alignItems: 'center' }}>
                <Text style={{ color: 'red', marginTop: 15 }}>{error}</Text>
            </View>
            {/*<Image source={require('../assets/icon.png')} style={{ width: 300, height: 300, position: 'relative', top: 20, left: 60, opacity: 0.2 }} />*/}

            <TouchableOpacity style={{
                marginTop: 20, backgroundColor: '#20CFBE', padding: 15, width: '70%', borderRadius: 10,
                alignSelf: 'center', alignItems: 'center',
            }} onPress={handleSave}>
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }}>Save</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}