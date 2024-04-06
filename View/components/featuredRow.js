import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'

export default function FeaturedRow(title, description, restaurants) {
    return (
        <View>
            <View>
                <View style={{ paddingleft: '1rem', paddingright: '1rem', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{title}</Text>
                        <Text style={{
                            fontsize: '0.75rem',
                            lineheight: '1rem',
                            color: '#6B7280'
                        }}>
                            Ceci est une
                        </Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={{ color: themeColors.text, fontweight: 600 }}>See All</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}