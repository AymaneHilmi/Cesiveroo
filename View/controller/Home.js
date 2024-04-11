import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP } from '../config';
// import * as ImagePicker from "expo-image-picker";
// import * as FileSystem from "expo-file-system";

const Home = async () => {
    try {
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
        const client = verify.data.name;
        const address = verify.data.city;
        const url = verify.data.imgPath;
        return { client, address, url };
        // Récupérer le nom du client
    } catch (error) {
        console.log('An error occurred:', error);
        // Gérer les erreurs
    }
}

async function getAllRestaurantInfos() {
    console.log('Getting all restaurants...')
    const token = await AsyncStorage.getItem('token');
    const verify = await axios.get("http://" + IP + ":3000/api/restaurants/infos/",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    // Group the data by category without taking data with category ""
    const groupedData = verify.data.reduce((acc, item) => {
        if (item.category !== "" && item.category !== null && item.category !== undefined) {
            if (!acc[item.category]) {
                acc[item.category] = [];
            }
            acc[item.category].push(item);
        }
        return acc;
    }, {});

    // const categories = Object.keys(groupedData);
    return groupedData;
}

export { Home, getAllRestaurantInfos };