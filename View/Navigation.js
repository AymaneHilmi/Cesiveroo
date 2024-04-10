import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import LoginPage from './screens/LoginScreen';
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
import RestaurateurScreen from './screens/RestaurateurScreen';



export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }} >
                <Stack.Screen name="Restaurant" component={RestaurantScreen} />
                <Stack.Screen name="Restaurateur" component={RestaurateurScreen} />
                <Stack.Screen name="DriverScreen" component={DriverScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Account" component={AccountScreen} />
                <Stack.Screen name="AccountDetails" component={AccountDetailsScreen} />
                <Stack.Screen name="PreparingOrder" options={{ presentation: 'fullScreenModal', headerShown: false }} component={PreparingOrderScreen} />
                <Stack.Screen name="Delivery" options={{ presentation: 'fullScreenModal', headerShown: false }} component={DeliveryScreen} />
                <Stack.Screen name="Cart" options={{ presentation: 'modal', headerShown: false }} component={CartScreen} />
                <Stack.Screen name="Sign" component={SignScreen} />
                <Stack.Screen name="Maps" component={MapsScreen} />
                <Stack.Screen name="OrderHistory" component={OrderHistory} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}