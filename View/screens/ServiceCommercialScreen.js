import { View, Text, TouchableOpacity, Image } from 'react-native'
import { themeColors } from '../theme';
import * as Icon from "react-native-feather";
import React, { useState, useEffect } from 'react'
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAllClients } from '../controller/Account';
import { useNavigation } from '@react-navigation/native';
import { deleteAccountById } from '../controller/Account';


export default function ServiceCommercialScreen() {
    const navigation = useNavigation();
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [clientName, setClientName] = useState('');

    const handleDelete = async () => {
        if (selectedClient) {
            try {
                const result = await deleteAccountById(selectedClient);
                Alert.alert("Success", "Client deleted successfully"); // Affiche un message de succès
                console.log(result); // Optionnel: afficher le résultat dans la console
            } catch (error) {
                Alert.alert("Error", "Failed to delete client: " + error.message); // Affiche un message d'erreur
            }
        } else {
            Alert.alert("Error", "No client selected"); // Gère le cas où aucun client n'est sélectionné
        }

        navigation.reset({
            index: 0,
            routes: [{ name: 'Account' }],
        });
    };

    useEffect(() => {
        getAllClients().then(data => {
            console.log("Clients Data:", data);  // Debug pour voir les données chargées
            setClients(data);
            if (data.length > 0) {
                setSelectedClient(data[0].ClientID);  // Utiliser ClientID ici
                setClientName(data[0].name);
            }
        }).catch(error => {
            console.error('Failed to fetch clients:', error);
        });
    }, []);


    // Fonction pour mettre à jour le client sélectionné
    const onClientChange = (itemValue, itemIndex) => {
        setSelectedClient(itemValue);
    };
    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 8, marginTop: 20 }}>
                <TouchableOpacity

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
            <View style={{ width: '100%', padding: 80 }}>
                <Picker
                    selectedValue={selectedClient}
                    onValueChange={onClientChange}
                    style={{ height: 50, width: '100%' }}>
                    {clients.map((client, index) => (
                        <Picker.Item key={index} label={client.name} value={client.ClientID} />
                    ))}
                </Picker>
            </View>
            <View className="flex-row p-5">
                <Text className="ml-10 mt-2">Selected Client :</Text>
                <Text className="ml-10 text-center font-bold text-xl" style={{ color: themeColors.bgColor(1) }}> {selectedClient}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={handleDelete} style={{ backgroundColor: "red", borderRadius: 10, padding: 20 }}>
                    <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: 18 }}>Delete</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}