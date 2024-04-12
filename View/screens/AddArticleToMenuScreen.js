// Import necessary modules
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { themeColors } from '../theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getRestaurantArticles, addArticleToMenu } from '../controller/Restaurateur';

export default function AddArticleToMenuScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const restaurantInfos = route.params.restaurantInfos;
    const menuId = route.params.menuId;
    const restaurantId = restaurantInfos.restaurantId;
    const [articles, setArticles] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [ingredients, setIngredients] = useState('');

    // Function to get articles of the restaurant
    const handleGetRestaurantArticles = async (ArticleID) => {
        try {
            const response = await getRestaurantArticles(restaurantId, ArticleID);
            console.log('Restaurant articles:', response);
            setArticles(response);
        } catch (error) {
            console.error('Error getting restaurant articles:', error);
        }
    }

    // Call handleGetRestaurantArticles on component mount
    useEffect(() => {
        handleGetRestaurantArticles();
    }, []);

    // Function to add an article to the menu
    const handleCreateArticle = async (ArticleID) => {
        try {
            // Call API to add article to menu
            const response = await addArticleToMenu(menuId, ArticleID); // You need to define articleId
            console.log('Article created:', response);
            // Reset the MenuScreen
            navigation.reset({
                index: 0,
                routes: [{ name: 'Menu', params: { restaurantInfos } }]
            });
            // Navigate to MenuScreen
            navigation.navigate('Menu', { restaurantInfos });
        } catch (error) {
            console.error('Error creating article:', error);
        }
    }

    return (
        // Afficher tout les articles et mettre un bouton ajouter pour chaque article
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20, paddingTop: 5 }}>
            {articles.map((article, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => handleCreateArticle(article.ArticleID)}
                    style={{ paddingHorizontal: 10, marginTop: 10, marginHorizontal: 10, backgroundColor: 'white', borderRadius: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{article.Name}</Text>
                            <Text>Ingredients: {article.Ingredients}</Text>
                            <Text>Price: ${article.Price}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>

    )
}
