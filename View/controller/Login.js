import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = async (email, password, navigation) => {
  try {
    // Envoyer une requête POST au backend avec les informations de connexion
    console.log('Logging in...');
    console.log(email);
    console.log(password);


    // Connexion à l'API
    const response = await axios.post("http://172.20.10.2:3000/api/clients/login", {
      email: email,
      password: password
    });

    // Vérifier si la connexion a réussi
    if (response.data.token) {
      console.log('Login successful');
      // Stocker le token dans le stockage local
      await AsyncStorage.setItem('token', response.data.token);
      // Verifier le token
      const token = await AsyncStorage.getItem('token');
      const verify = await axios.post(
        "http://172.20.10.2:3000/api/clients/verify",
        // Body de la requête (s'il y en a un)
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Token verified')

      // Rediriger l'utilisateur vers la page d'accueil
      navigation.navigate('Home');
    } else {
      navigation.navigate('Home');
      console.log('Login failed');
      // Gérer l'échec de connexion
    }
  } catch (error) {
    console.log('An error occurred:', error);
    // Gérer les erreurs
  }
};

export default Login;
