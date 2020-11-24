import React , {useContext}from 'react'
import { StyleSheet ,SafeAreaView } from 'react-native'
import {colors} from '../constants/color';
import AuthForm from '../components/AuthForm';
import {Context as AuthContext} from '../context/AuthContext';


const LoginScreen = ({ navigation , onSubmit}) => {
    const {state , signin} = useContext(AuthContext);
    return (
        <SafeAreaView style={styles.container}>
            <AuthForm
                headerText="LOGIN"
                errorMessage={state.errorMessage}
                onSubmitText="LOGIN"
                onSubmit={signin}
            />
        </SafeAreaView>
    )
}

LoginScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:  colors.primary
    },

    
});


export default LoginScreen;
