import { View, Text, ScrollView, Image, TouchableOpacity, StatusBar } from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import DishRow from '../components/dishRow';
import CartIcon from '../components/cartIcon';
import { useRoute } from '@react-navigation/native';
import {getAllRestaurantInfos} from "../controller/Home";

export default function RestaurantScreen() {
    const route = useRoute(); // hook useRoute pour accéder à l'objet route
    const { restaurantInfos } = route.params;

    return (
        <>
            <CartIcon />
            <StatusBar style="light" />
            <View>
                <ScrollView>
                    <View style={{ position: 'relative' }}>
                        <Image source={require('../assets/images/pizza.png')} style={{ width: '100%', height: 300 }} />
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{
                                position: 'absolute', left: 16, top: 56, padding: 8,
                                borderRadius: 9999, backgroundColor: '#F9FAFB',
                                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
                            }}>
                            <Icon.ArrowLeft height={20} width={20} strokeWidth={3} stroke={themeColors.bgColor(1)} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingTop: 24,
                        marginTop: -48, backgroundColor: '#ffffff'
                    }}>
                        <View style={{ paddingLeft: 20, paddingRight: 20, }}>
                            <Text style={{ fontSize: 30, lineHeight: 36, fontWeight: 700, }}>{restaurantInfos.name}</Text>
                            {/* copy this code from restaurant card */}
                            <View style={{
                                marginTop: 4, marginBottom: 4,
                                flexDirection: 'row',
                            }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Image source={require('../assets/images/fullStar.png')}
                                           style={{ width: 20, height: 20 }} />
                                    <Text style={{ fontSize: 12, lineHeight: 16, marginLeft: 5 }}>
                                        <Text style={{ color: '#fbd553', fontWeight: 'bold' }}>4</Text>
                                        <Text className="text-gray-700"> (4.6k review)</Text> · <Text style={{ color: '#047857', }} className="font-semibold">{restaurantInfos.category}</Text>
                                    </Text>
                                </View>
                                <View style={{ marginLeft: 4, flexDirection: 'row', alignItems: 'center', }}>
                                    <Icon.MapPin color="gray" style={{ marginLeft: 5, width: 1000 }} />
                                    <Text style={{ marginLeft: 5, fontSize: 14, lineHeight: 16 }}>{restaurantInfos.city}</Text>
                                </View>
                            </View>
                            {/*<Text style={{ marginTop: 8, color: '#6B7280' }}>Hot and Spicy pizzas</Text>*/}
                        </View>
                    </View>
                    <View style={{
                        paddingBottom: 144,
                        backgroundColor: '#ffffff',
                    }}>
                        <Text style={{
                            paddingTop: 16,
                            paddingBottom: 16,
                            paddingLeft: 16,
                            paddingRight: 16,
                            fontSize: 24,
                            lineHeight: 32,
                            fontWeight: '700',
                        }}>Menu</Text>
                        {/* dishes */}
                        <DishRow />

                    </View>
                </ScrollView >
            </View >
        </>
    );
}