import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { themeColors } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import * as Icon from "react-native-feather";
import { Dropdown } from 'react-native-element-dropdown';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { createMenu } from '../controller/Restaurateur';
export default function MenuAddScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const restaurantInfos = route.params.restaurantInfos
    const restaurantId = restaurantInfos.restaurantId;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [response, setResponse] = useState([]);
    // Créer un menu
    const handleCreateMenu = async () => {
        try {
            const response = await createMenu(restaurantId, name, price);
            // Reset the MenuScreen
            navigation.reset({
                index: 0,
                routes: [{ name: 'Menu', params: { restaurantInfos } }]
            });
            // Navigate to MenuScreen
            navigation.navigate('Menu', { restaurantInfos });
        } catch (error) {
            console.error('Error creating menu:', error);
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: "#E8E8E8", height: '100%' }}>
            < View style={{
                backgroundColor: '#ffffff',
                position: 'relative', paddingTop: 20, paddingBottom: 20, boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            }} >
                <View>
                    <Text className="text-center font-bold text-xl">Menu Pizza</Text>
                </View>
            </View >

            <Image source={require('../assets/images/pizza.png')}
                style={{ width: 220, height: 220, borderRadius: 10, alignSelf: 'center', marginTop: 30 }} />

            <TouchableOpacity style={{
                marginTop: 20, backgroundColor: '#20CFBE', padding: 10, borderRadius: 10,
                alignSelf: 'center'
            }}>
                <Text className="">Change Image</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 5, marginBottom: 10, display: 'flex', }}>
                <View className="ml-24 mb-3">
                    <Text className="font-bold" style={{ color: themeColors.bgColor(1) }} >Name :</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TextInput
                        placeholder="Name"
                        onChangeText={(text) => setName(text)}
                        style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, width: '60%' }}
                    />
                </View>
            </View>
            <View style={{ marginTop: 5, display: 'flex', }}>
                <View className="ml-24 mb-3">
                    <Text className="font-bold" style={{ color: themeColors.bgColor(1) }} >Price :</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TextInput
                        placeholder="Price"
                        style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, width: '60%' }}
                        onChangeText={(text) => setPrice(text)}
                    />
                </View>
            </View>
            <View style={{ display: 'flex', alignItems: 'center' }}>
                <Text style={{ color: 'red', marginTop: 15 }}></Text>
            </View>
            {/*<Image source={require('../assets/icon.png')} style={{ width: 300, height: 300, position: 'relative', top: 20, left: 60, opacity: 0.2 }} />*/}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 10, marginTop: 20 }}>
                <TouchableOpacity onPress={handleCreateMenu} style={{
                    backgroundColor: '#20CFBE', padding: 15, width: '40%', borderRadius: 10,
                    alignSelf: 'center', alignItems: 'center',
                }} >
                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }}>Create</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}