import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import Categories from '../components/categories';
import featuredRow from '../components/featuredRow';
import { featured } from '../constants';
import FeaturedRow from '../components/featuredRow';
import { useNavigation } from '@react-navigation/native';


export default function HomeScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
            <StatusBar barStyle="dark-content" />
            {/* Barre de recherche (À implémenter la fonctionnalité si on a le temps) */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 8, marginTop: 20 }}>
                <View style={{ flexDirection: 'row', flex: '1 1 0%', alignItems: 'center', padding: 12, borderRadius: 999, borderWidth: 2, borderColor: 'rgb(209 213 219)' }}>
                    <Icon.Search height={25} width={25} stroke="gray" />
                    <TextInput placeholder="Restaurants" style={{ marginLeft: 8, flex: '1 1 0%', color: "#D3D3D3" }} />
                    <View style={{ paddingLeft: "0.5rem", marginLeft: '0.25rem', flexDirection: "row", alignItems: "center", borderWidth: 0, borderLeftWidth: 2, borderColor: 'rgb(209 213 219)' }}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Maps') }} style={{ flexDirection: "row" }}>
                            <Icon.MapPin height={20} width={20} stroke="gray" />
                            <Text style={{ color: 'rgb(82 82 91)' }}> New York, NYC</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginLeft: 6, padding: 12, borderRadius: 999, backgroundColor: themeColors.bgColor(1) }}>
                    <Icon.Sliders height={25} width={25} strokeWidth={2.5} stroke="white" />
                </View>
            </View>

            {/* main */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>

                {/* categories */}
                <Categories />
                <View style={{ marginTop: 20, marginLeft: 20 }}>
                    <Text style={{ fontSize: 20 }}>Good Morning,</Text>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: themeColors.primary }}>Clement FORNES</Text>
                </View>
                {/* featured */}
                <View style={{ marginTop: 20 }}>
                    {
                        <FeaturedRow />
                    }
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}