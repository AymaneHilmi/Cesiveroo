import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import * as FileSystem from 'expo-file-system';
import { IP } from '../config';

export const Command = async (RestaurantID, price) => {
    const token = await AsyncStorage.getItem('token'); // Récupérer le token de l'utilisateur
    console.log("trying to fetch clients");
    try {
        console.log("fetch clients");

        // Verifier le token
        const token = await AsyncStorage.getItem('token');
        const verify = await axios.post(
            "http://" + IP + ":3000/api/clients/verify",
            // Body de la requête (s'il y en a un)
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        const client = verify.data;

        const response = await axios.post(`http://` + IP + `:3000/api/commandes`,
            {
                ClientID : client.ClientID,
                RestaurantID : RestaurantID,
                adressDelivery : client.streetNumber + " " + client.streetName + " " + client.city + " " + client.postalCode,
                price : price
            },{
                headers: {
                    Authorization: `Bearer ${token}`  // Utilisation du token pour l'authentification
                }
            }
        );
        console.log("finished fetching clients");

        if (response.data) {
            return response.data; // Retourner la liste des clients
        } else {
            throw new Error("No data received");
        }
    } catch (error) {
        console.error('Error fetching clients:', error);
        throw error; // Propager l'erreur pour gestion ultérieure
    }
};

export default Command;