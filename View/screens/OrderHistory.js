import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { themeColors } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import * as Icon from "react-native-feather";


export default function OrderHistory() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ backgroundColor: "#E8E8E8", height: "100%" }}>
            {/* top button */}
            < View style={{
                position: 'relative', paddingTop: 16, paddingBottom: 16, boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                backgroundColor: '#ffffff'
            }} >
                <TouchableOpacity
                    onPress={navigation.goBack()}
                    style={{
                        backgroundColor: themeColors.bgColor(1), position: 'absolute',
                        left: 8, top: 15, zIndex: 10, padding: 4, borderRadius: 9999,
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                    }}>
                    <Icon.ArrowLeft strokeWidth={3} stroke="white" />
                </TouchableOpacity>
                <View>
                    <Text className="text-center font-bold text-xl">Orders History</Text>
                </View>
            </View >
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="mt- pt-5"
                contentContainerStyle={{
                }}

            >
                <View
                    className="flex-row items-center justify-between py-3 px-4 bg-white rounded-lg mx-2 mb-3 shadow-md">
                    <View className="flex-row items-center">
                        <Image className="h-20 w-20 rounded-lg" source={require('../assets/images/pizzaDish.png')} />
                        <View className="ml-5">
                            <Text className="font-bold text-gray-700 mb-2 text-lg">Pizza della Mamma</Text>
                            <Text className="text-gray-500">2 articles - $20</Text>
                            <Text className="text-gray-500">20 Mars 2024</Text>
                        </View>
                    </View>
                    <View className="  mt-12 flex-row">
                        <Icon.Check className="mr-1 mt-1" strokeWidth={2} height={20} width={20} stroke={themeColors.bgColor(1)} />
                        <Text className="font-semibold text-base" style={{ color: themeColors.bgColor(1) }}>Delivered</Text>
                    </View>
                </View>
                <View
                    className="flex-row items-center justify-between py-3 px-4 bg-white rounded-lg mx-2 mb-3 shadow-md">
                    <View className="flex-row items-center">
                        <Image className="h-20 w-20 rounded-lg" source={require('../assets/images/pizzaKebab.png')} />
                        <View className="ml-5">
                            <Text className="font-bold text-gray-700 mb-2 text-lg">Papa John's</Text>
                            <Text className="text-gray-500">2 articles - $20</Text>
                            <Text className="text-gray-500">20 Mars 2024</Text>
                        </View>
                    </View>
                    <View className="  mt-12 flex-row">
                        <Icon.Check className="mr-1 mt-1" strokeWidth={2} height={20} width={20} stroke={themeColors.bgColor(1)} />
                        <Text className="font-semibold text-base" style={{ color: themeColors.bgColor(1) }}>Delivered</Text>
                    </View>
                </View>
                <View
                    className="flex-row items-center justify-between py-3 px-4 bg-white rounded-lg mx-2 mb-3 shadow-md">
                    <View className="flex-row items-center">
                        <Image className="h-20 w-20 rounded-lg" source={require('../assets/images/pizzaOrientale.jpg')} />
                        <View className="ml-5">
                            <Text className="font-bold text-gray-700 mb-2 text-lg">Pizza Kebab</Text>
                            <Text className="text-gray-500">2 articles - $20</Text>
                            <Text className="text-gray-500">20 Mars 2024</Text>
                        </View>
                    </View>
                    <View className="  mt-12 flex-row">
                        <Icon.Check className="mr-1 mt-1" strokeWidth={2} height={20} width={20} stroke={themeColors.bgColor(1)} />
                        <Text className="font-semibold text-base" style={{ color: themeColors.bgColor(1) }}>Delivered</Text>
                    </View>
                </View><View
                    className="flex-row items-center justify-between py-3 px-4 bg-white rounded-lg mx-2 mb-3 shadow-md">
                    <View className="flex-row items-center">
                        <Image className="h-20 w-20 rounded-lg" source={require('../assets/images/pizzaMargherita.jpeg')} />
                        <View className="ml-5">
                            <Text className="font-bold text-gray-700 mb-2 text-lg">Pizza Margherita</Text>
                            <Text className="text-gray-500">2 articles - $20</Text>
                            <Text className="text-gray-500">20 Mars 2024</Text>
                        </View>
                    </View>
                    <View className="  mt-12 flex-row">
                        <Icon.Check className="mr-1 mt-1" strokeWidth={2} height={20} width={20} stroke={themeColors.bgColor(1)} />
                        <Text className="font-semibold text-base" style={{ color: themeColors.bgColor(1) }}>Delivered</Text>
                    </View>
                </View>
                <View
                    className="flex-row items-center justify-between py-3 px-4 bg-white rounded-lg mx-2 mb-3 shadow-md">
                    <View className="flex-row items-center">
                        <Image className="h-20 w-20 rounded-lg" source={require('../assets/images/pizza.png')} />
                        <View className="ml-5">
                            <Text className="font-bold text-gray-700 mb-2 text-lg">Pizza Orientale</Text>
                            <Text className="text-gray-500">2 articles - $20</Text>
                            <Text className="text-gray-500">20 Mars 2024</Text>
                        </View>
                    </View>
                    <View className="  mt-12 flex-row">
                        <Icon.Check className="mr-1 mt-1" strokeWidth={2} height={20} width={20} stroke={themeColors.bgColor(1)} />
                        <Text className="font-semibold text-base" style={{ color: themeColors.bgColor(1) }}>Delivered</Text>
                    </View>
                </View>
                <View
                    className="flex-row items-center justify-between py-3 px-4 bg-white rounded-lg mx-2 mb-3 shadow-md">
                    <View className="flex-row items-center">
                        <Image className="h-20 w-20 rounded-lg" source={require('../assets/images/pizzaKebab.png')} />
                        <View className="ml-5">
                            <Text className="font-bold text-gray-700 mb-2 text-lg">Domino's Pizza</Text>
                            <Text className="text-gray-500">2 articles - $20</Text>
                            <Text className="text-gray-500">20 Mars 2024</Text>
                        </View>
                    </View>
                    <View className="  mt-12 flex-row">
                        <Icon.Check className="mr-1 mt-1" strokeWidth={2} height={20} width={20} stroke={themeColors.bgColor(1)} />
                        <Text className="font-semibold text-base" style={{ color: themeColors.bgColor(1) }}>Delivered</Text>
                    </View>
                </View>
                <View
                    className="flex-row items-center justify-between py-3 px-4 bg-white rounded-lg mx-2 mb-3 shadow-md">
                    <View className="flex-row items-center">
                        <Image className="h-20 w-20 rounded-lg" source={require('../assets/images/pizzaOrientale.jpg')} />
                        <View className="ml-5">
                            <Text className="font-bold text-gray-700 mb-2 text-lg">Pizza del papa</Text>
                            <Text className="text-gray-500">2 articles - $20</Text>
                            <Text className="text-gray-500">20 Mars 2024</Text>
                        </View>
                    </View>
                    <View className="  mt-12 flex-row">
                        <Icon.Check className="mr-1 mt-1" strokeWidth={2} height={20} width={20} stroke={themeColors.bgColor(1)} />
                        <Text className="font-semibold text-base" style={{ color: themeColors.bgColor(1) }}>Delivered</Text>
                    </View>
                </View><View
                    className="flex-row items-center justify-between py-3 px-4 bg-white rounded-lg mx-2 mb-3 shadow-md">
                    <View className="flex-row items-center">
                        <Image className="h-20 w-20 rounded-lg" source={require('../assets/images/pizzaMargherita.jpeg')} />
                        <View className="ml-5">
                            <Text className="font-bold text-gray-700 mb-2 text-lg">Pizza Wok</Text>
                            <Text className="text-gray-500">2 articles - $20</Text>
                            <Text className="text-gray-500">20 Mars 2024</Text>
                        </View>
                    </View>
                    <View className="  mt-12 flex-row">
                        <Icon.Check className="mr-1 mt-1" strokeWidth={2} height={20} width={20} stroke={themeColors.bgColor(1)} />
                        <Text className="font-semibold text-base" style={{ color: themeColors.bgColor(1) }}>Delivered</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}