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
            <View style={{ paddingLeft: 16, paddingRight: 16, flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                <View>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Hot and Spicy</Text>
                    <Text style={{
                        fontSize: 12,
                        lineHeight: 16,
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
                style={{ overflow: 'scroll', paddingTop: 10, paddingBottom: 10 }}>

                {/* Variable a mettre dans le on press pour chaque element */}
                <TouchableOpacity onPress={() => { navigation.navigate('Restaurant', { name: 'Papa Johns' }) }} style={{ backgroundColor: 'white', width: 290, height: 250, borderRadius: 20, marginRight: 20 }}>
                    <Image source={require('../assets/images/pizza.png')} style={{ width: '100%', height: '60%', borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />
                    <View style={{ paddingTop: 10, paddingLeft: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Papa Johns</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 }}>
                            <Image source={require('../assets/images/fullStar.png')} style={{ width: 16, height: 16 }} />
                            <Text style={{ marginLeft: 5, fontSize: 12, lineHeight: 16 }}>4.5 (4.4k Reviews) </Text>
                            <Text style={{ fontWeight: 600, color: '#374151' }}> Fast-Food</Text>
                        </View>
                    </View>
                    <View style={{ paddingTop: 5, paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Icon.MapPin color="gray" style={{ width: 16, height: 16 }} />
                        <Text style={{ marginLeft: 5, fontSize: 12, lineHeight: 16 }}> Nearby · 2 place Martin Luther King</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('Restaurant', { name: 'Papa Johns' }) }} style={{ backgroundColor: 'white', width: 290, height: 250, borderRadius: 20, marginRight: 20 }}>
                    <Image source={require('../assets/images/pizza.png')} style={{ width: '100%', height: '60%', borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />
                    <View style={{ paddingTop: 10, paddingLeft: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Papa Johns</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 }}>
                            <Image source={require('../assets/images/fullStar.png')} style={{ width: 16, height: 16 }} />
                            <Text style={{ marginLeft: 5, fontSize: 12, lineHeight: 16 }}>4.5 (4.4k Reviews) </Text>
                            <Text style={{ fontWeight: 600, color: '#374151' }}> Fast-Food</Text>
                        </View>
                    </View>
                    <View style={{ paddingTop: 5, paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Icon.MapPin color="gray" style={{ width: 16, height: 16 }} />
                        <Text style={{ marginLeft: 5, fontSize: 12, lineHeight: 16 }}> Nearby · 2 place Martin Luther King</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('Restaurant', { name: 'Papa Johns' }) }} style={{ backgroundColor: 'white', width: 290, height: 250, borderRadius: 20, marginRight: 20 }}>
                    <Image source={require('../assets/images/pizza.png')} style={{ width: '100%', height: '60%', borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />
                    <View style={{ paddingTop: 10, paddingLeft: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Papa Johns</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 }}>
                            <Image source={require('../assets/images/fullStar.png')} style={{ width: 16, height: 16 }} />
                            <Text style={{ marginLeft: 5, fontSize: 12, lineHeight: 16 }}>4.5 (4.4k Reviews) </Text>
                            <Text style={{ fontWeight: 600, color: '#374151' }}> Fast-Food</Text>
                        </View>
                    </View>
                    <View style={{ paddingTop: 5, paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Icon.MapPin color="gray" style={{ width: 16, height: 16 }} />
                        <Text style={{ marginLeft: 5, fontSize: 12, lineHeight: 16 }}> Nearby · 2 place Martin Luther King</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
            <View style={{ paddingLeft: 16, paddingRight: 16, flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                <View>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Hot and Spicy</Text>
                    <Text style={{
                        fontSize: 12,
                        lineHeight: 16,
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
                style={{ overflow: 'scroll', paddingTop: 10, paddingBottom: 10 }}>

                {/* Variable a mettre dans le on press pour chaque element */}
                <TouchableOpacity onPress={() => { navigation.navigate('Restaurant', { name: 'Papa Johns' }) }} style={{ backgroundColor: 'white', width: 290, height: 250, borderRadius: 20, marginRight: 20 }}>
                    <Image source={require('../assets/images/pizza.png')} style={{ width: '100%', height: '60%', borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />
                    <View style={{ paddingTop: 10, paddingLeft: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Papa Johns</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 }}>
                            <Image source={require('../assets/images/fullStar.png')} style={{ width: 16, height: 16 }} />
                            <Text style={{ marginLeft: 5, fontSize: 12, lineHeight: 16 }}>4.5 (4.4k Reviews) </Text>
                            <Text style={{ fontWeight: 600, color: '#374151' }}> Fast-Food</Text>
                        </View>
                    </View>
                    <View style={{ paddingTop: 5, paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Icon.MapPin color="gray" style={{ width: 16, height: 16 }} />
                        <Text style={{ marginLeft: 5, fontSize: 12, lineHeight: 16 }}> Nearby · 2 place Martin Luther King</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('Restaurant', { name: 'Papa Johns' }) }} style={{ backgroundColor: 'white', width: 290, height: 250, borderRadius: 20, marginRight: 20 }}>
                    <Image source={require('../assets/images/pizza.png')} style={{ width: '100%', height: '60%', borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />
                    <View style={{ paddingTop: 10, paddingLeft: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Papa Johns</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 }}>
                            <Image source={require('../assets/images/fullStar.png')} style={{ width: 16, height: 16 }} />
                            <Text style={{ marginLeft: 5, fontSize: 12, lineHeight: 16 }}>4.5 (4.4k Reviews) </Text>
                            <Text style={{ fontWeight: 600, color: '#374151' }}> Fast-Food</Text>
                        </View>
                    </View>
                    <View style={{ paddingTop: 5, paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Icon.MapPin color="gray" style={{ width: 16, height: 16 }} />
                        <Text style={{ marginLeft: 5, fontSize: 12, lineHeight: 16 }}> Nearby · 2 place Martin Luther King</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('Restaurant', { name: 'Papa Johns' }) }} style={{ backgroundColor: 'white', width: 290, height: 250, borderRadius: 20, marginRight: 20 }}>
                    <Image source={require('../assets/images/pizza.png')} style={{ width: '100%', height: '60%', borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />
                    <View style={{ paddingTop: 10, paddingLeft: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Papa Johns</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 }}>
                            <Image source={require('../assets/images/fullStar.png')} style={{ width: 16, height: 16 }} />
                            <Text style={{ marginLeft: 5, fontSize: 12, lineHeight: 16 }}>4.5 (4.4k Reviews) </Text>
                            <Text style={{ fontWeight: 600, color: '#374151' }}> Fast-Food</Text>
                        </View>
                    </View>
                    <View style={{ paddingTop: 5, paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Icon.MapPin color="gray" style={{ width: 16, height: 16 }} />
                        <Text style={{ marginLeft: 5, fontSize: 12, lineHeight: 16 }}> Nearby · 2 place Martin Luther King</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>



    )
}