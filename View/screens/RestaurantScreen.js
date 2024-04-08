import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';

export default function RestaurantScreen() {
    const route = useRoute(); // hook useRoute pour accéder à l'objet route
    const { name } = route.params;
    const navigation = useNavigation();
    console.log('Restaurant :', name);

    return (
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
                        {/* /////////////////////////////////////////////////////////////////////////////////s */}
                        <Text className="text-3xl font-bold">{title}</Text>
                        {/* copy this code from restaurant card */}
                        <View className="flex-row space-x-2 my-1">
                            <View className="flex-row items-center space-x-1">
                                <Image
                                    source={require('../assets/images/fullStar.png')}
                                    className="h-4 w-4" />
                                <Text className="text-xs">
                                    <Text className="text-green-700">{rating}</Text>
                                    <Text className="text-gray-700"> (4.6k review)</Text> · <Text className="font-semibold text-gray-700">{type}</Text>
                                </Text>
                            </View>
                            <View className="flex-row items-center space-x-1">
                                <Icon.MapPin color="gray" width={15} height={15} />
                                <Text className="text-gray-800 text-xs"> Nearby · {address}</Text>
                            </View>
                        </View>
                        <Text className="text-gray-500 mt-2">{description}</Text>
                    </View>

                </View>
            </ScrollView >
        </View >
    );
}
