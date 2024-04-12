
import { View, Text, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { themeColors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import * as Icon from "react-native-feather";
import { getRestaurantMenu } from '../controller/Restaurateur';
import { useRoute } from '@react-navigation/native';

export default function MenuScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const restaurantInfos = route.params.restaurantInfos
    // Récuperer le restaurantId
    const restaurantId = restaurantInfos.restaurantId;
    const [menus, setMenus] = useState([]);
    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await getRestaurantMenu(restaurantId);
                setMenus(response);
            } catch (error) {
                console.error('Error fetching menus:', error);
            }
        }
        fetchMenus();
    }, []);

    return (
        <SafeAreaView style={{ backgroundColor: "#E8E8E8", height: "100%" }}>
            {/* top button */}
            < View style={{
                position: 'relative', paddingTop: 16, paddingBottom: 16, boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                backgroundColor: '#ffffff'
            }} >
                <TouchableOpacity
                    onPress={() => navigation.navigate('AccountRestaurateur', { restaurantInfos })}
                    style={{
                        backgroundColor: themeColors.bgColor(1), position: 'absolute',
                        left: 8, top: 15, zIndex: 10, padding: 4, borderRadius: 9999,
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                    }}>
                    <Icon.ArrowLeft strokeWidth={3} stroke="white" />
                </TouchableOpacity>
                <View>
                    <Text className="text-center font-bold text-xl">Menu</Text>
                </View>
            </View >
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="mt- pt-5"
                contentContainerStyle={{
                }}
            >
                <View className="flex-row flex-wrap justify-center">
                    {menus.map((menu, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => navigation.navigate('MenuDetails', { menu, restaurantInfos })}
                            className="flex-row items-center justify-between py-3 px-4 bg-white rounded-lg mx-2 mb-3 shadow-md">
                            <View className="flex-row items-center">
                                <Image className="h-20 w-20 rounded-lg" source={require('../assets/images/pizzaDish.png')} />
                                <View className="ml-5">
                                    <Text className="font-bold text-gray-700 mb-2 text-lg">{menu.name}</Text>
                                    <Text className="text-gray-500">{menu.price}€</Text>
                                </View>
                            </View>
                            <View className="  mt-12 flex-row">
                                <Icon.Check className="mr-1 mt-1" strokeWidth={2} height={20} width={20} stroke={themeColors.bgColor(1)} />
                                <Text className="font-semibold text-base" style={{ color: themeColors.bgColor(1) }}>Active</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 10, marginTop: 20 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('MenuAdd', { restaurantInfos })}
                            style={{
                                backgroundColor: 'red', padding: 15, width: '40%', borderRadius: 10,
                                alignSelf: 'center', alignItems: 'center',
                            }} >
                            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }}>Creer un menu </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView >
    )
}
