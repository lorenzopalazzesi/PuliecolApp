import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import HeaderComponent from '../components/HeaderComponent';


const IsleListScreen = () => {
    const [isSearching, setIsSearching] = useState(false);
    return (
        <>
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

const styles = StyleSheet.create({
    searchBar:{
        padding: 15,
        margin: 5,
        backgroundColor: 'lightgrey',
        borderRadius: 8
    }
});

IsleListScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}

export default IsleListScreen;