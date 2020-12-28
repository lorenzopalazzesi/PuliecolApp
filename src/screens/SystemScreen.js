import React, { useContext, useState } from 'react';
import { Button } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import HeaderComponent from '../components/HeaderComponent';
import { colors } from '../constants/color';

import { Context as ProcessContext } from '../context/ProcessContext';

const SystemScreen = () => {
    const { addAnnounceSystem } = useContext(ProcessContext);
    const [message , setMessage ] = useState(null);
    const priority = 'DANGER';
    return (
        <>
            <HeaderComponent 
                headerTitle='Gestione Smaltimento'
            />
            <Text style={styles.title}>Inserisci qui il nome del materiale da ritirare</Text>
            <TextInput style={styles.input} placeholder='Nome Materiale' value={message} onChangeText={setMessage} />
            <Button title='Invia Notifica' onPress={() => addAnnounceSystem({message: `Richiesta di Smaltimento ${message}`, priority: priority})} />
        </>
    );
};

SystemScreen.navigationOptions = () => {
    return {
        headerShown : false
    };
};

const styles = StyleSheet.create({
    title:{
        margin: 10,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },
    input:{
        margin: 10,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: 'lightgrey',
        paddingHorizontal: 5,
        paddingVertical: 10
    }
});

export default SystemScreen;
