import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP } from '../config';

const Login = async (email, password, navigation, selectedValue) => {
  try {
    // Envoyer une requête POST au backend avec les informations de connexion
    console.log('Logging in...');
    // Connexion à l'API
    console.log('selectedValue:', selectedValue)
    console.log("http://" + IP + ":3000/api/" + selectedValue + "/login")
    console.log('email:', email)
    console.log('password:', password)
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
      console.log('Token verified' + verify.data);
      const role = verify.data.role;
      if (role === 'client') {
        console.log('Navigating to Home')
        // Naviguer vers l'écran d'accueil
        navigation.navigate('Home');
      } else if (role === 'restaurant') {
        console.log('Navigating to Restaurateur')
        // Naviguer vers l'écran d'accueil
        navigation.navigate('Restaurateur');
        console.log('Navigated to Homdqz')
      } else if (role === 'commercial') {
        console.log('Navigating to ServiceCommercial')
        // Naviguer vers l'écran d'accueil
        navigation.navigate('ServiceCommercial');
      } else if (role === 'livreur') {
        console.log('Navigating to Driver')
        // Naviguer vers l'écran d'accueil
        navigation.navigate('Driver');
      }

    }
  } catch (error) {
    console.log('An error occurred:', error);
    return 'Login failed';
    // Gérer les erreurs
  }
};

export default Login;
