import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import Categories from '../components/categories';
import FeaturedRow from '../components/featuredRow';
import { useNavigation } from '@react-navigation/native';
import Home from "../controller/Home";
import {modifyUserInfos} from "../controller/AccountDetails";

export default function HomeScreen() {
    const navigation = useNavigation();

    const [client, setClient] = useState('');
    const [address, setAddress] = useState('');
    const [imgAccount, setImgAccount] = useState(require('../assets/images/compte.png'));
    useEffect(() => {
        Home().then((data) => {
            setClient(data.client);
            setAddress(data.address);
            setImgAccount({ uri: data.url });
        });
    }, [
        client,
        address
    ]);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
            <StatusBar barStyle="dark-content" />
            {/* Barre de recherche (À implémenter la fonctionnalité si on a le temps) */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 8, marginTop: 20 }}>
                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', padding: 12, borderRadius: 999, borderWidth: 2, borderColor: 'rgb(209 213 219)' }}>
                    <Icon.Search height={25} width={25} stroke="gray" />
                    <TextInput placeholder="Restaurants" style={{ marginLeft: 8, flex: 1, color: "#D3D3D3" }} />
                    <View style={{ paddingLeft: 8, marginLeft: 4, flexDirection: "row", alignItems: "center", borderWidth: 0, borderLeftWidth: 2, borderColor: 'rgb(209 213 219)' }}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Maps') }} style={{ flexDirection: "row" }}>
                            <Icon.MapPin height={20} width={20} stroke="gray" />
                            <Text style={{ color: 'rgb(82 82 91)' }}>{address}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('Account') }}
                    style={{ marginLeft: 6, padding: 10, borderRadius: 999 }}>
                    <Image source={imgAccount} style={{ width: 50, height: 50, borderRadius: 999 }} />
                </TouchableOpacity>
            </View>

            {/* main */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>

                {/* categories */}
                <Categories />
                <View style={{ marginTop: 20, marginLeft: 20 }}>
                    <Text style={{ fontSize: 20 }}>Good Morning,</Text>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: themeColors.primary }}>{client}</Text>
                </View>
                {/* featured */}
                <View style={{ marginTop: 10 }}>
                    {
                        <FeaturedRow />
                    }
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}