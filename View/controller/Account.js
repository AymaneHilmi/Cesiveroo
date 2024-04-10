import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';

const deleteAccount = async () => {
    const token = await AsyncStorage.getItem('token');
    const verify = await axios.post(
        "http://192.168.97.46:3000/api/clients/verify",
        // Body de la requête (s'il y en a un)
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    const {ClientID} = verify.data
    console.log(ClientID)

    // const response = await axios.delete(`http://192.168.97.46:3000/api/clients/${ClientID}`, {},
    //     {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     });
    return "Succesfully deleted account"
};

export default deleteAccount