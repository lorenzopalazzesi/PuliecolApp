import React from 'react';
import { StyleSheet , View , Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


const AccountData = ({ firstName, lastName, role }) => {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.avatar}>
                    <FontAwesome name="user-o" style={styles.icon} />
                </View>
                <View style={styles.info}>
                    <Text style={styles.textInfo}>Nome : {firstName} </Text>
                    <Text style={styles.textInfo}>Cognome : {lastName} </Text>
                    <Text style={styles.textInfo}>Ruolo: {role}</Text>

                </View>
            </View>
        </>
    );
};

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
    textInfo: {
        marginVertical: 2,
        fontWeight: "bold",
        fontSize: 18
    },
});

export default AccountData;