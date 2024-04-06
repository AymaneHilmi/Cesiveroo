import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { categories } from '../constants';
import { Bold } from 'react-native-feather';

export default function Categories() {
    return (
        <View style={{ marginTop: 10 }}>
            <ScrollView horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ overflow: 'hidden' }}
                contentContainerStyle={{ paddingHorizontal: 15 }}>

                <View style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>
                    <View style={{ paddingRight: 25 }}>
                        <TouchableOpacity style={{ padding: 5, borderRadius: 999, backgroundColor: '#E5E7EB' }}>
                            <Image source={require('../assets/images/pizzaIcon.png')} style={{ width: 50, height: 50 }} />
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center', paddingTop: 5, fontSize: 16, fontWeight: 'bold' }}>Pizza</Text>
                    </View>
                    <View style={{ paddingRight: 25 }}>
                        <TouchableOpacity style={{ padding: 5, borderRadius: 999, backgroundColor: '#E5E7EB' }}>
                            <Image source={require('../assets/images/sushi.png')} style={{ width: 50, height: 50 }} />
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center', paddingTop: 5, fontSize: 16, fontWeight: 'bold' }}>Sushi</Text>
                    </View>
                    <View style={{ paddingRight: 25 }}>
                        <TouchableOpacity style={{ padding: 5, borderRadius: 999, backgroundColor: '#E5E7EB' }}>
                            <Image source={require('../assets/images/hamburger.png')} style={{ width: 50, height: 50 }} />
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center', paddingTop: 5, fontSize: 16, fontWeight: 'bold' }}>Burger</Text>
                    </View>
                    <View style={{ paddingRight: 25 }}>
                        <TouchableOpacity style={{ padding: 5, borderRadius: 999, backgroundColor: '#E5E7EB' }}>
                            <Image source={require('../assets/images/fish.png')} style={{ width: 50, height: 50 }} />
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center', paddingTop: 5, fontSize: 16, fontWeight: 'bold' }}>Fish</Text>
                    </View>
                    <View style={{ paddingRight: 25 }}>
                        <TouchableOpacity style={{ padding: 5, borderRadius: 999, backgroundColor: '#E5E7EB' }}>
                            <Image source={require('../assets/images/spaghetti.png')} style={{ width: 50, height: 50 }} />
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center', paddingTop: 5, fontSize: 16, fontWeight: 'bold' }}>Pasta</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}