import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps';
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';

export default function MapsScreen() {
    //const TokyoRegion = {
    //   latitude: -85.5324269,
    // longitude: 38.2145602,
    // latitudeDelta: 0.01,
    // longitudeDelta: 0.01,
    // }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ position: 'relative' }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                        });
                    }}
                    style={{
                        position: 'absolute', left: 22, top: 72, padding: 8,
                        borderRadius: 9999, backgroundColor: '#F9FAFB',
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
                    }}>
                    <Icon.ArrowLeft height={30} width={30} strokeWidth={3} stroke={themeColors.bgColor(1)} />
                </TouchableOpacity>
            </View>
            <TextInput
                placeholder="Rechercher ici..."
                style={{
                    position: 'absolute',
                    marginTop: 70, // Ajuste cette valeur en fonction de la hauteur de la barre de statut/naviguation
                    marginLeft: 80,
                    width: '58%',
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
                }}
            />
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    right: 30,
                    marginTop: 70, // Ajuste cette valeur en fonction de la hauteur de la barre de statut/naviguation
                    marginLeft: 30,
                    width: '15%',
                    height: 50,
                    backgroundColor: '#20cfbd',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 8,
                    zIndex: 1, // S'assure que le TextInput reste au-dessus de la carte
                    elevation: 5, // Pour l'ombre sur Android
                    shadowColor: '#000', // Pour l'ombre sur iOS
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    shadowOffset: { height: 0, width: 0 },
                    alignItems: 'center',
                }}
            >
                <Icon.Search color={"white"} />
            </TouchableOpacity>
            <MapView style={{ zIndex: -1, width: '100%', height: '100%' }} mapType="standard"
                onMarker={true}
            >

            </MapView>

            <TouchableOpacity
                style={{
                    position: 'absolute',
                    bottom: 80,
                    left: "25%",
                    width: '50%',
                    height: 60,
                    backgroundColor: '#20cfbd',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 8,
                    zIndex: 1, // S'assure que le TextInput reste au-dessus de la carte
                    elevation: 5, // Pour l'ombre sur Android
                    shadowColor: '#000', // Pour l'ombre sur iOS
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    shadowOffset: { height: 0, width: 0 },
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text className="font-bold text-xl text-white">Save</Text>
            </TouchableOpacity>
        </View >
    );
}