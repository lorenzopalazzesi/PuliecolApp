import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import HeaderComponent from '../components/HeaderComponent';
import { colors } from '../constants/color';
import { NavigationEvents } from 'react-navigation';
import { Context as ProcessContext } from '../context/ProcessContext';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

const IsleListScreen = () => {
    const { state, loadIsle, searchSpecificIsle } = useContext(ProcessContext);
    const [isSearching, setIsSearching] = useState(false);
    const [textSearch, setTextSearch] = useState('');

    return (
        <>
            <NavigationEvents onDidFocus={loadIsle} />
            <HeaderComponent
                headerTitle='Isole Ecologiche'
                iconName='search'
                onPress={() => setIsSearching(!isSearching)}
            />
            {isSearching == true ?
                <Animatable.View style={styles.searchBar} animation='fadeInUp'>
                    <TextInput
                        placeholder='Ricerca per Città'
                        placeholderTextColor='white'
                        value={textSearch}
                        onChangeText={setTextSearch}
                        onSubmitEditing={() => searchSpecificIsle({ textSearch })}

                    />
                </Animatable.View>

                :
                null
            }
            {state.isle.length == 0 ?
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size='large' color={colors.primary} />
                </View>


                :

                <FlatList
                    ListEmptyComponent={
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                            <Text>Nesun Isola Ecologica trovata...</Text>
                        </View>
                    }
                    data={state.isle}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", margin: 5, padding: 5, borderWidth: 1.5, borderColor: 'lightgrey' }}>
                                <Text>{item.id}</Text>
                                <Text>{item.city}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />

            }


        </>
    )
}

IsleListScreen.navigationOptions = () => {
    return {
        headerShown: false,
        tabBarLabel: 'Recuperi'
    }
}

const styles = StyleSheet.create({
    searchBar: {
        padding: 15,
        margin: 5,
        backgroundColor: 'lightgrey',
        borderRadius: 8
    }
});



export default IsleListScreen;