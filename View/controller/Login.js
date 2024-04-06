import { View, Text } from 'react-native'
import React from 'react'
import { View, Text } from 'react-native'
import React from 'react'
import axios from 'axios' // Import axios for making HTTP requests

export default function Login(email, password) {
    const handleLogin = async () => {
        try {
            // Make a POST request to your backend API with the login information
            const response = await axios.post('/api/clients/login', {
                email: email,
                password: password
            })

            // Check if the login was successful
            if (response.data.success) {
                navigation.navigate('Home');
                // Redirect the user to the homepage
                // You can use a navigation library like react-navigation for this
                // Example: navigation.navigate('Home')
            } else {
                // Display an error message to the user
                // You can use a state variable to store the error message and display it in your component
            }
        } catch (error) {
            // Handle any errors that occur during the login process
            console.error(error)
        }
    }

    return (
        navigation.navigate('Sign In')
    )
}
// si les informations sont correctes, je dois rediriger l'utilisateur vers la page d'accueil
// sinon, je dois afficher un message d'erreur

