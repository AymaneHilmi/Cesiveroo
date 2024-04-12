import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP } from '../config';


const Restaurateur = async () => {
    try {
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
        const restaurantId = verify.data.RestaurantID;
        const name = verify.data.name;
        const email = verify.data.email;
        const phone = verify.data.phone;
        const streetNumber = verify.data.streetNumber;
        const streetName = verify.data.streetName;
        const city = verify.data.city;
        const postalCode = verify.data.postalCode;
        const bankInfo = verify.data.bankInfo;
        const category = verify.data.category;
        const imgPath = verify.data.imgPath;
        const role = verify.data.role;
        return { restaurantId, name, email, phone, streetNumber, streetName, city, postalCode, bankInfo, category, imgPath, role };
    } catch (error) {
        console.log('An error occurred:', error);
        // Gérer les erreurs
    }
}

const nbOrders = async () => {
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
    const nb_data = await axios.get(
        "http://" + IP + ":3000/api/restaurants/orders/nb/" + verify.data.RestaurantID,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return nb_data.data[0].nbOrders;
}

async function getRestaurantMenu(restaurantId) {
    try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token:', token)
        console.log('RestaurantId:', restaurantId)
        const response = await axios.get("http://" + IP + ":3000/api/restaurants/" + restaurantId + "/menus",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log('An error occurred:', error);
        // Gérer les erreurs
    }
}

// Modifier les infos restaurant

async function updateRestaurantInfos(restaurantId, name, email, streetNumber, streetName, imgPath) {
    try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token:', token)
        console.log('RestaurantId:', restaurantId)
        const response = await axios.put("http://" + IP + ":3000/api/restaurants/" + restaurantId,
            {
                name,
                email,
                streetNumber,
                streetName,
                imgPath
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log('An error occurred:', error);
        // Gérer les erreurs
    }
}

// Récuperer les articles du restaurant

async function getRestaurantArticles(restaurantId) {
    try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token:', token)
        console.log('RestaurantId:', restaurantId)
        const response = await axios.get("http://" + IP + ":3000/api/restaurants/" + restaurantId + "/articles",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log('An error occurred:', error);
        // Gérer les erreurs
    }
}

// Voir un menu en détail
async function getMenuDetails(menuId) {
    try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token:', token)
        console.log('MenuId:', menuId)
        const response = await axios.get("http://" + IP + ":3000/api/menus/" + menuId,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        const articles = await axios.get("http://" + IP + ":3000/api/articles-menus/menus/" + menuId,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log('Articles:', articles.data)
        response.data.articles = articles.data;
        // Extraire les articles de la réponse et récuperer les détails de chaque article
        for (let i = 0; i < response.data.articles.length; i++) {
            const articleId = response.data.articles[i].ArticleID;
            console.log('ArticleId:', articleId)
            const article = await axios.get("http://" + IP + ":3000/api/articles/" + articleId,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log('Article:', article.data)
            // Remove the ArticleID from the article object
            delete article.data.ArticleID;
            delete article.data.RestaurantID;
            response.data.articles[i].details = article.data;
            console.log('Article details:', response.data.articles[i].details)
        }
        return response.data;
    } catch (error) {
        console.log('An error occurred:', error);
        // Gérer les erreurs
    }
}

// Supprimer un menu
async function deleteMenu(menuId) {
    try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token:', token)
        console.log('MenuId:', menuId)
        const response = await axios.delete("http://" + IP + ":3000/api/menus/" + menuId,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log('An error occurred:', error);
        // Gérer les erreurs
    }
}

// Créer un menu
async function createMenu(restaurantId, name, price) {
    try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token:', token)
        console.log('RestaurantId:', restaurantId)
        const response = await axios.post("http://" + IP + ":3000/api/menus",
            {
                RestaurantID: restaurantId,
                name: name,
                price: price
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log('An error occurred:', error);
        // Gérer les erreurs
    }
}

// Modifier un menu
async function updateMenu(menuId, name, price) {
    try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token:', token)
        console.log('MenuId:', menuId)
        const response = await axios.put("http://" + IP + ":3000/api/menus/" + menuId,
            {
                name: name,
                price: price
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log('An error occurred:', error);
        // Gérer les erreurs
    }
}

// Créer un article
async function createArticle(restaurantId, name, ingredients, price) {
    try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token:', token)
        console.log('RestaurantID:', restaurantId)
        const response = await axios.post("http://" + IP + ":3000/api/articles",
            {
                RestaurantID: restaurantId,
                Name: name,
                Ingredients: ingredients,
                Price: price
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log('An error occurred:', error);
        // Gérer les erreurs
    }
}

// Modifier un article
async function updateArticle(articleId, name, description, price) {
    try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token:', token)
        console.log('ArticleId:', articleId)
        const response = await axios.put("http://" + IP + ":3000/api/articles/" + articleId,
            {
                name: name,
                description: description,
                price: price
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log('An error occurred:', error);
        // Gérer les erreurs
    }
}

// Supprimer un article

async function deleteArticle(articleId) {
    try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token:', token)
        console.log('ArticleId:', articleId)
        const response = await axios.delete("http://" + IP + ":3000/api/articles/" + articleId,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log('An error occurred:', error);
        // Gérer les erreurs
    }
}
// Add article to menu
async function addArticleToMenu(menuId, articleId) {
    try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token:', token)
        console.log('MenuId:', menuId)
        console.log('ArticleId:', articleId)
        const response = await axios.post("http://" + IP + ":3000/api/articles-menus",
            {
                MenuID: menuId,
                ArticleID: articleId
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log('An error occurred:', error);
        // Gérer les erreurs
    }
}

export { Restaurateur, getRestaurantMenu, updateRestaurantInfos, getRestaurantArticles, getMenuDetails, deleteMenu, createMenu, updateMenu, createArticle, updateArticle, deleteArticle, addArticleToMenu, nbOrders };