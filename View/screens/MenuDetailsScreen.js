import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { deleteMenu, getRestaurantMenu, getMenuDetails, addArticleToMenu } from '../controller/Restaurateur';
import { useState } from 'react';
export default function MenuDetailsScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const restaurantInfos = route.params.restaurantInfos
    const restaurantId = restaurantInfos.restaurantId;
    const menu = route.params.menu
    const name = menu.name
    const price = menu.price
    const [response, setResponse] = useState([]);
    // Supprimer un menu
    const handleDeleteMenu = async () => {
        try {
            const response = await deleteMenu(menu.MenuID);
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
    const handleGetMenuDetails = async () => {
        try {
            const response = await getMenuDetails(menu.MenuID);
            setResponse(response || []);

        } catch (error) {
            console.error('Error getting menu details:', error);
        }
    }
    // Ajouter un article au menu
    useEffect(() => {
        handleGetMenuDetails();
    }
        , [])
    return (
        <ScrollView>
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

                <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Articles:</Text>
                    {response.articles && response.articles.map((article, index) => (
                        <View key={index} style={{ marginTop: 10, padding: 10, backgroundColor: '#fff', borderRadius: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{response.articles[index].details.Name}</Text>
                            <Text style={{ fontSize: 14 }}>{response.articles[index].details.Ingredients}</Text>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 5 }}>Price: ${response.articles[index].details.Price}</Text>
                        </View>
                    ))}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 10, marginTop: 20 }}>
                    <TouchableOpacity onPress={handleDeleteMenu}
                        style={{
                            backgroundColor: 'red', padding: 15, width: '40%', borderRadius: 10,
                            alignSelf: 'center', alignItems: 'center',
                        }} >
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }}>delete </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AddArticleToMenu', { restaurantInfos, menuId: menu.MenuID })}
                        style={{
                            backgroundColor: '#20CFBE', padding: 15, width: '40%', borderRadius: 10,
                            alignSelf: 'center', alignItems: 'center',
                        }} >
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }}>Add Article</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView >
    )
}
