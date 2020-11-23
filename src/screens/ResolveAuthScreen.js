import React, { useEffect, useContext } from 'react';
import { ActivityIndicator , View } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import {colors} from '../constants/color';
const ResolveAuthScreen = () => {
    const { tryLocalSignin } = useContext(AuthContext);

    useEffect(() => {
        tryLocalSignin();
    }, []);
    return (
        <View style={{flex: 1 , justifyContent: "center" , backgroundColor: 'white'}}>
            <ActivityIndicator 
                size='large'
                color={colors.primary}
            />
        </View>
    )
};

export default ResolveAuthScreen;