import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import DishRow from '../components/dishRow';
import CartIcon from '../components/cartIcon';

export default function RestaurantScreen() {
    const route = useRoute(); // hook useRoute pour accéder à l'objet route
    const { name } = route.params;
    const navigation = useNavigation();
    console.log('Restaurant :', name);

    return (
        <>
            <CartIcon />
            <View>
                <ScrollView>
                    <View style={{ position: 'relative' }}>
                        <Image source={require('../assets/images/pizza.png')} style={{ width: '100%', height: 300 }} />
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{
                                position: 'absolute', left: '1rem', top: '3.5rem', padding: '0.5rem',
                                borderRadius: 9999, backgroundColor: '#F9FAFB',
                                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
                            }}>
                            <Icon.ArrowLeft height={20} width={20} strokeWidth={3} stroke={themeColors.bgColor(1)} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingTop: '1.5rem',
                        marginTop: '-3rem', backgroundColor: '#ffffff',
                    }}>
                        <View style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem', }}>
                            <Text style={{ fontSize: '1.875rem', lineHeight: '2.25rem', fontWeight: 700, }}>Papa Johns</Text>
                            {/* copy this code from restaurant card */}
                            <View style={{
                                marginTop: '0.25rem', marginBottom: '0.25rem',
                                flexDirection: 'row',
                            }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Image source={require('../assets/images/fullStar.png')}
                                        style={{ width: '1rem', height: '1rem' }} />
                                    <Text style={{ fontSize: '0.75rem', lineHeight: '1rem' }}>
                                        <Text className="text-green-700">4</Text>
                                        <Text className="text-gray-700"> (4.6k review)</Text> · <Text style={{ color: '#047857', }} className="font-semibold">Fast-Food</Text>
                                    </Text>
                                </View>
                                <View style={{ marginLeft: '0.25rem', flexDirection: 'row', alignItems: 'center', }}>
                                    <Icon.MapPin color="gray" style={{ width: '1rem', height: '1rem' }} />
                                    <Text style={{ marginLeft: 5, fontSize: '0.75rem', lineHeight: '1rem' }}> Nearby · 2 place Martin Luther King</Text>
                                </View>
                            </View>
                            <Text style={{ marginTop: '0.5rem', color: '#6B7280' }}>Hot and Spicy pizzas</Text>
                        </View>
                    </View>
                    <View style={{
                        paddingBottom: '9rem',
                        backgroundColor: '#ffffff',
                    }}>
                        <Text style={{
                            paddingTop: '1rem',
                            paddingBottom: '1rem',
                            paddingLeft: '1rem',
                            paddingRight: '1rem',
                            fontSize: '1.5rem',
                            lineHeight: '2rem',
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
