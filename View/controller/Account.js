import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import * as FileSystem from 'expo-file-system';
import { IP } from '../config';

export const getAllClients = async () => {
    const token = await AsyncStorage.getItem('token'); // Récupérer le token de l'utilisateur
    console.log("trying to fetch clients");
    try {
        console.log("fetch clients");

        const response = await axios.get(`http://` + IP + `:3000/api/clients`, { // Requête GET pour récupérer la liste des clients
            headers: {
                Authorization: `Bearer ${token}`  // Utilisation du token pour l'authentification
            }
        });
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

const deleteMyAccount = async (navigation) => {
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
    const { ClientID } = verify.data

    const response = axios.delete(`http://` + IP + `:3000/api/clients/${ClientID}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    await AsyncStorage.removeItem('token');
    return "Succesfully deleted account"
};

export default { deleteMyAccount };