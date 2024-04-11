import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { deleteMenu, getRestaurantMenu } from '../controller/Restaurateur';

export default function MenuDetailsScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const restaurantInfos = route.params.restaurantInfos
    const restaurantId = restaurantInfos.restaurantId;
    const menu = route.params.menu
    const name = menu.name
    const price = menu.price
    // Supprimer un menu
    const handleDeleteMenu = async () => {
        try {
            const response = await deleteMenu(menu.MenuID);
            console.log('Menu deleted:', response);
            // Reset the MenuScreen
            navigation.reset({
                index: 0,
                routes: [{ name: 'Menu', params: { restaurantInfos } }]
            });
            // Navigate to MenuScreen
            navigation.navigate('Menu', { restaurantInfos });


        } catch (error) {
            console.error('Error deleting menu:', error);
        }
    }
    // Par la suite mettre menuarticles ici
    return (
        <View style={{ flex: 1, backgroundColor: "#E8E8E8", height: '100%' }}>
            < View style={{
                backgroundColor: '#ffffff',
                position: 'relative', paddingTop: 20, paddingBottom: 20, boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            }} >
                <View>
                    <Text className="text-center font-bold text-xl">{name}</Text>
                </View>
            </View >
            <View style={{ padding: 10 }}>
                <Text className="font-bold text-xl">Price: ${price}</Text>
            </View>
            <Image source={require('../assets/images/pizza.png')}
                style={{ width: 220, height: 220, borderRadius: 10, alignSelf: 'center', marginTop: 30 }} />

            <TouchableOpacity style={{
                marginTop: 20, backgroundColor: '#20CFBE', padding: 10, borderRadius: 10,
                alignSelf: 'center'
            }}>
                <Text className="">Change Image</Text>
            </TouchableOpacity>

            {/* Ajouter ici l'affichage des détails du menu */}

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 10, marginTop: 20 }}>
                <TouchableOpacity onPress={() => navigation.navigate('EditMenu', { restaurantInfos, menu })} style={{
                    backgroundColor: '#20CFBE', padding: 15, width: '40%', borderRadius: 10,
                    alignSelf: 'center', alignItems: 'center',
                }} >

                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeleteMenu} style={{
                    backgroundColor: 'red', padding: 15, width: '40%', borderRadius: 10,
                    alignSelf: 'center', alignItems: 'center',
                }} >
                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
