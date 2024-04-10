import { View, Text, TouchableOpacity, Image } from 'react-native'
import { themeColors } from '../theme';
import * as Icon from "react-native-feather";
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function ServiceCommercialScreen() {
    const [selectedClient, setSelectedLanguage] = useState();
    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 8, marginTop: 20 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AccountRestaurateur')}
                    style={{
                        backgroundColor: themeColors.bgColor(1),
                        zIndex: 10, padding: 10, borderRadius: 9999,
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
                <View className="justify-center">
                    <Text style={{ fontSize: 20 }}>Good Morning,</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: themeColors.primary }}>Service Commercial</Text>
                </View>
                <TouchableOpacity
                    style={{ marginLeft: 6, padding: 10, borderRadius: 999 }}>
                    <Image source={require('../assets/images/serviceCommercial.png')} style={{ width: 50, height: 50, borderRadius: 999 }} />
                </TouchableOpacity>
            </View>
            <Text>Select the Client to delete :</Text>
            <View style={{ width: '100%', paddingHorizontal: 80 }} >
                <Picker
                    itemStyle={{ color: themeColors.bgColor(1), fontSize: 20 }}
                    selectedValue={selectedClient}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)

                    }>
                    <Picker.Item label="Client 1" value="Client 1" />
                    <Picker.Item label="Client 2" value="Client 2" />
                    <Picker.Item label="Client 3" value="Client 3" />
                </Picker>
            </View>
            <View className="flex-row p-5">
                <Text className="ml-10 mt-2">Selected Client :</Text>
                <Text className="ml-10 text-center font-bold text-xl" style={{ color: themeColors.bgColor(1) }}> {selectedClient}</Text>
            </View>
            <View className="mx-12">
                <TouchableOpacity className="p-5" style={{ backgroundColor: "red", borderRadius: 10 }}>
                    <Text className="text-center text-white font-bold text-lg">Delete</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}