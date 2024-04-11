import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { themeColors } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import * as Icon from "react-native-feather";
import { launchImageLibrary } from 'react-native-image-picker';
import { UserInfos, modifyUserInfos, pickImageAndSave } from "../controller/AccountDetails";
import Login from "../controller/Login";
import { useRoute } from '@react-navigation/native';
import { updateRestaurantInfos } from '../controller/Restaurateur';

export default function AccountDetailsRestaurantScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const restaurantInfos = route.params.restaurantInfos;
    const [name, setName] = useState(restaurantInfos.name);
    const [email, setEmail] = useState(restaurantInfos.email);
    const [streetNumber, setStreetNumber] = useState(restaurantInfos.streetNumber);
    const [streetName, setStreetName] = useState(restaurantInfos.streetName);
    const [phone, setPhone] = useState(restaurantInfos.phone);
    const [city, setCity] = useState(restaurantInfos.city);
    const [postalCode, setPostalCode] = useState(restaurantInfos.postalCode);
    const [bankInfo, setBankInfo] = useState(restaurantInfos.bankInfo);
    const [category, setCategory] = useState(restaurantInfos.category);
    const [imgPath, setImgPath] = useState(restaurantInfos.imgPath);
    const [error, setError] = useState('');

    useEffect(() => {
        console.log('Restaurant Infos:', restaurantInfos);
    }

        , [])
    const handleSave = async () => {
        try {
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Street Number:', streetNumber);
            console.log('Street Name:', streetName);
            console.log('Image:', imgPath);
            const response = await updateRestaurantInfos(restaurantInfos.restaurantId, name, email, phone, streetNumber, streetName, city, postalCode, bankInfo, category, imgPath);
            console.log('Response:', response);
            navigation.navigate('Restaurateur', { restaurantInfos: response });
        } catch (error) {
            console.error('Error updating restaurant infos:', error);
            setError('Error updating restaurant infos');
        }
    }
    return (
        <SafeAreaView style={{ backgroundColor: "#E8E8E8", height: "100%" }}>
            {/* top button */}
            < View style={{
                position: 'relative', paddingTop: 16, paddingBottom: 16, boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                backgroundColor: '#ffffff'
            }} >
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Restaurateur', { restaurantInfos });
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
            <Image source={require('../assets/images/tacosAvenue.png')}
                style={{ width: 150, height: 150, borderRadius: 10, alignSelf: 'center', marginTop: 30 }} />

            <TouchableOpacity style={{
                marginTop: 20, backgroundColor: '#20CFBE', padding: 10, borderRadius: 10,
                alignSelf: 'center'
            }} >
                <Text className="">Change Image</Text>
            </TouchableOpacity>

            <View style={{ marginTop: 20, marginBottom: 10, display: 'flex', alignItems: 'center' }}>
                <View className="flex-row">
                    <Icon.User className="h-20 w-20 mt-2 mr-2" stroke={themeColors.bgColor(1)} />
                    <TextInput
                        placeholder="Restaurant Name"
                        defaultValue={restaurantInfos.name}
                        onChangeText={(name) => setName(name)}
                        style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, width: '60%' }}
                    />
                </View>
            </View>
            <View style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
                <View className="flex-row">
                    <Icon.MapPin className="h-20 w-20 mt-2 mr-2" stroke={themeColors.bgColor(1)} />
                    <TextInput
                        placeholder="Adress"
                        defaultValue={restaurantInfos.streetNumber + ' ' + restaurantInfos.streetName}
                        onChangeText={(streetNumber) => setStreetNumber(streetNumber)}
                        style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, width: '60%' }}
                    />
                </View>
            </View>
            <View style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
                <View className="flex-row">
                    <Icon.Mail className="h-20 w-20 mt-2 mr-2" stroke={themeColors.bgColor(1)} />
                    <TextInput
                        placeholder="Email"
                        defaultValue={restaurantInfos.email}
                        onChangeText={(email) => setEmail(email)}
                        style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, width: '60%' }}
                    />
                </View>
            </View>

            {/* <View style={{ display: 'flex', alignItems: 'center' }}>
                <Text style={{ color: 'red', marginTop: 15 }}>{error}</Text>
            </View> */}


            <TouchableOpacity style={{
                marginTop: 20, backgroundColor: '#20CFBE', padding: 15, width: '70%', borderRadius: 10,
                alignSelf: 'center', alignItems: 'center',
            }}
                onPress={handleSave}
            >
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }}>Save</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}