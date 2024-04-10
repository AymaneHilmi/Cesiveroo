import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
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



export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }} >
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Account" component={AccountScreen} />
                <Stack.Screen name="AccountDetails" component={AccountDetailsScreen} />
                <Stack.Screen name="PreparingOrder" component={PreparingOrderScreen} />
                <Stack.Screen name="Delivery" component={DeliveryScreen} />
                <Stack.Screen name="Restaurant" component={RestaurantScreen} />
                <Stack.Screen name="Cart" component={CartScreen} />
                <Stack.Screen name="Sign" component={SignScreen} />
                <Stack.Screen name="Maps" component={MapsScreen} />
                <Stack.Screen name="OrderHistory" component={OrderHistory} />
                <Stack.Screen name="DriverScreen" component={DriverScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}