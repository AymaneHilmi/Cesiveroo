import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme';
import * as Icon from "react-native-feather";
import { SafeAreaView } from 'react-native-safe-area-context';
import { red } from 'color-name';
import Logout from '../controller/Logout';

export default function AccountScreen() {
    const navigation = useNavigation();
    const handleLogout = () => {
        Logout(navigation);
    };

    const deleteAccount = () => {
        deleteAccount();
    };
    return (
        <SafeAreaView style={{ backgroundColor: "#E8E8E8", height: "100%" }}>
            {/* top button */}
            < View style={{
                position: 'relative', paddingTop: 16, paddingBottom: 16, boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                backgroundColor: '#ffffff'
            }} >
                <TouchableOpacity
                    onPress={navigation.goBack}
                    style={{
                        backgroundColor: themeColors.bgColor(1), position: 'absolute',
                        left: 8, top: 15, zIndex: 10, padding: 4, borderRadius: 9999,
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                    }}>
                    <Icon.ArrowLeft strokeWidth={3} stroke="white" />
                </TouchableOpacity>
                <View>
                    <Text className="text-center font-bold text-xl">Account</Text>
                </View>
            </View >
            <TouchableOpacity
                onPress={() => { navigation.navigate('AccountDetails') }}
                className="px-3 pt-3">
                <View
                    className="flex-row items-center space-x-3 py-2 px-4 bg-white  mx-2 shadow-md mt-5">
                    <Icon.User className="h-14 w-14" stroke={themeColors.bgColor(1)} />
                    <Text className="pl-3 flex-1 text-gray-700">Account Details</Text>
                    <View
                        className="p-1"
                    >
                        <Icon.ArrowRight strokeWidth={2} height={20} width={20} stroke={themeColors.bgColor(1)} />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { navigation.navigate('OrderHistory') }}
                className="px-3">
                <View
                    className="flex-row items-center space-x-3 py-2 px-4 bg-white  mx-2 shadow-md mt-2">
                    <Icon.Archive className="h-14 w-14" stroke={themeColors.bgColor(1)} />
                    <Text className="pl-3 flex-1 text-gray-700">Order History</Text>
                    <View
                        className="p-1"
                    >
                        <Icon.ArrowRight strokeWidth={2} height={20} width={20} stroke={themeColors.bgColor(1)} />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity className="px-3">
                <View
                    className="flex-row items-center space-x-3 py-2 px-4 bg-white  mx-2 shadow-md mt-2">
                    <Icon.Settings className="h-14 w-14" stroke={themeColors.bgColor(1)} />
                    <Text className="pl-3 flex-1 text-gray-700">Settings</Text>
                    <View
                        className="p-1"
                    >
                        <Icon.ArrowRight strokeWidth={2} height={20} width={20} stroke={themeColors.bgColor(1)} />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity className="px-3">
                <View
                    className="flex-row items-center space-x-3 py-2 px-4 bg-white  mx-2 shadow-md mt-2">
                    <Icon.Globe className="h-14 w-14" stroke={themeColors.bgColor(1)} />
                    <Text className="pl-3 flex-1 text-gray-700">Language</Text>
                    <View
                        className="p-1"
                    >
                        <Icon.ArrowRight strokeWidth={2} height={20} width={20} stroke={themeColors.bgColor(1)} />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleLogout}
                className="px-3">
                <View
                    className="flex-row items-center space-x-3 py-2 px-4 bg-white  mx-2 shadow-md mt-2">
                    <Icon.LogOut className="h-14 w-14" stroke={'red'} />
                    <Text className="pl-3 flex-1 text-gray-700">Logout</Text>
                </View>
            </TouchableOpacity>
            <Image source={require('../assets/icon.png')} style={{ width: 300, height: 300, position: 'relative', top: 120, left: 60, opacity: 0.2 }} />

            <TouchableOpacity onpress={deleteAccount} style={{ flexDirection: 'row', position: 'relative', bottom: -130, left: 110 }}>
                <Icon.Trash2 strokeWidth={2} height={20} width={20} stroke={'red'} className="p-1 mr-2" />
                <Text style={{ textAlign: 'center', marginTop: 2, textDecorationLine: 'underline' }}>I want to delete my account</Text>
            </TouchableOpacity>

        </SafeAreaView >
    )
}