import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';
// Import IP from config file
import { IP } from '../config';
const UserInfos = async () => {
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
    const { name, email, phone, imgPath } = verify.data
    const nameTemp = name.split(' ')
    const firstName = nameTemp[0]
    const lastName = nameTemp[1]
    const clientId = verify.data.ClientID
    return { firstName, lastName, email, phone, imgPath, clientId }
};

const modifyUserInfos = async (newFirstName, newLastName, newEmail, newPhone, imgPath) => {
    // vérifier que first name est un string qui contient pas d'expace
    if (newFirstName.length === 0 || newFirstName.includes(" ")) {
        return 'Invalid First Name';
    } else if (newLastName.length === 0 || newLastName.includes(" ")) {
        return 'Invalid Last Name';
    } else if (newEmail.length === 0 || !newEmail.includes('@') || !newEmail.includes('.') || newEmail.length < 5) {
        return 'Invalid email';
    } else if (newPhone.length !== 10 || isNaN(newPhone)) {
        return 'Invalid phone';
    }

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
    const { ClientID, city, phone, postalCode, streetName, streetNumber } = verify.data

    const response = await axios.put(`http://` + IP + `:3000/api/clients/` + ClientID, {
        name: newFirstName + ' ' + newLastName,
        email: newEmail,
        phone: newPhone,
        streetNumber: streetNumber,
        streetName: streetName,
        city: city,
        postalCode: postalCode,
        imgPath: imgPath
    },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
};

async function pickImageAndSave() {
    // Demande de permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
        alert("Vous avez refusé d'accorder l'accès à la galerie.");
        return;
    }

    // Sélection de l'image
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
        return;
    }

    const url = pickerResult.assets[0].uri;
    // Déterminez le nouveau chemin
    const fileName = url.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    // Copiez le fichier dans le répertoire permanent
    try {
        await FileSystem.copyAsync({
            from: url,
            to: newPath,
        });
        console.log('Image enregistrée avec succès :', newPath);
        // Vous pouvez maintenant utiliser newPath pour afficher l'image ou la stocker dans l'état de votre application
    } catch (e) {
        console.error('Erreur lors de l\'enregistrement de l\'image', e);
    }
    const { clientId } = await UserInfos();
    const formData = new FormData();
    formData.append('image', {
        uri: imageUrl,
        type: 'image/jpeg', // Remplacez 'jpeg' par le format de votre image
        name: clientId + '.jpg'
    });
    const uploadImage = await axios.post('http://' + IP + ':4000/upload', formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    console.log(uploadImage.data.path);
    return uploadImage.data.path;
}
export { UserInfos, modifyUserInfos, pickImageAndSave };