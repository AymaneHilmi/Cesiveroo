import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP } from '../config';

const Login = async (email, password, navigation, selectedValue) => {
  try {
    // Envoyer une requête POST au backend avec les informations de connexion
    console.log('Logging in...');
    // Connexion à l'API
    const response = await axios.post("http://" + IP + ":3000/api/" + selectedValue + "/login", {
      email: email,
      password: password
    });

    // Vérifier si la connexion a réussi
    if (response.data.token !== undefined) {
      console.log('Login successful');
      // Stocker le token dans le stockage local
      await AsyncStorage.setItem('token', response.data.token);
      // Verifier le token
      const token = await AsyncStorage.getItem('token');
      const verify = await axios.post(
        "http://" + IP + ":3000/api/" + selectedValue + "/verify",
        // Body de la requête (s'il y en a un)
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Token verified');
      const role = verify.data.role;

      if (role === 'client') {
        console.log('Navigating to Home')
        // Naviguer vers l'écran d'accueil
        navigation.navigate('Home', { clientInfos: verify.data });
      } else if (role === 'restaurant') {
        console.log('Navigating to Restaurateur')
        // Naviguer vers l'écran d'accueil et passer les informations du restaurant
        navigation.navigate('Restaurateur', { restaurantInfos: verify.data });
      } else if (role === 'commercial') {
        console.log('Navigating to ServiceCommercial', verify.data)
        // Naviguer vers l'écran d'accueil
        navigation.navigate('ServiceCommercial', { commercialInfos: verify.data });
      } else if (role === 'livreur') {
        console.log('Navigating to Driver', verify.data)
        // Naviguer vers l'écran d'accueil
        navigation.navigate('Driver', { driverInfos: verify.data });
      }

    }
  } catch (error) {
    console.log('An error occurred:', error.message);
    return 'Login failed';
    // Gérer les erreurs
  }
};

export default Login;
