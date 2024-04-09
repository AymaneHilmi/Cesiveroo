import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation';
import { LogIn } from 'react-native-feather';
import { Provider } from 'react-redux'
import { store } from './store';




export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}
