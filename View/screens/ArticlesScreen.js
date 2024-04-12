import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import { useRoute } from '@react-navigation/native';
import { getRestaurantArticles } from '../controller/Restaurateur';

export default function ArticlesScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const restaurantInfos = route.params.restaurantInfos;
    const restaurantId = restaurantInfos.restaurantId;
    const [articles, setArticles] = useState([]);
    const fetchArticles = async () => {
        try {
            const response = await getRestaurantArticles(restaurantId);
            setArticles(response);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };
    useEffect(() => {
        fetchArticles();
    }, []);

    return (
        <SafeAreaView style={{ backgroundColor: "#E8E8E8", height: "100%" }}>
            {/* top button */}
            <View style={{ position: 'relative', paddingTop: 16, paddingBottom: 16, boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', backgroundColor: '#ffffff' }}>
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
                    <Text className="text-center font-bold text-xl">Articles</Text>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} className="mt- pt-5" contentContainerStyle={{}}>
                {articles.map((article, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => navigation.navigate('ArticlesDetails', { article, restaurantInfos })}
                        style={{ paddingHorizontal: 10, marginTop: 10, marginHorizontal: 10, backgroundColor: 'white', borderRadius: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{article.Name}</Text>
                                <Text>Ingredients: {article.Ingredients}</Text>
                                <Text>Price: ${article.Price}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 10, marginTop: 20 }}>
                <TouchableOpacity onPress={() => navigation.navigate('ArticlesAdd', { restaurantInfos })}
                    style={{
                        backgroundColor: 'red', padding: 15, width: '40%', borderRadius: 10,
                        alignSelf: 'center', alignItems: 'center',
                    }} >
                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }}>Creer un article </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
