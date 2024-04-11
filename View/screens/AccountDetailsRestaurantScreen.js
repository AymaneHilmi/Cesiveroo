import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { themeColors } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import * as Icon from "react-native-feather";
import { launchImageLibrary } from 'react-native-image-picker';
import { UserInfos, modifyUserInfos, pickImageAndSave } from "../controller/AccountDetails";
import Login from "../controller/Login";

export default function AccountDetailsRestaurantScreen() {
    const navigation = useNavigation();
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
                            routes: [{ name: 'AccountRestaurateur' }],
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
                        defaultValue="Tacos Avenue"
                        style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, width: '60%' }}
                    />
                </View>
            </View>
            <View style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
                <View className="flex-row">
                    <Icon.MapPin className="h-20 w-20 mt-2 mr-2" stroke={themeColors.bgColor(1)} />
                    <TextInput
                        placeholder="Adress"
                        defaultValue="2 rue des Tacos"
                        // onChangeText={(lastName) => setLastName(lastName)}
                        style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, width: '60%' }}
                    />
                </View>
            </View>
            <View style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
                <View className="flex-row">
                    <Icon.Mail className="h-20 w-20 mt-2 mr-2" stroke={themeColors.bgColor(1)} />
                    <TextInput
                        placeholder="Email"
                        defaultValue="TacosAvenue@gmail.com"
                        // onChangeText={(email) => setEmail(email)}
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
            //  onPress={handleSave}
            >
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }}>Save</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}