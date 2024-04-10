import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { themeColors } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import * as Icon from "react-native-feather";

export default function OrdersScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ backgroundColor: "#E8E8E8", height: "100%" }}>
            {/* top button */}
            < View style={{
                position: 'relative', paddingTop: 16, paddingBottom: 16, boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                backgroundColor: '#ffffff'
            }} >
                <TouchableOpacity
                    onPress={() => navigation.navigate('AccountRestaurateur')}
                    style={{
                        backgroundColor: themeColors.bgColor(1), position: 'absolute',
                        left: 8, top: 15, zIndex: 10, padding: 4, borderRadius: 9999,
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                    }}>
                    <Icon.ArrowLeft strokeWidth={3} stroke="white" />
                </TouchableOpacity>
                <View>
                    <Text className="text-center font-bold text-xl">Orders</Text>
                </View>
            </View >
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="mt- pt-5"
                contentContainerStyle={{
                }}

            >
                <TouchableOpacity
                    onPress={() => navigation.navigate('OrdersDetails')}
                    className="flex-row items-center justify-between py-3 px-4 bg-white rounded-lg mx-2 mb-3 shadow-md">
                    <View className="flex-row items-center">
                        <View className="">
                            <Text className="font-bold text-gray-700 mb-2 text-lg">Order #76123</Text>
                            <Text className="text-gray-500">5 articles - $76</Text>
                            <Text className="text-gray-500">Accepted</Text>
                        </View>
                    </View>
                    <View className="  mt-12 flex-row">
                        <Text className="font-semibold text-base" style={{ color: themeColors.bgColor(1) }}>5min ago</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('OrdersDetails')}
                    className="flex-row items-center justify-between py-3 px-4 bg-white rounded-lg mx-2 mb-3 shadow-md">
                    <View className="flex-row items-center">
                        <View className="">
                            <Text className="font-bold text-gray-700 mb-2 text-lg">Order #76124</Text>
                            <Text className="text-gray-500">5 articles - $76</Text>
                            <Text className="text-gray-500">Accepted</Text>
                        </View>
                    </View>
                    <View className="  mt-12 flex-row">
                        <Text className="font-semibold text-base" style={{ color: themeColors.bgColor(1) }}>15min ago</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('OrdersDetails')}
                    className="flex-row items-center justify-between py-3 px-4 bg-white rounded-lg mx-2 mb-3 shadow-md">
                    <View className="flex-row items-center">
                        <View className="">
                            <Text className="font-bold text-gray-700 mb-2 text-lg">Order #76125</Text>
                            <Text className="text-gray-500">5 articles - $76</Text>
                            <Text className="text-gray-500">Accepted</Text>
                        </View>
                    </View>
                    <View className="  mt-12 flex-row">
                        <Text className="font-semibold text-base" style={{ color: themeColors.bgColor(1) }}>25min ago</Text>
                    </View>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView >
    )
}