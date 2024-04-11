import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { themeColors } from '../theme';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as Icon from "react-native-feather";
import Command from "../controller/Command";

export default function CartScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { articles, menus, quantityByMenu, priceByMenu, quantityByArticle, priceByArticle, totalPrice } = route.params;
    console.log(articles, menus, quantityByMenu, priceByMenu, quantityByArticle, priceByArticle, totalPrice)

    const passCommand = async (RestaurantID, price) => {
        const response = await Command(RestaurantID, price);
        navigation.navigate('PreparingOrder')
    };
    return (

        <View style={{ flex: 1, backgroundColor: '#ffffff', marginTop: 50 }}>
            {/* top button */}
            < View style={{
                position: 'relative', paddingTop: 16, paddingBottom: 16, boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            }} >
                <TouchableOpacity
                    onPress={navigation.goBack}
                    style={{
                        backgroundColor: themeColors.bgColor(1), position: 'absolute',
                        left: 8, top: 20, zIndex: 10, padding: 4, borderRadius: 9999,
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                    }}>
                    <Icon.ArrowLeft strokeWidth={3} stroke="white" />
                </TouchableOpacity>
                <View>
                    <Text className="text-center font-bold text-xl">Your cart</Text>
                </View>
            </View >
            {/* delivery time */}
            <View style={{ backgroundColor: themeColors.bgColor(0.2) }} className="flex-row px-4 items-center">
                <Image source={require('../assets/images/BikeGuy.gif')} className="w-20 h-20 rounded-full" />
                <Text className="flex-1 pl-4">Deliver in 20-30 minutes</Text>
                <TouchableOpacity>
                    <Text style={{ color: themeColors.text }} className="font-bold">Change</Text>
                </TouchableOpacity>
            </View>
            {/* dishes */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="bg-white pt-5"
                contentContainerStyle={{
                    paddingBottom: 50
                }}

            >
                {Object.entries(priceByMenu).map(([id, price]) => (
                <View
                    className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md">
                    <Text style={{ color: themeColors.text }} className="font-bold">{quantityByMenu[id]} x </Text>
                    <Image className="h-14 w-14 rounded-full" source={require('../assets/images/pizzaDish.png')} />
                    <Text className="flex-1 font-bold text-gray-700">{menus.find(men => men.MenuID === parseInt(id))?.name}</Text>
                    <Text className="font-semibold text-base">${price}</Text>
                    {/*<TouchableOpacity*/}
                    {/*    className="p-1 rounded-full"*/}
                    {/*    style={{ backgroundColor: themeColors.bgColor(1) }}*/}
                    {/*// onPress={() => dispatch(removeFromBasket({ id: items[0]?.id }))}/*/}
                    {/*>*/}
                    {/*    <Icon.Minus strokeWidth={2} height={20} width={20} stroke="white" />*/}
                    {/*</TouchableOpacity>*/}
                </View>
                ))}
                {Object.entries(priceByArticle).map(([id, price]) => (
                    <View
                        className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md">
                        <Text style={{ color: themeColors.text }} className="font-bold">{quantityByArticle[id]} x </Text>
                        <Image className="h-14 w-14 rounded-full" source={require('../assets/images/pizzaDish.png')} />
                        <Text className="flex-1 font-bold text-gray-700">{articles.find(art => art.ArticleID === parseInt(id))?.Name}</Text>
                        <Text className="font-semibold text-base">${price}</Text>
                    </View>
                ))}
            </ScrollView>

            {/* totals */}
            <View style={{ backgroundColor: themeColors.bgColor(0.2) }} className=" p-6 px-8 rounded-t-3xl space-y-4">
                <View className="flex-row justify-between">
                    <Text className="text-gray-700">Subtotal</Text>
                    <Text className="text-gray-700">${totalPrice}</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-gray-700">Delivery Fee</Text>
                    <Text className="text-gray-700">Free</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="font-extrabold">Order Total</Text>
                    <Text className="font-extrabold">${totalPrice}</Text>
                </View>
                <View>
                    <TouchableOpacity
                        style={{ backgroundColor: themeColors.bgColor(1) }}
                        onPress={() => passCommand(articles[0].RestaurantID, totalPrice)}
                        className="p-3 rounded-full">
                        <Text className="text-white text-center font-bold text-lg">Place Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}