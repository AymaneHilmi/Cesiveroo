import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const verify = await axios.post(
            "http://192.168.97.46:3000/api/clients/verify",
            // Body de la requête (s'il y en a un)
            {}, 
            {
            headers: {
                Authorization: `Bearer ${token}`
            }
            }
        );
        console.log('Verifying...')
        console.log('Token verified')
        console.log('Token:', token)
        console.log('Client:', verify.data.name)
        console.log('City:' , verify.data.city)
        const client = verify.data.name;
        const address = verify.data.city;
        const url = verify.data.imgPath;
        return {client, address, url};
        // Récupérer le nom du client
    } catch (error) {
        console.log('An error occurred:', error);
        // Gérer les erreurs
    }
}

export default Home