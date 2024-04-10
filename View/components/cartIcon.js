import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';

export default function CartIcon() {
    const navigation = useNavigation();
    return (
        <View style={{
            position: 'absolute',
            bottom: 20,
            zIndex: 50,
            width: 430,
            justifyContent: 'center'
        }}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Cart')}
                style={{
                    backgroundColor: themeColors.bgColor(1), padding: 16,
                    paddingTop: 12,
                    paddingBottom: 12,
                    marginLeft: 20,
                    marginRight: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: 9999,
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                }}
            // onPress={() => navigation.navigate('Cart')}
            >
                <View style={{
                    backgroundColor: 'rgba(255,255,255,0.3)', padding: 8,
                    paddingLeft: 16, paddingRight: 16, borderRadius: 9999,
                }}>
                    <Text style={{ fontSize: 18, lineHeight: 28, fontWeight: 800, color: 'white' }}>
                        3
                    </Text>
                </View>

                <Text style={{
                    fontSize: 18, lineHeight: 28,
                    fontWeight: 800, textAlign: 'center', color: '#ffffff',
                }}>View Cart</Text>


                <Text style={{ fontSize: 18, lineHeight: 28, fontWeight: 800, color: 'white' }}>$22,99</Text>


            </TouchableOpacity>

        </View>
    )
}