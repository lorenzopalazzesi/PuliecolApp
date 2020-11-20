import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import HeaderComponent from '../components/HeaderComponent';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation';

const IsleListScreen = () => {
    const [isSearching, setIsSearching] = useState(false);
    return (
        <>
            <NavigationEvents onWillFocus={() => console.log('Richiama qui la funzione get per prendere tutte le isole')}/>
            <HeaderComponent
                headerTitle='Isole Ecologiche'
                iconName='search'
                onPress={() => setIsSearching(!isSearching)}
            />
            {isSearching == true ?
                <Animatable.View style={styles.searchBar} animation='fadeInUp'>
                    <TextInput
                        placeholder='Cerca Isola Ecologica'
                        placeholderTextColor= 'white'
                    />
                </Animatable.View>

                :
                null
            }
        </>
    )
}

IsleListScreen.navigationOptions = () => {
    return {
        headerShown: false,
        tabBarIcon: () => {
            <FontAwesome name="tasks" size={24} color="black" />
        }
    }
}

const styles = StyleSheet.create({
    searchBar:{
        padding: 15,
        margin: 5,
        backgroundColor: 'lightgrey',
        borderRadius: 8
    }
});



export default IsleListScreen;