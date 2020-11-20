import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import { FontAwesome } from '@expo/vector-icons';

import { Context as AuthContext } from '../context/AuthContext';

const AccountScreen = ({ navigation }) => {
    const { state, signout } = useContext(AuthContext);

    return (
        <>
            <HeaderComponent
                headerTitle='Il mio Profilo'
                iconName='sign-out'
                onPress={signout}
            />
            {/* Da trasformare in componente  */}
            <View style={styles.container}>
                <View style={styles.avatar}>
                    <FontAwesome name="user-o" style={styles.icon} />
                </View>
                <View style={styles.info}>
                    <Text style={styles.textInfo}>Nome : {state.user.firstName} </Text>
                    <Text style={styles.textInfo}>Cognome : {state.user.lastName} </Text>
                    <Text style={styles.textInfo}>Ruolo: {state.user.role}</Text>

                </View>
            </View>
            <Text>Azioni Rapide</Text>




        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    avatar: {
        height: 80,
        width: 80,
        margin: 15,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'lightgrey',
        borderRadius: 40
    },
    icon: {
        fontSize: 36,
        color: 'white'
    },
    info: {
        justifyContent: "center",
    },
    textInfo:{
        marginVertical: 2,
        fontWeight: "bold",
        fontSize: 16
    }
});


export default AccountScreen;