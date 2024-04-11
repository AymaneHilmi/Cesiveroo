import { View, Text, ScrollView, Image, TouchableOpacity, StatusBar } from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import DishRow from '../components/dishRow';
import CartIcon from '../components/cartIcon';
import { useRoute } from '@react-navigation/native';
import MenuArticleInfos from "../controller/Restaurant";
import {Menu} from "react-native-feather";

export default function RestaurantScreen() {
    const navigation = useNavigation();
    const route = useRoute(); // hook useRoute pour accéder à l'objet route
    const { restaurantInfos } = route.params;
    const [menus, setMenus] = useState([]);
    const [articles, setArticles] = useState([]);
    const [articlesOfMenu, setArticlesOfMenu] = useState([]);
    const [menuQuantity, setMenuQuantity] = useState({});
    const [articleQuantity, setArticleQuantity] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [numberArticles, setNumberArticles] = useState(0);
    const [priceByMenu, setPriceByMenu] = useState({});
    const [priceByArticle, setPriceByArticle] = useState({});
    const [quantityByMenu, setQuantityByMenu] = useState({});
    const [quantityByArticle, setQuantityByArticle] = useState({});

    useEffect(() => {
        MenuArticleInfos(restaurantInfos.RestaurantID).then((data) => {
            setArticles(data.articles_dt);
            setMenus(data.menus_dt);
            setArticlesOfMenu(data.articlesOfMenu);
            setMenuQuantity(data.menusQuantity);
            setArticleQuantity(data.articlesQuantity);
        });
    }, [restaurantInfos.RestaurantID]); // Exécutez l'effet seulement si restaurantInfos.RestaurantID change


    // Fonction pour augmenter la quantité
    const increaseQuantityMenu = (MenuID, price) => {
        setMenuQuantity({
            ...menuQuantity,
            [MenuID]: menuQuantity[MenuID] + 1
        });
        setTotalPrice(totalPrice + price);
        setNumberArticles(numberArticles + 1)

        setPriceByMenu({
            ...priceByMenu,
            [MenuID]: (priceByMenu[MenuID] || 0) + price
        });
        setQuantityByMenu({
            ...quantityByMenu,
            [MenuID]: (quantityByMenu[MenuID] || 0) + 1
        });
    }

    // Fonction pour diminuer la quantité
    const decreaseQuantityMenu = (MenuID, price) => {
        if (menuQuantity[MenuID] > 0) {
            setMenuQuantity({
                ...menuQuantity,
                [MenuID]: menuQuantity[MenuID] - 1
            });
            setTotalPrice(totalPrice - price);
            setNumberArticles(numberArticles - 1)

            setPriceByMenu({
                ...priceByMenu,
                [MenuID]: (priceByMenu[MenuID] || 0) - price
            });
            setQuantityByMenu({
                ...quantityByMenu,
                [MenuID]: (quantityByMenu[MenuID] || 0) - 1
            });
        }
    }

    // Fonction pour augmenter la quantité
    const increaseQuantityArticle = (ArticleID, price) => {
        setArticleQuantity({
            ...articleQuantity,
            [ArticleID]: articleQuantity[ArticleID] + 1
        });
        setTotalPrice(totalPrice + price);
        setNumberArticles(numberArticles + 1)

        setPriceByArticle({
            ...priceByArticle,
            [ArticleID]: (priceByArticle[ArticleID] || 0) + price
        });
        setQuantityByArticle({
            ...quantityByArticle,
            [ArticleID]: (quantityByArticle[ArticleID] || 0) + 1
        });
    }

    // Fonction pour diminuer la quantité
    const decreaseQuantityArticle = (ArticleID, price) => {
        if (articleQuantity[ArticleID] > 0) {
            setArticleQuantity({
                ...articleQuantity,
                [ArticleID]: articleQuantity[ArticleID] - 1
            });
            setTotalPrice(totalPrice - price);
            setNumberArticles(numberArticles - 1)
            setPriceByArticle({
                ...priceByArticle,
                [ArticleID]: priceByArticle[ArticleID] - price
            });
            setQuantityByArticle({
                ...quantityByArticle,
                [ArticleID]: quantityByArticle[ArticleID] - 1
            });
        }
    }
    return (
        <>
            <View style={{
                position: 'absolute',
                bottom: 20,
                zIndex: 50,
                width: 430,
                justifyContent: 'center'
            }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Cart', { articles, menus, quantityByMenu, priceByMenu, quantityByArticle, priceByArticle, totalPrice })}
                    style={{
                        backgroundColor: themeColors.bgColor(1), padding: 16,
                        paddingTop: 12,
                        paddingBottom: 12,
                        marginLeft: 20,
                        marginRight: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderRadius: 9999,
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                    }}
                    // onPress={() => navigation.navigate('Cart')}
                >
                    <View style={{
                        backgroundColor: 'rgba(255,255,255,0.3)', padding: 8,
                        paddingLeft: 16, paddingRight: 16, borderRadius: 9999,
                    }}>
                        <Text style={{ fontSize: 18, lineHeight: 28, fontWeight: 800, color: 'white' }}>
                            {numberArticles}
                        </Text>
                    </View>

                    <Text style={{
                        fontSize: 18, lineHeight: 28,
                        fontWeight: 800, textAlign: 'center', color: '#ffffff',
                    }}>View Cart</Text>


                    <Text style={{ fontSize: 18, lineHeight: 28, fontWeight: 800, color: 'white' }}>${totalPrice}</Text>


                </TouchableOpacity>

            </View>
            <StatusBar style="light" />
            <ScrollView>
                <View style={{ position: 'relative' }}>
                    <Image source={require('../assets/images/pizza.png')} style={{ width: '100%', height: 300 }} />
                    <TouchableOpacity
                        onPress={() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Home' }],
                            });
                        }}
                        style={{
                            position: 'absolute', left: 16, top: 56, padding: 8,
                            borderRadius: 9999, backgroundColor: '#F9FAFB',
                            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
                        }}>
                        <Icon.ArrowLeft height={20} width={20} strokeWidth={3} stroke={themeColors.bgColor(1)} />
                    </TouchableOpacity>
                </View>
                <View style={{
                    borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingTop: 24,
                    marginTop: -48, backgroundColor: '#ffffff'
                }}>
                    <View style={{ paddingLeft: 20, paddingRight: 20, }}>
                        <Text style={{ fontSize: 30, lineHeight: 36, fontWeight: 700, }}>{restaurantInfos.name}</Text>
                        {/* copy this code from restaurant card */}
                        <View style={{
                            marginTop: 4, marginBottom: 4,
                            flexDirection: 'row',
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Image source={require('../assets/images/fullStar.png')}
                                       style={{ width: 20, height: 20 }} />
                                <Text style={{ fontSize: 12, lineHeight: 16, marginLeft: 5 }}>
                                    <Text style={{ color: '#fbd553', fontWeight: 'bold' }}>4</Text>
                                    <Text className="text-gray-700"> (4.6k review)</Text> · <Text style={{ color: '#047857', }} className="font-semibold">{restaurantInfos.category}</Text>
                                </Text>
                            </View>
                            <View style={{ marginLeft: 4, flexDirection: 'row', alignItems: 'center', }}>
                                <Icon.MapPin color="gray" style={{ marginLeft: 5, width: 1000 }} />
                                <Text style={{ marginLeft: 5, fontSize: 14, lineHeight: 16 }}>{restaurantInfos.city}</Text>
                            </View>
                        </View>
                        {/*<Text style={{ marginTop: 8, color: '#6B7280' }}>Hot and Spicy pizzas</Text>*/}
                    </View>
                </View>
                <View style={{
                    paddingBottom: 0,
                    backgroundColor: '#ffffff',
                }}>
                    <Text style={{
                        paddingTop: 16,
                        paddingBottom: 8,
                        paddingLeft: 16,
                        paddingRight: 16,
                        fontSize: 24,
                        lineHeight: 32,
                        fontWeight: '700',
                    }}>Menus</Text>
                    {/* Ici, affichez chaque menu sans ScrollView interne */}
                    {menus.map((menu, index) => (
                        <View key={menu.MenuID}>
                            <View style={{
                                padding: 12, marginLeft: 8, marginRight: 8, marginBottom: 12,
                                flexDirection: 'row', alignItems: 'center', borderRadius: 24, backgroundColor: '#ffffff',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            }}>
                                <Image style={{ height: 100, width: 100, borderRadius: 24 }}
                                       source={require('../assets/images/pizzaDish.png')} />
                                <View style={{ display: 'flex', marginTop: 14, flex: 1 }}>
                                    <View className="pl-3">
                                        <Text className="text-xl">{menu.name}</Text>
                                        <Text className="text-gray-700">{articlesOfMenu[menu.MenuID]}</Text>
                                    </View>
                                    <View style={{
                                        paddingLeft: 12, flexDirection: 'row',
                                        justifyContent: 'space-between', alignItems: 'center',
                                    }}>
                                        <Text style={{ fontSize: 18, lineHeight: 28, fontWeight: '700', color: '#374151', }}>
                                            ${menu.price}
                                        </Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                            <TouchableOpacity
                                                onPress={() => decreaseQuantityMenu(menu.MenuID, menu.price)}
                                                style={{ padding: 4, borderRadius: 9999, backgroundColor: themeColors.bgColor(1) }}>
                                                <Icon.Minus strokeWidth={2} height={20} width={20} stroke="white" />
                                            </TouchableOpacity>
                                            <Text className="px-3">
                                                {menuQuantity[menu.MenuID]}
                                            </Text>

                                            <TouchableOpacity
                                                onPress={() => increaseQuantityMenu(menu.MenuID, menu.price)}
                                                style={{ padding: 4, borderRadius: 9999, backgroundColor: themeColors.bgColor(1) }}>
                                                <Icon.Plus strokeWidth={2} height={20} width={20} stroke="white" />
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </View>
                            </View >
                        </View>
                    ))}
                </View>
                <View style={{
                    paddingBottom: 144,
                    backgroundColor: '#ffffff',
                }}>
                    <Text style={{
                        paddingTop: 24,
                        paddingBottom: 8,
                        paddingLeft: 16,
                        paddingRight: 16,
                        fontSize: 24,
                        lineHeight: 32,
                        fontWeight: '700',
                    }}>Articles</Text>
                    {/* Ici, affichez chaque menu sans ScrollView interne */}
                    {articles.map((article, index) => (
                        <View key={article.ArticleID}>
                            <View style={{
                                padding: 12, marginLeft: 8, marginRight: 8, marginBottom: 12,
                                flexDirection: 'row', alignItems: 'center', borderRadius: 24, backgroundColor: '#ffffff',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            }}>
                                <Image style={{ height: 100, width: 100, borderRadius: 24 }}
                                       source={require('../assets/images/pizzaDish.png')} />
                                <View style={{ display: 'flex', marginTop: 14, flex: 1 }}>
                                    <View className="pl-3">
                                        <Text className="text-xl">{article.Name}</Text>
                                        <Text className="text-gray-700">{article.Ingredients}</Text>
                                    </View>
                                    <View style={{
                                        paddingLeft: 12, flexDirection: 'row',
                                        justifyContent: 'space-between', alignItems: 'center',
                                    }}>
                                        <Text style={{ fontSize: 18, lineHeight: 28, fontWeight: '700', color: '#374151', }}>
                                            ${article.Price}
                                        </Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                            <TouchableOpacity
                                                onPress={() => decreaseQuantityArticle(article.ArticleID, article.Price)}
                                                style={{ padding: 4, borderRadius: 9999, backgroundColor: themeColors.bgColor(1) }}>
                                                <Icon.Minus strokeWidth={2} height={20} width={20} stroke="white" />
                                            </TouchableOpacity>
                                            <Text className="px-3">
                                                {articleQuantity[article.ArticleID]}
                                            </Text>

                                            <TouchableOpacity
                                                onPress={() => increaseQuantityArticle(article.ArticleID, article.Price)}
                                                style={{ padding: 4, borderRadius: 9999, backgroundColor: themeColors.bgColor(1) }}>
                                                <Icon.Plus strokeWidth={2} height={20} width={20} stroke="white" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View >
                        </View>
                    ))}
                </View>
            </ScrollView>
        </>
    );
}