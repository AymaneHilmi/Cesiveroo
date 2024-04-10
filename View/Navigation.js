import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignScreen from './screens/SignScreen';
import MapsScreen from './screens/MapsScreen';
import CartScreen from './screens/CartScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import AccountScreen from './screens/AccountScreen';
import AccountDetailsScreen from './screens/AccountDetailsScreen';
import OrderHistory from './screens/OrderHistory';
import DriverScreen from './screens/DriverScreen';
import AccountRestaurateurScreen from './screens/AccountRestorateurScreen';
import RestaurateurScreen from './screens/RestaurateurScreen';
import MenuScreen from './screens/MenuScreen';
import MenuDetailsScreen from './screens/MenuDetailsScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import AccountDetailsRestaurantScreen from './screens/AccountDetailsRestaurantScreen';
import ArticlesDetailsScreen from './screens/ArticlesDetailsScreen';
import ArticlesScreen from './screens/ArticlesScreen';
import OrdersScreen from './screens/OrdersScreen';;
import OrdersDetailsScreen from './screens/OrdersDetailsScreen';
import ServiceCommercialScreen from './screens/ServiceCommercialScreen';
import AccountDriverScreen from './screens/AccountDriverScreen';
import AccountDetailsDriverScreen from './screens/AccountDetailsDriverScreen';



export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }} >

                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Sign" component={SignScreen} />

                {/* User Screens */}
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Restaurant" component={RestaurantScreen} />
                <Stack.Screen name="Cart" options={{ presentation: 'modal', headerShown: false }} component={CartScreen} />
                <Stack.Screen name="Maps" component={MapsScreen} />
                <Stack.Screen name="Delivery" options={{ presentation: 'fullScreenModal', headerShown: false }} component={DeliveryScreen} />
                <Stack.Screen name="PreparingOrder" options={{ presentation: 'fullScreenModal', headerShown: false }} component={PreparingOrderScreen} />
                <Stack.Screen name="Account" component={AccountScreen} />
                <Stack.Screen name="AccountDetails" component={AccountDetailsScreen} />
                <Stack.Screen name="OrderHistory" component={OrderHistory} />

                {/* Restaurateur Screens */}
                <Stack.Screen name="Restaurateur" component={RestaurateurScreen} />
                <Stack.Screen name="AccountRestaurateur" component={AccountRestaurateurScreen} />
                <Stack.Screen name="AccountRestorateurDetails" component={AccountDetailsRestaurantScreen} />
                <Stack.Screen name="Articles" component={ArticlesScreen} />
                <Stack.Screen name="ArticlesDetails" options={{ presentation: 'modal', headerShown: false }} component={ArticlesDetailsScreen} />
                <Stack.Screen name="Menu" component={MenuScreen} />
                <Stack.Screen name="MenuDetails" options={{ presentation: 'modal', headerShown: false }} component={MenuDetailsScreen} />
                <Stack.Screen name="Orders" component={OrdersScreen} />
                <Stack.Screen name="OrdersDetails" options={{ presentation: 'modal', headerShown: false }} component={OrdersDetailsScreen} />

                {/* Service Commercial */}
                <Stack.Screen name="ServiceCommercial" component={ServiceCommercialScreen} />

                {/* Driver */}
                <Stack.Screen name="Driver" component={DriverScreen} />
                <Stack.Screen name="AccountDriver" component={AccountDriverScreen} />
                <Stack.Screen name="AccountDriverDetails" component={AccountDetailsDriverScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}