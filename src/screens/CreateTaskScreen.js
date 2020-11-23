import React from 'react';
import {MapView} from 'expo'
import {View , Text, StyleSheet} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';

const CreateTaskScreen = ({navigation}) => {
    return(
        <>
            <HeaderComponent 
                headerTitle='Inserisci Recupero'
                iconName='close'
                onPress={() => navigation.goBack()}
            />
        </>
    );
};

CreateTaskScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};

const styles = StyleSheet.create({

});

export default CreateTaskScreen;