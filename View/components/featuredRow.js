import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native';
import { Style } from 'domelementtype';


export default function FeaturedRow() {
    const navigation = useNavigation();
    return (
        <View>
            <View style={{ paddingLeft: '1rem', paddingRight: '1rem', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                <View>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Hot and Spicy</Text>
                    <Text style={{
                        fontSize: '0.75rem',
                        lineHeight: '1rem',
                        color: '#6B7280'
                    }}>
                        Soft and tender fried chikens
                    </Text>
                </View>
                <TouchableOpacity>
                    <Text style={{ color: themeColors.text, fontWeight: 'bold' }}>See All</Text>
                </TouchableOpacity>
            </View >
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                style={{ overflow: 'scroll', paddingTop: '1.25rem', paddingBottom: '1.25rem' }}>

                {/* Variable a mettre dans le on press pour chaque element */}
                <TouchableOpacity onPress={() => { navigation.navigate('Restaurant', { name: 'Papa Johns' }) }} style={{ backgroundColor: 'white', width: '16rem', height: '14rem', borderRadius: 20, marginRight: 20 }}>
                    <Image source={require('../assets/images/pizza.png')} style={{ width: '100%', height: '60%', borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />
                    <View style={{ paddingTop: 10, paddingLeft: 10 }}>
                        <Text style={{ fontSize: '1rem', fontWeight: 'bold' }}>Papa Johns</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 }}>
                            <Image source={require('../assets/images/fullStar.png')} style={{ width: '1rem', height: '1rem' }} />
                            <Text style={{ marginLeft: 5, fontSize: '0.75rem', lineHeight: '1rem' }}>4.5 (4.4k Reviews) </Text> · <Text style={{ fontWeight: 600, color: '#374151' }}> Fast-Food</Text>
                        </View>
                    </View>
                    <View style={{ paddingTop: 5, paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Icon.MapPin color="gray" style={{ width: '1rem', height: '1rem' }} />
                        <Text style={{ marginLeft: 5, fontSize: '0.75rem', lineHeight: '1rem' }}> Nearby · 2 place Martin Luther King</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: 'white', width: '16rem', height: '14rem', borderRadius: 20, marginRight: 20 }}>
                    <Image source={require('../assets/images/pizza.png')} style={{ width: '100%', height: '60%', borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />
                    <View style={{ paddingTop: 10, paddingLeft: 10 }}>
                        <Text style={{ fontSize: '1rem', fontWeight: 'bold' }}>Papa Johns</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 }}>
                            <Image source={require('../assets/images/fullStar.png')} style={{ width: '1rem', height: '1rem' }} />
                            <Text style={{ marginLeft: 5, fontSize: '0.75rem', lineHeight: '1rem' }}>4.5 (4.4k Reviews) </Text> · <Text style={{ fontWeight: 600, color: '#374151' }}> Fast-Food</Text>
                        </View>
                    </View>
                    <View style={{ paddingTop: 5, paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Icon.MapPin color="gray" style={{ width: '1rem', height: '1rem' }} />
                        <Text style={{ marginLeft: 5, fontSize: '0.75rem', lineHeight: '1rem' }}> Nearby · 2 place Martin Luther King</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: 'white', width: '16rem', height: '14rem', borderRadius: 20, marginRight: 20 }}>
                    <Image source={require('../assets/images/pizza.png')} style={{ width: '100%', height: '60%', borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />
                    <View style={{ paddingTop: 10, paddingLeft: 10 }}>
                        <Text style={{ fontSize: '1rem', fontWeight: 'bold' }}>Papa Johns</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 }}>
                            <Image source={require('../assets/images/fullStar.png')} style={{ width: '1rem', height: '1rem' }} />
                            <Text style={{ marginLeft: 5, fontSize: '0.75rem', lineHeight: '1rem' }}>4.5 (4.4k Reviews) </Text> · <Text style={{ fontWeight: 600, color: '#374151' }}> Fast-Food</Text>
                        </View>
                    </View>
                    <View style={{ paddingTop: 5, paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Icon.MapPin color="gray" style={{ width: '1rem', height: '1rem' }} />
                        <Text style={{ marginLeft: 5, fontSize: '0.75rem', lineHeight: '1rem' }}> Nearby · 2 place Martin Luther King</Text>
                    </View>
                </TouchableOpacity>

            </ScrollView>
            <View style={{ paddingLeft: '1rem', paddingRight: '1rem', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                <View>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Hot and Spicy</Text>
                    <Text style={{
                        fontSize: '0.75rem',
                        lineHeight: '1rem',
                        color: '#6B7280'
                    }}>
                        Soft and tender fried chikens
                    </Text>
                </View>
                <TouchableOpacity>
                    <Text style={{ color: themeColors.text, fontWeight: 'bold' }}>See All</Text>
                </TouchableOpacity>
            </View >

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                style={{ overflow: 'scroll', paddingTop: '1.25rem', paddingBottom: '1.25rem' }}>

                <TouchableOpacity style={{ backgroundColor: 'white', width: '16rem', height: '14rem', borderRadius: 20, marginRight: 20 }}>
                    <Image source={require('../assets/images/pizza.png')} style={{ width: '100%', height: '60%', borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />
                    <View style={{ paddingTop: 10, paddingLeft: 10 }}>
                        <Text style={{ fontSize: '1rem', fontWeight: 'bold' }}>Papa Johns</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 }}>
                            <Image source={require('../assets/images/fullStar.png')} style={{ width: '1rem', height: '1rem' }} />
                            <Text style={{ marginLeft: 5, fontSize: '0.75rem', lineHeight: '1rem' }}>4.5 (4.4k Reviews) </Text> · <Text style={{ fontWeight: 600, color: '#374151' }}> Fast-Food</Text>
                        </View>
                    </View>
                    <View style={{ paddingTop: 5, paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Icon.MapPin color="gray" style={{ width: '1rem', height: '1rem' }} />
                        <Text style={{ marginLeft: 5, fontSize: '0.75rem', lineHeight: '1rem' }}> Nearby · 2 place Martin Luther King</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: 'white', width: '16rem', height: '14rem', borderRadius: 20, marginRight: 20 }}>
                    <Image source={require('../assets/images/pizza.png')} style={{ width: '100%', height: '60%', borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />
                    <View style={{ paddingTop: 10, paddingLeft: 10 }}>
                        <Text style={{ fontSize: '1rem', fontWeight: 'bold' }}>Papa Johns</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 }}>
                            <Image source={require('../assets/images/fullStar.png')} style={{ width: '1rem', height: '1rem' }} />
                            <Text style={{ marginLeft: 5, fontSize: '0.75rem', lineHeight: '1rem' }}>4.5 (4.4k Reviews) </Text> · <Text style={{ fontWeight: 600, color: '#374151' }}> Fast-Food</Text>
                        </View>
                    </View>
                    <View style={{ paddingTop: 5, paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Icon.MapPin color="gray" style={{ width: '1rem', height: '1rem' }} />
                        <Text style={{ marginLeft: 5, fontSize: '0.75rem', lineHeight: '1rem' }}> Nearby · 2 place Martin Luther King</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: 'white', width: '16rem', height: '14rem', borderRadius: 20, marginRight: 20 }}>
                    <Image source={require('../assets/images/pizza.png')} style={{ width: '100%', height: '60%', borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />
                    <View style={{ paddingTop: 10, paddingLeft: 10 }}>
                        <Text style={{ fontSize: '1rem', fontWeight: 'bold' }}>Papa Johns</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 }}>
                            <Image source={require('../assets/images/fullStar.png')} style={{ width: '1rem', height: '1rem' }} />
                            <Text style={{ marginLeft: 5, fontSize: '0.75rem', lineHeight: '1rem' }}>4.5 (4.4k Reviews) </Text> · <Text style={{ fontWeight: 600, color: '#374151' }}> Fast-Food</Text>
                        </View>
                    </View>
                    <View style={{ paddingTop: 5, paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Icon.MapPin color="gray" style={{ width: '1rem', height: '1rem' }} />
                        <Text style={{ marginLeft: 5, fontSize: '0.75rem', lineHeight: '1rem' }}> Nearby · 2 place Martin Luther King</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>

        </View>



    )
}