import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps';
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';

export default function MapsScreen() {
    const TokyoRegion = {
        latitude: -85.5324269,
        longitude: 38.2145602,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    }
    return (
        <View style={styles.container}>
            <View style={{ position: 'relative' }}>
                {/* <Image source={require('../assets/images/pizza.png')} style={{ width: '100%', height: 300 }} /> */}
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        position: 'absolute', left: 16, top: 56, padding: 8,
                        borderRadius: 9999, backgroundColor: '#F9FAFB',
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
                    }}>
                    <Icon.ArrowLeft height={20} width={20} strokeWidth={3} stroke={themeColors.bgColor(1)} />
                </TouchableOpacity>
            </View>
            <TextInput
                placeholder="Rechercher ici..."
                style={styles.searchBox}
            />
            <MapView
                initialRegion={TokyoRegion}
                style={styles.map}
                mapType="standard"
            >
                <Marker
                    coordinate={TokyoRegion}
                />
            </MapView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBox: {
        position: 'absolute',
        marginTop: 70, // Ajuste cette valeur en fonction de la hauteur de la barre de statut/naviguation
        alignSelf: 'center',
        width: '80%',
        height: 50,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        zIndex: 1, // S'assure que le TextInput reste au-dessus de la carte
        elevation: 5, // Pour l'ombre sur Android
        shadowColor: '#000', // Pour l'ombre sur iOS
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { height: 0, width: 0 },
    },
    map: {
        flex: 1,
    },
});
