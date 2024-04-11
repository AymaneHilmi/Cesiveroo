import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import { themeColors } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import FeaturedRow from '../components/featuredRow';
import * as Icon from "react-native-feather";
import LinearGradient from 'react-native-linear-gradient';
import { useRoute } from '@react-navigation/native';
import { Restaurateur, getRestaurantMenu } from '../controller/Restaurateur';
import { useEffect, useState } from 'react';

// Récupérer les informations du restaurant
export default function RestaurateurScreen() {
    const navigation = useNavigation();
    const [restaurantId, setRestaurantId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [streetNumber, setStreetNumber] = useState('');
    const [streetName, setStreetName] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [bankInfo, setBankInfo] = useState('');
    const [category, setCategory] = useState('');
    const [imgPath, setImgPath] = useState('');
    const [menus, setMenus] = useState([]);
    const [restaurantInfos, setRestaurantInfos] = useState({});

    useEffect(() => {
        Restaurateur().then((response) => {
            console.log('Restaurant Infos:', response);
            const restaurandId = response.restaurantId;
            const name = response.name;
            const email = response.email;
            const phone = response.phone;
            const streetNumber = response.streetNumber;
            const streetName = response.streetName;
            const city = response.city;
            const postalCode = response.postalCode;
            const bankInfo = response.bankInfo;
            const category = response.category;
            const imgPath = response.imgPath;
            setRestaurantId(restaurandId);
            setName(name);
            setEmail(email);
            setPhone(phone);
            setStreetNumber(streetNumber);
            setStreetName(streetName);
            setCity(city);
            setPostalCode(postalCode);
            setBankInfo(bankInfo);
            setCategory(category);
            setImgPath(imgPath);
            // Tout mettre dans restaurantInfos
            setRestaurantInfos(response);
        }
        );
    }
        , []);

    return (
        <SafeAreaView style={{ height: "100%", backgroundColor: '#E8E8E8' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 8, marginTop: 20 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AccountRestaurateur', { restaurantInfos })}
                    style={{
                        backgroundColor: themeColors.bgColor(1),
                        zIndex: 10, padding: 10, borderRadius: 9999,
                        shadowColor: 'black',
                        shadowOffset: {
                            width: 0, // Décalage horizontal de l'ombre; positif à droite
                            height: 2, // Décalage vertical de l'ombre; positif en bas
                        },
                        shadowOpacity: 0.3, // Opacité de l'ombre; 1 est complètement opaque
                        shadowRadius: 3.84, // Flou de l'ombre,
                    }}>
                    <Icon.Menu strokeWidth={3} stroke="white" />
                </TouchableOpacity>
                <View className="justify-center">
                    <Text style={{ fontSize: 20 }}>Good Morning,</Text>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: themeColors.primary }}>{name}</Text>
                </View>
                <TouchableOpacity
                    style={{ marginLeft: 6, padding: 10, borderRadius: 999 }}>
                    <Image source={require('../assets/images/tacosAvenue.png')} style={{ width: 50, height: 50, borderRadius: 999 }} />
                </TouchableOpacity>
            </View>
            {/* main */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>


                {/* featured */}
                <View style={{ marginTop: 10 }}>
                    <View style={{ paddingLeft: 16, paddingRight: 16, flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                        <View>
                            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Some Statistics</Text>
                        </View>
                    </View >
                    {/* Variable a mettre dans le on press pour chaque element */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
                        <View style={{ justifyContent: 'space-between', backgroundColor: '#c6e2e9', width: '46%', height: 150, borderRadius: 20, marginTop: 10, marginLeft: 10, marginRight: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20 }}>Orders</Text>
                            <View style={{ flexDirection: 'row' }} >
                                <Text style={{ fontSize: 70, fontWeight: 'bold', marginLeft: 20, marginBottom: 10 }}>47</Text>
                                <Icon.ShoppingCart height={50} width={50} stroke="black" className="mt-5 ml-4" />
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between', backgroundColor: '#FFDAB9', width: '46%', height: 150, borderRadius: 20, marginTop: 10, marginLeft: 10, marginRight: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20 }}>Articles</Text>
                            <View style={{ flexDirection: 'row' }} >
                                <Text style={{ fontSize: 70, fontWeight: 'bold', marginLeft: 20, marginBottom: 10 }}>12</Text>
                                <Image source={require('../assets/images/couvert.png')} style={{ width: 50, height: 50 }} className="mt-5 ml-4" />
                            </View>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#BDFCC9', width: '90%', height: 150, borderRadius: 20, marginTop: 10, marginLeft: 20, marginRight: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20 }}>Earnings</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
                            <Icon.DollarSign height={60} width={60} stroke="green" strokeWidth={4} className="mt-3" />
                            <Text style={{ fontSize: 70, fontWeight: 'bold', marginLeft: 20, marginBottom: 10 }}>12 459 </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >


    )
}