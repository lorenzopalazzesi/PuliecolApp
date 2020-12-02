import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { colors } from '../constants/color';
import { View } from 'react-native-animatable';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const AuthForm = ({ headerText, errorMessage, onSubmit, onSubmitText }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/puliecol-logo-complete.png')}
                style={styles.image}
            />

            <View style={styles.containerForm} animation='fadeIn'>
                <Text style={{
                    marginBottom: wp(10.5),
                    marginTop: wp(10.5),
                    textAlign: "center",
                    fontSize: hp(3),
                    fontWeight: "bold",
                    color: colors.primary
                }}>Accedi al servizio</Text>
                <Input
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    placeholderTextColor='lightgrey'
                    autoCorrect={false}
                    autoCapitalize={"none"}
                    leftIcon={
                        <Feather
                            name="user"
                            style={styles.icon}
                        />
                    }
                />
                <Input
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor='lightgrey'
                    autoCorrect={false}
                    autoCapitalize={"none"}
                    leftIcon={
                        <Feather
                            name="key"
                            style={styles.icon}
                        />
                    }
                />
                <Button
                    title={onSubmitText}
                    onPress={() => onSubmit({ username, password })}
                    buttonStyle={styles.button}
                    titleStyle={styles.button}
                    style={{ marginVertical: hp(2) }}
                />
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical: hp(3) }}>
                <Text style={styles.unicamText}>POWERED BY UNICAM</Text>
                <Image
                    source={require('../../assets/logo-unicam.png')}
                    style={{ height: hp(5), width: wp(10), resizeMode: "contain" }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerForm: {
        backgroundColor: 'white',
        marginHorizontal: wp(3.5),
        borderRadius: 20,
        elevation: 10,
        paddingHorizontal: wp(6),
        paddingBottom: wp(10)
    },
    image: {
        height: hp(15),
        borderRadius: 100,
        overflow: 'hidden',
        marginVertical: hp(3.5),
        alignSelf: "center",
        resizeMode: 'contain'
    },
    icon: {
        fontSize: 26,
        marginRight: 8,
        color: 'lightgrey'
    },
    errorMessage: {
        textAlign: "center",
        color: 'red',
        marginVertical: hp(2),
        fontSize: hp(2),
        fontWeight: "bold"
    },
    button: {
        backgroundColor: colors.primary,
        color: 'white',
        borderRadius: 10,
        fontSize: hp(2.5),
        fontWeight: "bold",
    },
    unicamText: {
        fontSize: hp(2),
        color: 'lightgrey',
        fontWeight: "bold"
    }
});

export default AuthForm;