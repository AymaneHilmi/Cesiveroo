import { View, Text, TouchableOpacity, Image } from 'react-native'
import { themeColors } from '../theme';
import * as Icon from "react-native-feather";
import React, { useState, useEffect } from 'react'
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAllClients } from '../controller/Account';


export default function ServiceCommercialScreen() {
    // const [selectedClient, setSelectedLanguage] = useState();
    const [clients, setClients] = useState([]);  // Pour stocker tous les clients
    const [selectedClient, setSelectedClient] = useState('');  // Pour stocker l'ID du client sélectionné
    const [clientName, setClientName] = useState('');  // Pour stocker le nom du client sélectionné
    const [clientAddress, setClientAddress] = useState('');  // Pour stocker l'adresse du client sélectionné

    useEffect(() => {
        getAllClients().then(data => {
            setClients(data);  // Stocker tous les clients dans l'état
            if (data.length > 0) {
                setSelectedClient(data[0].id);  // Définir l'ID du premier client comme sélectionné par défaut
                setClientName(data[0].name);  // Définir le nom du premier client
                setClientAddress(data[0].address);  // Définir l'adresse du premier client
            }
        }).catch(error => {
            console.error('Failed to fetch clients:', error);
        });
    }, []);

    // Fonction pour mettre à jour le client sélectionné
    const onClientChange = (clientId) => {
        const client = clients.find(c => c.id === clientId);
        setSelectedClient(clientId);
        setClientName(client ? client.name : '');
        setClientAddress(client ? client.address : '');
    };
    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 8, marginTop: 20 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AccountRestaurateur')}
                    style={{
                        backgroundColor: themeColors.bgColor(1),
                        zIndex: 10, padding: 10, borderRadius: 9999,
                        shadowColor: 'black',
                        shadowOffset: {
                            width: 0, // Décalage horizontal de l'ombre; positif à droite
                            height: 2, // Décalage vertical de l'ombre; positif en bas
                        },
                        shadowOpacity: 0.3, // Opacité de l'ombre; 1 est complètement opaque
                        shadowRadius: 3.84, // Flou de l'ombre,
                    }}>
                    <Icon.Menu strokeWidth={3} stroke="white" />
                </TouchableOpacity>
                <View className="justify-center">
                    <Text style={{ fontSize: 20 }}>Good Morning,</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: themeColors.primary }}>Service Commercial</Text>
                </View>
                <TouchableOpacity
                    style={{ marginLeft: 6, padding: 10, borderRadius: 999 }}>
                    <Image source={require('../assets/images/serviceCommercial.png')} style={{ width: 50, height: 50, borderRadius: 999 }} />
                </TouchableOpacity>
            </View>
            <Text>Select the Client to delete :</Text>
            <View style={{ width: '100%', paddingHorizontal: 80 }} >
                <Picker
                    selectedValue={selectedClient}
                    onValueChange={onClientChange}
                    style={{ height: 50, width: '100%' }}>
                    {clients.map((client, index) => (
                        <Picker.Item key={index} label={client.name} value={client.id} />
                    ))}
                </Picker>
            </View>
            <View className="flex-row p-5">
                <Text className="ml-10 mt-2">Selected Client :</Text>
                <Text className="ml-10 text-center font-bold text-xl" style={{ color: themeColors.bgColor(1) }}> {selectedClient}</Text>
            </View>
            <View className="mx-12">
                <TouchableOpacity className="p-5" style={{ backgroundColor: "red", borderRadius: 10 }}>
                    <Text className="text-center text-white font-bold text-lg">Delete</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}