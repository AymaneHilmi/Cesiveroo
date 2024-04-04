import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { categories } from '../constants';

export default function Categories() {
    return (
        <View style={{ marginTop: 10 }}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={true}
                style={{ overflow: 'visible' }}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {categories.map((category, index) => (
                    <View
                        key={index}
                        style={{
                            display: 'flex',
                            marginRight: '1.5rem',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                padding: 5,
                                borderRadius: 9999,
                                backgroundColor: '#E5E7EB',
                                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
                            }}>
                            <Text>{category.name}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}