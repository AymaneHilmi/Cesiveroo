import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = async (navigation) => {
    try {

        // Supprimer le token du stockage local
        // Rediriger l'utilisateur vers la page de connexion
        console.log('Logging out...');
        await AsyncStorage.removeItem('token');

        navigation.navigate('Login');
        console.log('Logout successful');
    } catch (error) {
        console.log('An error occurred:', error);
        // Gérer les erreurs
    }
}

export default Logout;