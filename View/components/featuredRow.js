import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { themeColors } from '../theme'
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native';
import { getAllRestaurantInfos } from "../controller/Home";
import { Style } from 'domelementtype';

export default function FeaturedRow() {
    const navigation = useNavigation();
    const [restaurantInfos, setRestaurantInfos] = useState({});
    const [restaurantCategories, setRestaurantCategories] = useState([]);

    useEffect(() => {
        getAllRestaurantInfos().then((data) => {
            setRestaurantInfos(data);
            const categoriesWithRestaurants = Object.keys(data).filter(category => data[category].length > 0);
            setRestaurantCategories(categoriesWithRestaurants);
            console.log(data);
        });
    }, []);

    return (
        <View>
            {restaurantCategories.map((category, index) => (
                <View key={index}>
                    <View style={{ paddingLeft: 16, paddingRight: 16, flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                        <View>
                            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{category}</Text>
                            <Text style={{ fontSize: 12, lineHeight: 16, color: '#6B7280' }}>
                                {/* Ajoutez un texte ou une description de la catégorie ici si nécessaire */}
                            </Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={{ color: themeColors.text, fontWeight: 'bold' }}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 15 }}
                        style={{ overflow: 'scroll', paddingTop: 10, paddingBottom: 10 }}>
                        {restaurantInfos[category]?.map((restaurant, rIndex) => ( // Utilisez l'opérateur de coalescence nulle pour éviter les erreurs si restaurantInfos[category] est null ou undefined
                            <TouchableOpacity key={rIndex} onPress={() => { navigation.navigate('Restaurant', { restaurantInfos: restaurant }) }} style={{ backgroundColor: 'white', width: 290, height: 250, borderRadius: 20, marginRight: 20 }}>
                                <Image source={require('../assets/images/pizza.png')} style={{ width: '100%', height: '60%', borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />
                                <View style={{ paddingTop: 10, paddingLeft: 10 }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{restaurant.name}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 }}>
                                        <Image source={require('../assets/images/fullStar.png')} style={{ width: 16, height: 16 }} />
                                        <Text style={{ marginLeft: 5, fontSize: 12, lineHeight: 16 }}>4.5 (4.4k Reviews) </Text>
                                        <Text style={{ fontWeight: 600, color: '#374151' }}>{category}</Text>
                                    </View>
                                </View>
                                <View style={{ paddingTop: 5, paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon.MapPin color="gray" style={{ width: 16, height: 16 }} />
                                    <Text style={{ marginLeft: 5, fontSize: 12, lineHeight: 16 }}> Nearby · {restaurant.streetNumber} rue {restaurant.streetName}, {restaurant.city}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            ))}
        </View>
    );
}