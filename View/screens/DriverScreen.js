import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { themeColors } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, MarkerAnimated } from 'react-native-maps';

import * as Icon from "react-native-feather";

export default function DriverScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ height: "100%" }}>
      {/* top button */}

      <TouchableOpacity
        // onPress={}
        style={{
          backgroundColor: themeColors.bgColor(1), position: 'absolute',
          left: 15, top: 75, zIndex: 10, padding: 9, borderRadius: 9999,
          shadowColor: 'black',
          shadowOffset: {
            width: 0, // Décalage horizontal de l'ombre; positif à droite
            height: 2, // Décalage vertical de l'ombre; positif en bas
          },
          shadowOpacity: 0.3, // Opacité de l'ombre; 1 est complètement opaque
          shadowRadius: 3.84, // Flou de l'ombre,
        }}>
        <Icon.Menu strokeWidth={3} stroke="white" />
      </TouchableOpacity>
      <View style={{
        position: 'absolute', left: 155, top: 75, backgroundColor: "#A4A4A4",
        padding: 10, borderRadius: 99, flexDirection: 'row', alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {
          width: 0, // Décalage horizontal de l'ombre; positif à droite
          height: 2, // Décalage vertical de l'ombre; positif en bas
        },
        shadowOpacity: 0.3, // Opacité de l'ombre; 1 est complètement opaque
        shadowRadius: 5.84, // Flou de l'ombre,
      }}>
        <Text className="text-center font-bold text-xl text-white">500,00</Text>
        <Text className="text-center font-bold text-xl ml-1" style={{ color: themeColors.bgColor(1) }}>$</Text>
      </View>


      {/* map */}
      <MapView
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}
        mapType="standard"
      >
      </MapView>

      <View style={{
        position: 'absolute', top: 20, left: 20, backgroundColor: themeColors.bgColor(1),
        padding: 10, borderRadius: 20, flexDirection: 'row', alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {
          width: 0, // Décalage horizontal de l'ombre; positif à droite
          height: 2, // Décalage vertical de l'ombre; positif en bas
        },
        shadowOpacity: 0.3, // Opacité de l'ombre; 1 est complètement opaque
        shadowRadius: 3.84, // Flou de l'ombre,
      }}>
        <Text style={{ color: 'white', fontSize: 20 }}>Notification de livraison</Text>
        <Icon.Bell strokeWidth={3} stroke="white" /> </View>




      <TouchableOpacity style={{
        position: 'absolute', bottom: 80, left: 160, backgroundColor: themeColors.bgColor(1),
        borderRadius: 9999, padding: 20,
        shadowColor: 'black',
        shadowOffset: {
          width: 0, // Décalage horizontal de l'ombre; positif à droite
          height: 2, // Décalage vertical de l'ombre; positif en bas
        },
        shadowOpacity: 0.3, // Opacité de l'ombre; 1 est complètement opaque
        shadowRadius: 3.84, // Flou de l'ombre,
      }}>
        < Text style={{
          color: 'white', fontSize: 40,
          shadowColor: 'black',
          shadowOffset: {
            width: 0, // Décalage horizontal de l'ombre; positif à droite
            height: 2, // Décalage vertical de l'ombre; positif en bas
          },
          shadowOpacity: 0.3, // Opacité de l'ombre; 1 est complètement opaque
          shadowRadius: 3.84, // Flou de l'ombre
        }}>Go</Text>
      </TouchableOpacity>
    </SafeAreaView >
  )
}