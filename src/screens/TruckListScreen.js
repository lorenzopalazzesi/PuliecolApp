import React, { useContext, useEffect, useState } from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import { View } from 'react-native-animatable';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation';
import HeaderComponent from '../components/HeaderComponent';
import { Context as ProcessContext } from '../context/ProcessContext';
import { colors } from '../constants/color';

const TruckListScreen = ({ navigation }) => {
    const { state, loadVehicle } = useContext(ProcessContext);

    return (
        <>
            <NavigationEvents onDidFocus={loadVehicle} />
            <HeaderComponent
                headerTitle='Info Veicoli'
                iconName='close'
                onPress={() => navigation.goBack()}
            />
            <FlatList
                data={state.vehicle}
                keyExtractor={(item) => item.plate}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.container}>
                            <View>
                                <Text style={styles.text}>Targa : {item.plate}</Text>
                                <Text style={styles.text}>Tipo : {item.type}</Text>
                                <Text style={styles.text}>Proprietario: {item.owner}</Text>
                                <Text style={styles.text}>Responsabile: {item.responsabile}</Text>
                            </View>
                            <View style={{justifyContent: "center" , marginRight: 5}}>
                                <FontAwesome5 name="truck" size={24} color={colors.primary} />
                            </View>
                        </TouchableOpacity>

                    )
                }}
            />
        </>
    );
};

TruckListScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 6,
        borderWidth: 1.5,
        borderColor: 'lightgrey',
        borderRadius: 6,
        padding: 5
    },
    text: {
        fontWeight: "bold",
        marginVertical: 3
    }
});

export default TruckListScreen;