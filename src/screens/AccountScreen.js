import React , {useContext} from 'react';
import { StyleSheet, Text, View , SafeAreaView} from 'react-native';
import { Button} from 'react-native-elements';
import HeaderComponent from '../components/HeaderComponent';
import {Context as AuthContext} from '../context/AuthContext';

const AccountScreen = ({navigation}) => {
    const {state , signout} = useContext(AuthContext);

    return (
        <>
            <HeaderComponent 
                headerTitle='Il mio Profilo'
                iconName='sign-out'
                onPress={signout}
            />
            <Text>{state.userRole}</Text>
        </>
    )
}

const styles = StyleSheet.create({

});


export default AccountScreen;