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

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }} >
                <Stack.Screen name="Restaurant" component={RestaurantScreen} />
                <Stack.Screen name="Sign In" component={SignScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Maps" component={MapsScreen} />
                <Stack.Screen name="Cart" options={{ presentation: 'modal' }} component={CartScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}