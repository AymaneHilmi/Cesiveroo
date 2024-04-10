import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';
import { IP } from '../config';

const deleteMyAccount = async (navigation) => {
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
    const { ClientID } = verify.data

    const response = axios.delete(`http://` + IP + `:3000/api/clients/${ClientID}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    await AsyncStorage.removeItem('token');
    return "Succesfully deleted account"
};

export default deleteMyAccount;