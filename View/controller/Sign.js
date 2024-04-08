
import axios from 'axios';

// inscrire un utilisateur
const Register = async (name, email, phone, streetNumber, streetName, city, postalCode, password) => {
    try {
        // Envoyer une requête POST au backend avec les informations de connexion
        console.log('Registering...');
        console.log(email);
        console.log(password);


        // Connexion à l'API
        const response = await axios.post("http://localhost:3000/api/clients/register", {
            name: name,
            email: email,
            phone: phone,
            streetNumber: streetNumber,
            streetName: streetName,
            city: city,
            postalCode: postalCode,
            password: password
        });
        // Vérifier si la création a réussi et afficher un message
        if (response.data.id) {
            console.log('Registration successful');
            console.log(response.data.id);
            navigation.navigate('Home');
        } else {
            console.log('Registration failed');
            // Gérer l'échec de création
        }
    } catch (error) {
        console.log('An error occurred:', error);
        // Gérer les erreurs
    }
};
export default Register;
