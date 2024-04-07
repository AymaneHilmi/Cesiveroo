
import axios from 'axios';

// inscrire un utilisateur
const Register = async (name, email, phone, streetNumber, city, postalCode, password) => {
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
            city: city,
            postalCode: postalCode,
            password: password
        });

        // Vérifier si l'inscription a réussi
        if (response === 200) {
            console.log('Registration successful');
            //navigation.navigate('Home');
            // Rediriger l'utilisateur vers la page d'accueil
        } else {
            console.log('Registration failed');
            // Gérer l'échec de l'inscription
        }
    } catch (error) {
        console.log('An error occurred:', error);
        // Gérer les erreurs
    }
};
export default Register;
