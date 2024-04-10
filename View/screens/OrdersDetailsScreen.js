import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { themeColors } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import * as Icon from "react-native-feather";
import { Dropdown } from 'react-native-element-dropdown';
import { Picker } from '@react-native-picker/picker';

export default function OrdersDetailsScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: "#E8E8E8", height: '100%' }}>
            < View style={{
                backgroundColor: '#ffffff',
                position: 'relative', paddingTop: 20, paddingBottom: 20, boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            }} >
                <View>
                    <Text className="text-center font-bold text-xl">Order #76123</Text>
                </View>
            </View >
            <ScrollView>
                <View
                    className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mt-3 mb-3 shadow-md">
                    <Text style={{ color: themeColors.text }} className="font-bold">2 x </Text>
                    <Image className="h-14 w-14 rounded-full" source={require('../assets/images/pizzaDish.png')} />
                    <Text className="flex-1 font-bold text-gray-700">Pizza della Mamma</Text>
                    <Text className="font-semibold text-base mr-2">$22,99</Text>
                </View>
                <View
                    className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md">
                    <Text style={{ color: themeColors.text }} className="font-bold">2 x </Text>
                    <Image className="h-14 w-14 rounded-full" source={require('../assets/images/pizzaDish.png')} />
                    <Text className="flex-1 font-bold text-gray-700">Pizza della Mamma</Text>
                    <Text className="font-semibold text-base mr-2">$22,99</Text>
                </View>
                <View
                    className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md">
                    <Text style={{ color: themeColors.text }} className="font-bold">2 x </Text>
                    <Image className="h-14 w-14 rounded-full" source={require('../assets/images/pizzaDish.png')} />
                    <Text className="flex-1 font-bold text-gray-700">Pizza della Mamma</Text>
                    <Text className="font-semibold text-base mr-2">$22,99</Text>
                </View>
                <View
                    className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md">
                    <Text style={{ color: themeColors.text }} className="font-bold">2 x </Text>
                    <Image className="h-14 w-14 rounded-full" source={require('../assets/images/pizzaDish.png')} />
                    <Text className="flex-1 font-bold text-gray-700">Pizza della Mamma</Text>
                    <Text className="font-semibold text-base mr-2">$22,99</Text>
                </View>


            </ScrollView>

            <View style={{ backgroundColor: themeColors.bgColor(0.2) }} className=" p-6 px-8 rounded-t-3xl space-y-4">
                <View className="flex-row justify-between">
                    <Text className="text-gray-700">Subtotal</Text>
                    <Text className="text-gray-700">$78,99</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-gray-700">Delivery Fee</Text>
                    <Text className="text-gray-700">Free</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="font-extrabold">Order Total</Text>
                    <Text className="font-extrabold">$78,99</Text>
                </View>
                <View>
                    <TouchableOpacity
                        style={{ backgroundColor: themeColors.bgColor(1) }}
                        onPress={() => navigation.navigate('PreparingOrder')}
                        className="p-3 rounded-full">
                        <Text className="text-white text-center font-bold text-lg">Accept Order</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}