import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP } from '../config';
// import * as ImagePicker from "expo-image-picker";
// import * as FileSystem from "expo-file-system";

const MenuArticleInfos = async (RestaurantID) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const menus = await axios.get(
            "http://" + IP + ":3000/api/restaurants/" + RestaurantID + "/menus",
            // Body de la requête (s'il y en a un)
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        const articles = await axios.get(
            "http://" + IP + ":3000/api/restaurants/" + RestaurantID + "/articles",
            // Body de la requête (s'il y en a un)
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const articlesOfMenu = {};
        const menusQuantity = {};
        const articlesQuantity = {};

        for (const article of articles.data) {
            articlesQuantity[article.ArticleID] = 0;
        }

        for (const menu of menus.data) {
            articlesOfMenu[menu.MenuID] = "";
            menusQuantity[menu.MenuID] = 0;
        }

        // Loop on menus and articles to get the articles of each menu
        for (const menu of menus.data) {
            const verif = await axios.get(
                "http://" + IP + ":3000/api/menus/articles/" + menu.MenuID,
                // Body de la requête (s'il y en a un)
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            for (const article of verif.data) {
                articlesOfMenu[menu.MenuID] += article.Name + ", ";
            }
            articlesOfMenu[menu.MenuID] = articlesOfMenu[menu.MenuID].slice(0, -2);
        }

        const articles_dt = articles.data;
        const menus_dt = menus.data;
        return { articles_dt, menus_dt, articlesOfMenu, articlesQuantity, menusQuantity };
        // Récupérer le nom du client
    } catch (error) {
        console.log('An error occurred:', error);
        // Gérer les erreurs
    }
}

export default MenuArticleInfos