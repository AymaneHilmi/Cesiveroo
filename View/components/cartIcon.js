import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { themeColors } from '../theme';

export default function CartIcon() {
    return (
        <View style={{
            position: 'absolute',
            bottom: '1.25rem',
            zIndex: 50,
            width: 430
        }}>
            <TouchableOpacity
                style={{
                    backgroundColor: themeColors.bgColor(1), padding: '1rem',
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem',
                    marginLeft: '1.25rem',
                    marginRight: '1.25rem',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignRtems: 'center',
                    borderRadius: 9999,
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                }}
                onPress={() => navigation.navigate('Cart')}
            >
                <View style={{
                    backgroundColor: 'rgba(255,255,255,0.3)', padding: '0.5rem',
                    paddingLeft: '1rem', paddingRight: '1rem', borderRadius: 9999,
                }}>
                    <Text style={{ fontSize: '1.125rem', lineHeight: '1.75rem', fontWeight: 800, color: 'white' }}>
                        3
                    </Text>
                </View>

                <Text style={{
                    flex: '1 1 0%', fontSize: '1.125rem', lineHeight: '1.75rem',
                    fontWeight: 800, textAlign: 'center', color: '#ffffff',
                }}>View Cart</Text>
                <Text style={{ fontSize: '1.125rem', textAlign: 'center', lineHeight: '1.75rem', fontWeight: 800, color: '#ffffff' }}>$22,99</Text>

            </TouchableOpacity>

        </View>
    )
}