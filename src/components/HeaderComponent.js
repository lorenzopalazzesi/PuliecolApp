import React from 'react';
import { StyleSheet , TouchableOpacity } from 'react-native';
import { withNavigation} from 'react-navigation';
import {Header , Text} from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import {colors} from '../constants/color';
import HeaderLogo from '../components/HeaderLogo';

const HeaderComponent = ({ headerTitle ,iconName , onPress}) => {
    return (
        <>
            <Header
                backgroundColor={colors.primary}
                containerStyle={{ 
                    paddingHorizontal: 15, 
                    height: 94 
                }}
                leftComponent={
                    <HeaderLogo />
                }
                centerComponent={
                <Text style={styles.headerTitle}>{headerTitle}</Text>
                }
                rightComponent={
                    <TouchableOpacity onPress={onPress}>
                        <FontAwesome name={iconName} size={28} color="white" />
                    </TouchableOpacity>

                }
            />
        </>
    );
};

const styles = StyleSheet.create({
    headerTitle:{
        fontSize: 20,
        fontWeight: "bold",
        color: 'white'
    }
});

export default withNavigation(HeaderComponent) ;