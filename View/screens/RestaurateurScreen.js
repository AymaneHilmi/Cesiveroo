import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import { themeColors } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import FeaturedRow from '../components/featuredRow';
import * as Icon from "react-native-feather";
import LinearGradient from 'react-native-linear-gradient';
import { useRoute } from '@react-navigation/native';
import { Restaurateur, getRestaurantMenu, getRestaurantArticles, nbOrders } from '../controller/Restaurateur';
import { useEffect, useState } from 'react';

// Récupérer les informations du restaurant
export default function RestaurateurScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const [name, setName] = useState('');
    const [restaurantInfos, setRestaurantInfos] = useState({});
    const [nbOders, setNbOders] = useState(0);
    // Récuperer le nombre d'articles
    const [articles, setArticles] = useState([]);
    const [articlesNumber, setArticlesNumber] = useState(0);
    // Récuperer le nombre de commandes
    const [orders, setOrders] = useState([]);
    const handleArticlesNumber = async (restaurantId) => {
        try {
            const response = await getRestaurantArticles(restaurantId);
            setArticlesNumber(response.length);
        } catch (error) {
            console.error('Error getting articles:', error);
        }
    }
    useEffect(() => {
        Restaurateur().then((response) => {
            setName(response.name);

            // Récuperer le nombre d'articles
            setRestaurantInfos(response);
            handleArticlesNumber(response.restaurantId);
        });
        nbOrders().then((response) => {
            setNbOders(response);
        });
    }
        , []);

    return (
        <SafeAreaView style={{ height: "100%", backgroundColor: '#E8E8E8' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 8, marginTop: 20 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AccountRestaurateur', { restaurantInfos })}
                    style={{
                        backgroundColor: themeColors.bgColor(1),
                        zIndex: 10, padding: 10, borderRadius: 9999,
                        shadowColor: 'black',
                        shadowOffset: {
                            width: 0, // Décalage horizontal de l'ombre; positif à droite
                            height: 2, // Décalage vertical de l'ombre; positif en bas
                        },
                        shadowOpacity: 0.3, // Opacité de l'ombre; 1 est complètement opaque
                        shadowRadius: 3.84, // Flou de l'ombre,
                    }}>
                    <Icon.Menu strokeWidth={3} stroke="white" />
                </TouchableOpacity>
                <View className="justify-center">
                    <Text style={{ fontSize: 20 }}>Good Morning,</Text>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: themeColors.primary }}>{name}</Text>
                </View>
                <TouchableOpacity
                    style={{ marginLeft: 6, padding: 10, borderRadius: 999 }}>
                    <Image source={require('../assets/images/tacosAvenue.png')} style={{ width: 50, height: 50, borderRadius: 999 }} />
                </TouchableOpacity>
            </View>
            {/* main */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>


                {/* featured */}
                <View style={{ marginTop: 10 }}>
                    <View style={{ paddingLeft: 16, paddingRight: 16, flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                        <View>
                            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Some Statistics</Text>
                        </View>
                    </View >
                    {/* Variable a mettre dans le on press pour chaque element */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
                        <View style={{ justifyContent: 'space-between', backgroundColor: '#c6e2e9', width: '46%', height: 150, borderRadius: 20, marginTop: 10, marginLeft: 10, marginRight: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20 }}>Orders</Text>
                            <View style={{ flexDirection: 'row' }} >
                                <Text style={{ fontSize: 70, fontWeight: 'bold', marginLeft: 20, marginBottom: 10 }}>{nbOders || 0}</Text>
                                <Icon.ShoppingCart height={50} width={50} stroke="black" className="mt-5 ml-4" />
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between', backgroundColor: '#FFDAB9', width: '46%', height: 150, borderRadius: 20, marginTop: 10, marginLeft: 10, marginRight: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20 }}>Articles</Text>
                            <View style={{ flexDirection: 'row' }} >
                                <Text style={{ fontSize: 70, fontWeight: 'bold', marginLeft: 20, marginBottom: 10 }}>{articlesNumber}</Text>
                                <Image source={require('../assets/images/couvert.png')} style={{ width: 50, height: 50 }} className="mt-5 ml-4" />
                            </View>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#BDFCC9', width: '90%', height: 150, borderRadius: 20, marginTop: 10, marginLeft: 20, marginRight: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20 }}>Earnings</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
                            <Icon.DollarSign height={60} width={60} stroke="green" strokeWidth={4} className="mt-3" />
                            <Text style={{ fontSize: 70, fontWeight: 'bold', marginLeft: 20, marginBottom: 10 }}>12 459 </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >


    )
}