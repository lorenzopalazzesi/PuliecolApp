import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input , Text } from 'react-native-elements';
import { Feather } from '@expo/vector-icons'; 
import {colors} from '../constants/color';
import Spacer from '../components/Spacer';

const AuthForm = ({ headerText, errorMessage, onSubmit, onSubmitText }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <Spacer>
                <Text style={styles.headerText}>{headerText}</Text>
            </Spacer>
            <Spacer>
                <Input
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    placeholderTextColor='black'
                    autoCorrect={false}
                    autoCapitalize={"none"}
                    leftIcon={
                        <Feather 
                            name="user" 
                            style={styles.icon} 
                        />
                    }
                />
            </Spacer>
            <Spacer>
                <Input
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor='black'
                    autoCorrect={false}
                    autoCapitalize={"none"}
                    leftIcon={
                        <Feather 
                            name="key"
                            style={styles.icon}
                        />
                    }
                />
            </Spacer>
            <Spacer>
                <Button
                    title={onSubmitText}
                    onPress={() => onSubmit({ username, password })}
                    buttonStyle={styles.button}
                    titleStyle={styles.button}
                />
            </Spacer>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
        </>
    );
};

const styles = StyleSheet.create({
    headerText: {
        textAlign: "center",
        fontSize: 38,
        marginTop: 40,
        color: 'black'
    },
    icon:{
        fontSize: 26,
        marginRight: 8,
    },
    errorMessage:{
        textAlign: "center",
        color:'red',
        fontSize: 16,
        fontWeight: "bold"
    },
    button: {
        backgroundColor: 'black',
        color: colors.primary,
        fontSize: 22,
        fontWeight: "bold"
    },
});

export default AuthForm;