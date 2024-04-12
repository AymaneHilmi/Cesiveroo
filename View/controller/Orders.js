import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP } from '../config';

const ordersList = async () => {
    console.log('Getting count orders')
    const token = await AsyncStorage.getItem('token');
    const verify = await axios.post(
        "http://" + IP + ":3000/api/restaurants/verify",
        // Body de la requête (s'il y en a un)
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    const orders = await axios.get(
        "http://" + IP + ":3000/api/restaurants/orders/" + verify.data.RestaurantID,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    console.log(orders.data)
    return orders.data
}

export default ordersList;