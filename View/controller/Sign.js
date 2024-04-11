
import axios from 'axios';
import { IP } from '../config';

// inscrire un utilisateur
const Register = async (name, email, phone, streetNumber, streetName, city, postalCode, password, navigation, selectedValue, selectedCategory) => {
    try {
        console.log(selectedValue, selectedCategory)
        console.log(name, email, phone, streetNumber, streetName, city, postalCode, password)
        if (selectedValue === 'clients') {
            await axios.post("http://" + IP + ":3000/api/" + selectedValue + "/register", {
                name: name,
                email: email,
                phone: phone,
                streetNumber: streetNumber,
                streetName: streetName,
                city: city,
                postalCode: postalCode,
                password: password
            }
            );
        } else if (selectedValue === 'restaurateurs') {
            await axios.post("http://" + IP + ":3000/api/" + selectedValue + "/register", {
                name: name,
                email: email,
                phone: phone,
                streetNumber: streetNumber,
                streetName: streetName,
                city: city,
                postalCode: postalCode,
                category: selectedCategory,
                password: password
            }
            );
        } else if (selectedValue === 'livreurs') {
            await axios.post("http://" + IP + ":3000/api/" + selectedValue + "/register", {
                name: name,
                email: email,
                password: password
            }
            );
        } else if (selectedValue === 'commercial') {
            const reponse = await axios.post("http://" + IP + ":3000/api/" + selectedValue + "/register", {
                name: name,
                email: email,
                password: password
            }
            );
        } else {
            console.log('Error');
        }
        navigation.navigate('Login');
    } catch (error) {
        console.log('An error occurred:', error);
    }
};
export default Register;
