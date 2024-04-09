
import axios from 'axios';

// inscrire un utilisateur
const Register = async (name, email, phone, streetNumber, streetName, city, postalCode, password, navigation) => {
    try {
        console.log(name, email, phone, streetNumber, streetName, city, postalCode, password)
        if (name.length === 0) {
            const errorName = 'Invalid name';
            return errorName;
        } else if (email.length === 0 && !email.includes('@') && !email.includes('.') && email.length < 5) {
            const errorEmail = 'Invalid email';
            return errorEmail;
        } else if (phone.length === 0 && phone.length !== 10 && isNaN(phone)) {
            const errorPhone = 'Invalid phone';
            return errorPhone;
        } else if (streetNumber.length === 0 && isNaN(streetNumber)) {
            const errorStreetNumber = 'Invalid street number';
            return errorStreetNumber;
        } else if (streetName.length === 0) {
            const errorStreetName = 'Invalid street name';
            return errorStreetName;
        } else if (city.length === 0) {
            const errorCity = 'Invalid city';
            return errorCity;
        } else if (postalCode.length === 0 && postalCode.length !== 5 && isNaN(postalCode)) {
            const errorPostalCode = 'Invalid postal code';
            return errorPostalCode;
        } else if (password.length === 0 && password.length < 6 && !password.match(/[a-z]/) && !password.match(/[0-9]/)) {
            const errorPassword = 'Invalid password';
            return errorPassword;
        } else {
            // Envoyer une requête POST au backend avec les informations de connexion
            console.log('Registering...');
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
            console.log(response.data)
            // Vérifier si la création a réussi et afficher un message
            if (response.data.id) {
                console.log('Registration successful');
                console.log(response.data.id);
                return 'Success registration';
            }
        }
    } catch (error) {
        console.log('An error occurred:', error);
    }
};
export default Register;
