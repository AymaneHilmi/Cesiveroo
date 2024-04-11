import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function MapsScreen() {
    const navigation = useNavigation();
    const [address, setAddress] = useState('');
    const [region, setRegion] = useState({
        latitude: 43.4812549,
        longitude: 5.3864446,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [marker, setMarker] = useState(null);

    const handleAddressChange = (text) => {
        setAddress(text);
    };

    const handleSearch = async () => {
        // Utilisation de la clé API pour géocoder l'adresse
        const apiKey = "AIzaSyBXEhTjJmsMtivxb-RVEKq7Q-tigvWKVQc";
        const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

        try {
            const response = await fetch(geoUrl);
            const json = await response.json();
            if (json.status === "OK") {
                const location = json.results[0].geometry.location;
                setMarker({
                    latitude: location.lat,
                    longitude: location.lng,
                    title: address,
                });
                setRegion({
                    latitude: location.lat,
                    longitude: location.lng,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                });
            } else {
                console.error("Géocodage non réussi: " + json.status);
            }
        } catch (error) {
            console.error('Erreur lors du géocodage de l\'adresse: ', error);
        }
    };
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
                onChangeText={handleAddressChange}
                value={address}
            />
            <TouchableOpacity
                onPress={handleSearch}
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
            <MapView
                style={{ flex: 1, zIndex: -1 }}
                mapType="standard"
                region={region}
            >
                {marker && <Marker coordinate={marker} title={marker.title} />}
            </MapView>
            <KeyboardAvoidingView>
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
            </KeyboardAvoidingView>
        </View >
    );
}