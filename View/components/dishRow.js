import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { themeColors } from '../theme';
import * as Icon from "react-native-feather";

export default function DishRow() {
    return (
        <View style={{ height: 500 }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ overflow: 'scroll', height: '100%', }}
            >
                <View style={{
                    padding: '0.75rem', marginLeft: '0.5rem', marginRight: '0.5rem', marginBottom: '0.75rem',
                    flexDirection: 'row', alignItems: 'center', borderRadius: '1.5rem', backgroundColor: '#ffffff',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                }}>
                    <Image style={{ height: 100, width: 100, borderRadius: '1.5rem' }}
                        source={require('../assets/images/pizzaDish.png')} />
                    <View style={{ display: 'flex', marginTop: '0.75rem', marginTop: '0.875rem', flex: '1 1 0%', }}>
                        <View className="pl-3">
                            <Text className="text-xl">Garlic Pizza</Text>
                            <Text className="text-gray-700">Cheezy garlic pizza</Text>
                        </View>
                        <View style={{
                            paddingLeft: '0.75rem', flexDirection: 'row',
                            justifyContent: 'space-between', alignItems: 'center',
                        }}>
                            <Text style={{ fontSize: '1.125rem', lineHeight: '1.75rem', fontWeight: '700', color: '#374151', }}>
                                $22.99
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <TouchableOpacity
                                    style={{ padding: '0.25rem', borderRadius: 9999, backgroundColor: themeColors.bgColor(1) }}>
                                    <Icon.Minus strokeWidth={2} height={20} width={20} stroke="white" />
                                </TouchableOpacity>
                                <Text className="px-3">
                                    0
                                </Text>

                                <TouchableOpacity
                                    style={{ padding: '0.25rem', borderRadius: 9999, backgroundColor: themeColors.bgColor(1) }}>
                                    <Icon.Plus strokeWidth={2} height={20} width={20} stroke="white" />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View >
                <View style={{
                    padding: '0.75rem', marginLeft: '0.5rem', marginRight: '0.5rem', marginBottom: '0.75rem',
                    flexDirection: 'row', alignItems: 'center', borderRadius: '1.5rem', backgroundColor: '#ffffff',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                }}>
                    <Image style={{ height: 100, width: 100, borderRadius: '1.5rem' }}
                        source={require('../assets/images/pizzaMargherita.jpeg')} />
                    <View style={{ display: 'flex', marginTop: '0.75rem', marginTop: '0.875rem', flex: '1 1 0%', }}>
                        <View className="pl-3">
                            <Text className="text-xl">Pizza Margherita</Text>
                            <Text className="text-gray-700">Cheezy Margherita pizza</Text>
                        </View>
                        <View style={{
                            paddingLeft: '0.75rem', flexDirection: 'row',
                            justifyContent: 'space-between', alignItems: 'center',
                        }}>
                            <Text style={{ fontSize: '1.125rem', lineHeight: '1.75rem', fontWeight: '700', color: '#374151', }}>
                                $22.99
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <TouchableOpacity
                                    style={{ padding: '0.25rem', borderRadius: 9999, backgroundColor: themeColors.bgColor(1) }}>
                                    <Icon.Minus strokeWidth={2} height={20} width={20} stroke="white" />
                                </TouchableOpacity>
                                <Text className="px-3">
                                    0
                                </Text>

                                <TouchableOpacity
                                    style={{ padding: '0.25rem', borderRadius: 9999, backgroundColor: themeColors.bgColor(1) }}>
                                    <Icon.Plus strokeWidth={2} height={20} width={20} stroke="white" />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View >
                <View style={{
                    padding: '0.75rem', marginLeft: '0.5rem', marginRight: '0.5rem', marginBottom: '0.75rem',
                    flexDirection: 'row', alignItems: 'center', borderRadius: '1.5rem', backgroundColor: '#ffffff',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                }}>
                    <Image style={{ height: 100, width: 100, borderRadius: '1.5rem' }}
                        source={require('../assets/images/pizzaKebab.png')} />
                    <View style={{ display: 'flex', marginTop: '0.75rem', marginTop: '0.875rem', flex: '1 1 0%', }}>
                        <View className="pl-3">
                            <Text className="text-xl">Pizza Kebab</Text>
                            <Text className="text-gray-700">Cheezy Kebab pizza</Text>
                        </View>
                        <View style={{
                            paddingLeft: '0.75rem', flexDirection: 'row',
                            justifyContent: 'space-between', alignItems: 'center',
                        }}>
                            <Text style={{ fontSize: '1.125rem', lineHeight: '1.75rem', fontWeight: '700', color: '#374151', }}>
                                $22.99
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <TouchableOpacity
                                    style={{ padding: '0.25rem', borderRadius: 9999, backgroundColor: themeColors.bgColor(1) }}>
                                    <Icon.Minus strokeWidth={2} height={20} width={20} stroke="white" />
                                </TouchableOpacity>
                                <Text className="px-3">
                                    0
                                </Text>

                                <TouchableOpacity
                                    style={{ padding: '0.25rem', borderRadius: 9999, backgroundColor: themeColors.bgColor(1) }}>
                                    <Icon.Plus strokeWidth={2} height={20} width={20} stroke="white" />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View >
                <View style={{
                    padding: '0.75rem', marginLeft: '0.5rem', marginRight: '0.5rem', marginBottom: '0.75rem',
                    flexDirection: 'row', alignItems: 'center', borderRadius: '1.5rem', backgroundColor: '#ffffff',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                }}>
                    <Image style={{ height: 100, width: 100, borderRadius: '1.5rem' }}
                        source={require('../assets/images/pizzaOrientale.jpg')} />
                    <View style={{ display: 'flex', marginTop: '0.75rem', marginTop: '0.875rem', flex: '1 1 0%', }}>
                        <View className="pl-3">
                            <Text className="text-xl">Pizza Orientale</Text>
                            <Text className="text-gray-700">Cheezy Orientale pizza</Text>
                        </View>
                        <View style={{
                            paddingLeft: '0.75rem', flexDirection: 'row',
                            justifyContent: 'space-between', alignItems: 'center',
                        }}>
                            <Text style={{ fontSize: '1.125rem', lineHeight: '1.75rem', fontWeight: '700', color: '#374151', }}>
                                $22.99
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <TouchableOpacity
                                    style={{ padding: '0.25rem', borderRadius: 9999, backgroundColor: themeColors.bgColor(1) }}>
                                    <Icon.Minus strokeWidth={2} height={20} width={20} stroke="white" />
                                </TouchableOpacity>
                                <Text className="px-3">
                                    0
                                </Text>

                                <TouchableOpacity
                                    style={{ padding: '0.25rem', borderRadius: 9999, backgroundColor: themeColors.bgColor(1) }}>
                                    <Icon.Plus strokeWidth={2} height={20} width={20} stroke="white" />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View >
                <View style={{
                    padding: '0.75rem', marginLeft: '0.5rem', marginRight: '0.5rem', marginBottom: '0.75rem',
                    flexDirection: 'row', alignItems: 'center', borderRadius: '1.5rem', backgroundColor: '#ffffff',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                }}>
                    <Image style={{ height: 100, width: 100, borderRadius: '1.5rem' }}
                        source={require('../assets/images/pizzaDish.png')} />
                    <View style={{ display: 'flex', marginTop: '0.75rem', marginTop: '0.875rem', flex: '1 1 0%', }}>
                        <View className="pl-3">
                            <Text className="text-xl">Pizza</Text>
                            <Text className="text-gray-700">Cheezy garlic pizza</Text>
                        </View>
                        <View style={{
                            paddingLeft: '0.75rem', flexDirection: 'row',
                            justifyContent: 'space-between', alignItems: 'center',
                        }}>
                            <Text style={{ fontSize: '1.125rem', lineHeight: '1.75rem', fontWeight: '700', color: '#374151', }}>
                                $22.99
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <TouchableOpacity
                                    style={{ padding: '0.25rem', borderRadius: 9999, backgroundColor: themeColors.bgColor(1) }}>
                                    <Icon.Minus strokeWidth={2} height={20} width={20} stroke="white" />
                                </TouchableOpacity>
                                <Text className="px-3">
                                    0
                                </Text>

                                <TouchableOpacity
                                    style={{ padding: '0.25rem', borderRadius: 9999, backgroundColor: themeColors.bgColor(1) }}>
                                    <Icon.Plus strokeWidth={2} height={20} width={20} stroke="white" />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View >
            </ScrollView>
        </View>

    )
}